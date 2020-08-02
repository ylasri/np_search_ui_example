import React from 'react';

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  WithSearch,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  Result,
} from '@elastic/react-search-ui';
import { Layout, SingleSelectFacet, Paging as PagingView } from '@elastic/react-search-ui-views';
import { CoreStart } from '../../../../src/core/public';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { buildRequest } from './buildRequest';
import { applyDisjunctiveFaceting } from './applyDisjunctiveFaceting';
import { buildState } from './buildState';
import { Services } from '../services';
import { CustomSearchBox } from './views/search-box';
import { CustomPageInfo } from './views/page-info';
import { CustomResult } from './views/result-ui';
import { CustomSorting } from './views/sorting-ui';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { DataPublicPluginStart } from '../../../../src/plugins/data/public';
import { SORT_OPTIONS } from '../../common/';
import { CustomResultPerPage } from './views/result-per-page';

interface NpSearchUiAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  uiSettings: CoreStart['uiSettings'];
  savedObjectsClient: CoreStart['savedObjects']['client'];
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart;
  http: CoreStart['http'];
  runSearchRequest: Services['runSearchRequest'];
  addSuccessToast: Services['addSuccessToast'];
}

export const SearchApp = ({
  basename,
  notifications,
  uiSettings,
  navigation,
  data,
  http,
  runSearchRequest,
  addSuccessToast,
}: NpSearchUiAppDeps) => {
  const config = {
    debug: true,
    hasA11yNotifications: true,
    onResultClick: () => {
      /* Not implemented */
    },
    onAutocompleteResultClick: () => {
      /* Not implemented */
    },
    onAutocomplete: async ({ searchTerm }: any) => {
      const requestBody = buildRequest({ searchTerm });
      // const json = await runRequest(requestBody);
      const json = await runSearchRequest(requestBody);
      const state = buildState(json, undefined);
      return {
        autocompletedResults: state.results,
      };
    },
    onSearch: async (state: any) => {
      const { resultsPerPage } = state;
      const requestBody = buildRequest(state);
      // Note that this could be optimized by running all of these requests
      // at the same time. Kept simple here for clarity.
      // const responseJson = await runRequest(requestBody);
      const responseJson = await runSearchRequest(requestBody);
      const responseJsonWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
        responseJson,
        state,
        ['visitors', 'states'],
        runSearchRequest
      );
      return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage);
    },
    initialState: {
      resultsPerPage: 10,
    },
  };

  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched, setResultsPerPage }: any) => ({
          wasSearched,
          setResultsPerPage,
        })}
      >
        {({ wasSearched, setResultsPerPage }: any) => (
          <div className="App">
            <ErrorBoundary>
              <Layout
                header={
                  <SearchBox
                    view={({ onChange, value, onSubmit }: any) => (
                      <CustomSearchBox onChange={onChange} value={value} onSubmit={onSubmit} />
                    )}
                    useAutocomplete={true}
                    autocompleteSuggestions={true}
                    autocompleteMinimumCharacters={3}
                    autocompleteResults={{
                      linkTarget: '_blank',
                      sectionTitle: 'Results',
                      titleField: 'title',
                      urlField: 'nps_link',
                      shouldTrackClickThrough: true,
                      clickThroughTags: ['test'],
                    }}
                  />
                }
                sideContent={
                  <div>
                    {wasSearched && (
                      <Sorting
                        sortOptions={SORT_OPTIONS}
                        view={({ onChange, value }: any) => (
                          <CustomSorting onChange={onChange} value={value} options={SORT_OPTIONS} />
                        )}
                      />
                    )}
                    <Facet field="states" label="States" filterType="any" isFilterable={true} />
                    <Facet field="world_heritage_site" label="World Heritage Site?" />
                    <Facet field="visitors" label="Visitors" filterType="any" />
                    <Facet field="acres" label="Acres" view={SingleSelectFacet} />
                  </div>
                }
                bodyContent={
                  <Results
                    titleField="title"
                    urlField="nps_link"
                    shouldTrackClickThrough={true}
                    resultView={({ result }: any) => <CustomResult result={result} />}
                  />
                }
                bodyHeader={
                  <React.Fragment>
                    {wasSearched && (
                      <PagingInfo
                        view={({ start, end, searchTerm, totalResults }: any) => (
                          <CustomPageInfo
                            start={start}
                            end={end}
                            searchTerm={searchTerm}
                            totalResults={totalResults}
                          />
                        )}
                      />
                    )}
                    {wasSearched && (
                      <ResultsPerPage
                        options={[3, 5, 8, 10]}
                        view={({ options }: any) => (
                          <CustomResultPerPage
                            options={options}
                            resultsPerPage={config.initialState.resultsPerPage}
                            setResultsPerPage={setResultsPerPage}
                          />
                        )}
                      />
                    )}
                  </React.Fragment>
                }
                bodyFooter={<Paging />}
              />
            </ErrorBoundary>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
};
