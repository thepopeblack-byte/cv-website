import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.required().min(8).max(140),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Generate this from the title before publishing.",
      type: "slug",
      group: "publishing",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date and time",
      description:
        "Optional. When empty, the public site uses the document creation time.",
      type: "datetime",
      group: "publishing",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "date",
      title: "Legacy publication date",
      description:
        "Retained for existing documents; use Publication date and time.",
      type: "date",
      group: "publishing",
      hidden: true,
    }),
    defineField({
      name: "type",
      title: "Legacy post type",
      type: "string",
      group: "publishing",
      hidden: true,
      options: {
        layout: "radio",
        list: [
          { title: "Original", value: "Original" },
          { title: "Featured coverage", value: "Featured" },
        ],
      },
      initialValue: "Original",
    }),
    defineField({
      name: "contentType",
      title: "Content type",
      description:
        "Original writing appears in the public Popeblack editorial index. External coverage can remain available by direct URL.",
      type: "string",
      group: "publishing",
      options: {
        layout: "radio",
        list: [
          { title: "Original article", value: "original" },
          { title: "External or featured coverage", value: "external" },
        ],
      },
      initialValue: "original",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visibility",
      title: "Public visibility",
      description:
        "Hidden and archived posts remain in Sanity and may keep their direct URL, but are excluded from public indexes and the sitemap.",
      type: "string",
      group: "publishing",
      options: {
        layout: "radio",
        list: [
          { title: "Public", value: "public" },
          { title: "Hidden", value: "hidden" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "public",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Optional editorial category used on article cards.",
      type: "string",
      group: "publishing",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "source",
      title: "Source or publication",
      description: "Use this for externally published or featured coverage.",
      type: "string",
      group: "publishing",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "publishing",
      initialValue: "Kayode Popoola",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "A concise summary used on cards and in search previews.",
      type: "text",
      rows: 4,
      group: "editorial",
      validation: (rule) => rule.required().min(40).max(320),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "editorial",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              description: "Describe the image for screen-reader users.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        'Add the exact tag "Newsletter" to include this post in The Popeblack Brief archive.',
      type: "array",
      group: "publishing",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "coverImage",
      title: "Article cover image",
      description:
        "Used on the blog listing, article header and social-sharing preview. Recommended size: 1600 x 900 pixels (16:9).",
      type: "image",
      group: "editorial",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "Describe the image for screen-reader users.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          description: "Optional context displayed beneath the article image.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "External source URL",
      description: "Optional link to the original publication.",
      type: "url",
      group: "publishing",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "string",
      group: "publishing",
      initialValue: "3 min read",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature this post",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "source",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "Kayode Popoola",
        media,
      };
    },
  },
});
