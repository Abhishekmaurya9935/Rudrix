export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  metrics: string;
}

export const services: ServiceItem[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description: "Enterprise-grade applications built for scale, performance, and reliability.",
    icon: "⚙️",
    features: ["Architecture design", "API integration", "Scalable delivery"],
  },
  {
    id: "cloud-platforms",
    title: "Cloud Platforms",
    description: "Modern cloud-native platforms with automation, security, and observability.",
    icon: "☁️",
    features: ["DevOps enablement", "Infrastructure automation", "24/7 monitoring"],
  },
  {
    id: "digital-product",
    title: "Digital Product Strategy",
    description: "End-to-end product planning, UX direction, and innovation consulting.",
    icon: "🚀",
    features: ["Roadmapping", "User journeys", "Go-to-market support"],
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "fintech-ops",
    title: "Fintech Operations Platform",
    category: "Enterprise SaaS",
    description: "A secure operations console for scaling multi-entity finance workflows.",
    image: "/images/portfolio/fintech.jpg",
    link: "https://example.com/fintech",
    metrics: "40% faster reporting",
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Patient Portal",
    category: "Digital Health",
    description: "A patient-first platform that unified appointments, records, and messaging.",
    image: "/images/portfolio/healthcare.jpg",
    link: "https://example.com/healthcare",
    metrics: "3x engagement increase",
  },
  {
    id: "retail-analytics",
    title: "Retail Intelligence Suite",
    category: "Analytics",
    description: "A retail command center used to track inventory and revenue performance in real time.",
    image: "/images/portfolio/retail.jpg",
    link: "https://example.com/retail",
    metrics: "25% revenue uplift",
  },
];

export function addService(service: ServiceItem) {
  if (services.some((item) => item.id === service.id)) {
    throw new Error("Service with this id already exists");
  }

  services.push(service);
  return service;
}

export function updateService(id: string, updates: Partial<ServiceItem>) {
  const index = services.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Service not found");
  }

  const updated = { ...services[index], ...updates, id };
  services[index] = updated;
  return updated;
}

export function deleteService(id: string) {
  const index = services.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Service not found");
  }

  return services.splice(index, 1)[0];
}

export function addPortfolioItem(item: PortfolioItem) {
  if (portfolioItems.some((entry) => entry.id === item.id)) {
    throw new Error("Portfolio item with this id already exists");
  }

  portfolioItems.push(item);
  return item;
}

export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>) {
  const index = portfolioItems.findIndex((entry) => entry.id === id);

  if (index === -1) {
    throw new Error("Portfolio item not found");
  }

  const updated = { ...portfolioItems[index], ...updates, id };
  portfolioItems[index] = updated;
  return updated;
}

export function deletePortfolioItem(id: string) {
  const index = portfolioItems.findIndex((entry) => entry.id === id);

  if (index === -1) {
    throw new Error("Portfolio item not found");
  }

  return portfolioItems.splice(index, 1)[0];
}
