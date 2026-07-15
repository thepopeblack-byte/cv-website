export type PrimaryNavigationItem = {
  id: "profile" | "impact" | "expertise" | "experience" | "blog";
  label: string;
  href: string;
};

export const primaryNavigation: PrimaryNavigationItem[] = [
  { id: "profile", label: "Profile", href: "/profile" },
  { id: "impact", label: "Impact", href: "/impact" },
  { id: "expertise", label: "Expertise", href: "/expertise" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "blog", label: "Blog", href: "/blog" },
];

export const homepageNavigationTargets = [
  { sectionId: "profile", navigationId: "profile" },
  { sectionId: "impact-preview", navigationId: "impact" },
  { sectionId: "expertise-preview", navigationId: "expertise" },
  { sectionId: "experience-preview", navigationId: "experience" },
  { sectionId: "writing", navigationId: "blog" },
] satisfies Array<{
  sectionId: string;
  navigationId: PrimaryNavigationItem["id"];
}>;

export function getNavigationIdFromPathname(pathname: string) {
  if (pathname.startsWith("/blog")) {
    return "blog" as const;
  }

  return primaryNavigation.find(
    (item) => item.id !== "blog" && pathname.startsWith(item.href),
  )?.id;
}
