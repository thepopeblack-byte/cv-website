import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type PostWebhookBody = {
  _type?: string;
  slug?: string | { current?: string };
  previousSlug?: string | { current?: string };
};

function getSlug(value: PostWebhookBody["slug"]) {
  return typeof value === "string" ? value : value?.current;
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  const { body, isValidSignature } = await parseBody<PostWebhookBody>(
    request,
    secret,
  );

  if (!isValidSignature) {
    return NextResponse.json(
      { message: "Invalid webhook signature." },
      { status: 401 },
    );
  }

  if (body?._type && body._type !== "post") {
    return NextResponse.json({ revalidated: false, ignored: true });
  }

  const slugs = Array.from(
    new Set(
      [getSlug(body?.slug), getSlug(body?.previousSlug)].filter(
        (slug): slug is string => Boolean(slug),
      ),
    ),
  );

  revalidateTag("sanity:posts", "max");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/newsletter");
  revalidatePath("/sitemap.xml");

  slugs.forEach((slug) => {
    revalidatePath(`/blog/${slug}`);
  });

  return NextResponse.json({ revalidated: true, slugs });
}
