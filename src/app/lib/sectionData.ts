export const FOOTER_ID = "site-footer";

export const STACK_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Method" },
  { id: "gallery", label: "Results" },
  { id: "testimonials", label: "Stories" },
] as const;

export type StackSectionId = (typeof STACK_SECTIONS)[number]["id"];
export type ScrollTargetId = StackSectionId | typeof FOOTER_ID;
