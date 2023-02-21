import { api } from '@/services/api';
import { LogarithmicFilter } from './logarithmic-filter';

import { NegativeFilter } from './negative-filter';

export const filters = {
  negativeFilter: new NegativeFilter(api),
  logarithmicFilter: new LogarithmicFilter(api)
};