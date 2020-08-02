/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Comparators } from '@elastic/eui/lib/services/sort';

export const PLUGIN_ID = 'npSearchUi';
export const PLUGIN_NAME = 'Search-UI Example';
export const PLUGIN_DESC = 'This plugin show how to use search-ui for search';
export const APP_ICON = 'savedObjectsApp';
export const APP_PATH = `/app/${PLUGIN_ID}`;
export const PLUGIN_MSG = 'Welcome to search-ui plugin';

export const CAT_ID = 'demo';
export const CAT_ICON = 'logoElasticsearch';
export const CAT_NAME = 'Demo™ Apps';

// search-ui demo
export const SEARCH_UI_INDEX_NAME = 'national-parks';
export const SEARCH_UI_ROUTE_PATH = '/api/v1/search_ui';
export const SORT_OPTIONS = [
  {
    name: 'Relevance',
    value: '',
    direction: '',
  },
  {
    name: 'Title',
    value: 'title',
    direction: 'asc',
  },
  {
    name: 'Visitors',
    value: 'visitors',
    direction: 'desc',
  },
  {
    name: 'Square',
    value: 'square_km',
    direction: 'desc',
  },
  {
    name: 'Acres',
    value: 'acres',
    direction: 'desc',
  },
  {
    name: 'Date',
    value: 'date_established',
    direction: 'desc',
  },
];

// This function is used to handle pagination with sorting
export function findItems(
  pageIndex: any,
  pageSize: any,
  sortField: any,
  sortDirection: any,
  items: any
) {
  let store;

  if (sortField) {
    store = items
      .slice(0)
      .sort(Comparators.property(sortField, Comparators.default(sortDirection)));
  } else {
    store = items;
  }

  let pageOfItems;

  if (!pageIndex && !pageSize) {
    pageOfItems = store;
  } else {
    const startIndex = pageIndex * pageSize;
    pageOfItems = store.slice(startIndex, Math.min(startIndex + pageSize, store.length));
  }

  return {
    pageOfItems,
    totalItemCount: store.length,
  };
}
