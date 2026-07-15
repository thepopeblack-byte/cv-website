export type PrimaryNavigationItem = {
  id: "profile" | "impact" | "expertise" | "experience" | "blog" | "contact";
  label: string;
  href: string;
};

export const primaryNavigation: PrimaryNavigationItem[] = [
  { id: "profile", label: "Profile", href: "/profile" },
  { id: "impact", label: "Impact", href: "/impact" },
  { id: "expertise", label: "Expertise", href: "/expertise" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const homepageNavigationTargets = [
  { sectionId: "profile", navigationId: "profile" },
  { sectionId: "impact-preview", navigationId: "impact" },
  { sectionId: "expertise-preview", navigationId: "expertise" },
  { sectionId: "experience-preview", navigationId: "experience" },
  { sectionId: "writing", navigationId: "blog" },
  { sectionId: "contact", navigationId: "contact" },
] satisfies Array<{
  sectionId: string;
  navigationId: PrimaryNavigationItem["id"];
}>;

export function getNavigationIdFromPathname(pathname: string) {
  if (pathname.startsWith("/blog")) {
    return "blog" as const;
  }

  return primaryNavigation.find(
    (item) =>
      item.id !== "blog" &&
      item.id !== "contact" &&
      pathname.startsWith(item.href),
  )?.id;
}
