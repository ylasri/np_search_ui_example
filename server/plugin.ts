import { schema } from '@kbn/config-schema';
import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import {
  NpSearchUiPluginSetup,
  NpSearchUiPluginStart,
  NpSearchUiPluginSetupDeps,
  NpSearchUiPluginStartDeps,
} from './types';
import { defineRoutes } from './routes';
import { PLUGIN_ID, APP_ICON, PLUGIN_NAME } from '../common';

export class NpSearchUiPlugin
  implements
    Plugin<
      NpSearchUiPluginSetup,
      NpSearchUiPluginStart,
      NpSearchUiPluginSetupDeps,
      NpSearchUiPluginStartDeps
    > {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup<NpSearchUiPluginStartDeps>, deps: NpSearchUiPluginSetupDeps) {
    // UiSettings defaults registration performed during setup phase via core.uiSettings.register API.
    // This help to store some generic attributes of the App
    core.uiSettings.register({
      'search-ui:index_pattern': {
        value: 'customer_churn_model',
        name: 'Default Index Pattern',
        description: 'Provide the default index pattern',
        category: ['Demo™ Apps'],
        requiresPageReload: true,
        schema: schema.string(),
      },
    });
    // Register Security Features in X-Pack
    // This help when creating new role for using the plugin
    if (deps.features) {
      deps.features.registerFeature({
        id: PLUGIN_ID,
        name: PLUGIN_NAME,
        order: 1200,
        icon: APP_ICON,
        navLinkId: PLUGIN_ID,
        app: [PLUGIN_ID, 'kibana'],
        catalogue: [PLUGIN_ID],
        validLicenses: ['platinum', 'enterprise', 'trial', 'basic'],
        privileges: {
          all: {
            api: [],
            app: [PLUGIN_ID, 'kibana'],
            catalogue: [PLUGIN_ID],
            savedObject: {
              all: [],
              read: [],
            },
            ui: ['show'],
          },
          read: {
            api: [],
            app: [PLUGIN_ID, 'kibana'],
            catalogue: [PLUGIN_ID],
            savedObject: {
              all: [],
              read: [],
            },
            ui: ['show'],
          },
        },
      });
    }
    this.logger.debug('np_search_ui: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('np_search_ui: Started');
    return {};
  }

  public stop() {}
}
