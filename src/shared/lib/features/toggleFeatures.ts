import { FeatureFlags } from "@/shared/types/featureFlags";
import { getFeatureFlag } from "./setGatFeatures";

interface ToggleFeatures<T> {
  name: keyof FeatureFlags,
  on: () => T,
  off: () => T,
}

export function toggleFeatures<T>({name, on, off}: ToggleFeatures<T>): T {
    if(getFeatureFlag(name)) {
      return on()
    }
    return off()
}