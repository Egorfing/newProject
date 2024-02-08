import { buildSelectors } from '@/shared/lib/store/buildSelector'

export const [useCounterValue, getCounterValue] = buildSelectors((state) => state.counter.value)
