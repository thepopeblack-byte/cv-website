export type PrimaryNavigationItem = {
  id: "profile" | "impact" | "expertise" | "experience" | "blog" | "contact";
  label: string;
  href: string;
};

export const primaryNavigation: PrimaryNavigationItem[] = [
  { id: "profile", label: "Profile", href: "#profile" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "expertise", label: "Expertise", href: "#expertise" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const homepageNavigationTargets = [
  { sectionId: "profile", navigationId: "profile" },
  { sectionId: "about", navigationId: "profile" },
  { sectionId: "impact", navigationId: "impact" },
  { sectionId: "ecosystems", navigationId: "impact" },
  { sectionId: "outcomes", navigationId: "impact" },
  { sectionId: "portfolio", navigationId: "impact" },
  { sectionId: "expertise", navigationId: "expertise" },
  { sectionId: "credentials", navigationId: "expertise" },
  { sectionId: "education", navigationId: "expertise" },
  { sectionId: "speaking", navigationId: "expertise" },
  { sectionId: "experience", navigationId: "experience" },
  { sectionId: "contact", navigationId: "contact" },
] satisfies Array<{
  sectionId: string;
  navigationId: PrimaryNavigationItem["id"];
}>;
