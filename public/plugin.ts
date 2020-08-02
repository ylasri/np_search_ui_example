import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { FeatureCatalogueCategory } from '../../../src/plugins/home/public';
import {
  NpSearchUiPluginSetup,
  NpSearchUiPluginStart,
  NpSearchUiPluginStartDependencies,
  NpSearchUiPluginSetupDependencies,
} from './types';
import {
  PLUGIN_NAME,
  PLUGIN_DESC,
  PLUGIN_ID,
  APP_ICON,
  APP_PATH,
  CAT_ICON,
  CAT_ID,
  CAT_NAME,
} from '../common';
import { getServices } from './services';
export class NpSearchUiPlugin
  implements
    Plugin<
      NpSearchUiPluginSetup,
      NpSearchUiPluginStart,
      NpSearchUiPluginSetupDependencies,
      NpSearchUiPluginStartDependencies
    > {
  public setup(
    core: CoreSetup<NpSearchUiPluginStartDependencies>,
    deps: NpSearchUiPluginSetupDependencies
  ): NpSearchUiPluginSetup {
    // Register an application into the home page of Kibana
    deps.home.featureCatalogue.register({
      id: PLUGIN_ID,
      title: PLUGIN_NAME,
      description: PLUGIN_DESC,
      icon: APP_ICON,
      path: APP_PATH,
      showOnHomePage: true,
      category: FeatureCatalogueCategory.OTHER,
    });
    // Register an application into the side navigation menu
    core.application.register({
      id: PLUGIN_ID,
      title: PLUGIN_NAME,
      order: 1000,
      euiIconType: APP_ICON,
      category: {
        id: CAT_ID,
        label: CAT_NAME,
        euiIconType: CAT_ICON,
        order: 4000,
      },
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        const startServices = getServices(coreStart);
        // Render the application
        return renderApp(
          startServices,
          coreStart,
          depsStart as NpSearchUiPluginStartDependencies,
          params
        );
      },
    });

    // Return methods that should be available to other plugins
    return {};
  }

  public start(core: CoreStart): NpSearchUiPluginStart {
    return {};
  }

  public stop() {}
}
