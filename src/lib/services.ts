export const SERVICE_CATEGORY_KEYS = [
  "coreEngineering",
  "businessSystems",
  "technologyConsulting",
] as const;

export type ServiceCategoryKey = (typeof SERVICE_CATEGORY_KEYS)[number];

export const SERVICES_BY_CATEGORY = {
  coreEngineering: [
    "customSoftware",
    "scalableBackend",
    "apiIntegrations",
    "databaseOptimization",
  ],
  businessSystems: [
    "erpInventorySystems",
    "marketplacePlatforms",
    "workflowAutomation",
  ],
  technologyConsulting: [
    "enterpriseTechConsulting",
    "digitalTransformationConsulting",
  ],
} as const satisfies Record<ServiceCategoryKey, readonly string[]>;

export const SERVICE_KEYS = [
  ...SERVICES_BY_CATEGORY.coreEngineering,
  ...SERVICES_BY_CATEGORY.businessSystems,
  ...SERVICES_BY_CATEGORY.technologyConsulting,
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export function getCategoryForService(service: ServiceKey): ServiceCategoryKey {
  for (const category of SERVICE_CATEGORY_KEYS) {
    if ((SERVICES_BY_CATEGORY[category] as readonly string[]).includes(service)) {
      return category;
    }
  }

  throw new Error(`Unknown service: ${service}`);
}

export function getServicesInCategory(category: ServiceCategoryKey): readonly ServiceKey[] {
  return SERVICES_BY_CATEGORY[category];
}

/** @deprecated No retainer-only marketing services remain */
export const RETAINER_ONLY_SERVICES = [] as const;

export type RetainerOnlyService = (typeof RETAINER_ONLY_SERVICES)[number];

export function isRetainerOnlyService(
  service: ServiceKey
): service is RetainerOnlyService {
  return (RETAINER_ONLY_SERVICES as readonly string[]).includes(service);
}
