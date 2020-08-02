import { PluginSetup, PluginStart } from '../../../src/plugins/data/server';
import { PluginSetupContract as FeaturesPluginSetup } from '../../../x-pack/plugins/features/server';

export interface NpSearchUiPluginSetupDeps {
  data: PluginSetup;
  features?: FeaturesPluginSetup;
}

export interface NpSearchUiPluginStartDeps {
  data: PluginStart;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NpSearchUiPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NpSearchUiPluginStart {}
