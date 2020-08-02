import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { DataPublicPluginStart } from '../../../src/plugins/data/public';
import { HomePublicPluginSetup } from '../../../src/plugins/home/public';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NpSearchUiPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NpSearchUiPluginStart {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NpSearchUiPluginSetupDependencies {
  home: HomePublicPluginSetup;
}

export interface NpSearchUiPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart;
}
