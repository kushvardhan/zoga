export type ServiceId =
  | "webdev"
  | "webdesign"
  | "video"
  | "seo"
  | "branding"
  | "marketing"
  | "gmb";

// Accept any Tailwind color string
export type ColorKey =
  | "cyan"
  | "fuchsia"
  | "red"
  | "lime"
  | "orange"
  | "amber"
  | "teal";

export type AccentKey =
  | "indigo"
  | "purple"
  | "orange"
  | "emerald"
  | "red"
  | "pink"
  | "blue";

export interface ServiceData {
  id: ServiceId;
  title: string;
  subtitle: string;
  copy: string;
  color: ColorKey;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  deliverables: string[];
  trust: string;
  accent: AccentKey;
}

export type VisualComponent = React.FC<{
  color: ColorKey;
  accent: AccentKey;
}>;
