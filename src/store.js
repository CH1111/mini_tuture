import { init } from '@rematch/core';

import { drawer } from './models/drawer';
import { collection } from './models/collection';
import { diff } from './models/diff';

export const store = init({
  models: { drawer, collection, diff },
});
