export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  icon: string; // SVG component name
  title: string;
  description: string;
}

export interface ConnectedCard {
  title: string;
  description: string;
  backgroundImage: string;
}

export interface AIFeatureItem {
  text: string;
}

export interface IntegrationItem {
  name: string;
  description: string;
  logo: string;
}

export interface PricingFeature {
  text: string;
}

export interface Testimonial {
  name: string;
  handle: string;
  text: string;
  avatar: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
