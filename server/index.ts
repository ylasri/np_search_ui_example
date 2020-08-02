import { PluginInitializerContext } from '../../../src/core/server';
import { NpSearchUiPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new NpSearchUiPlugin(initializerContext);
}

export { NpSearchUiPluginSetup, NpSearchUiPluginStart } from './types';
