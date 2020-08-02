import './index.scss';

import { NpSearchUiPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new NpSearchUiPlugin();
}
export { NpSearchUiPluginSetup, NpSearchUiPluginStart } from './types';
