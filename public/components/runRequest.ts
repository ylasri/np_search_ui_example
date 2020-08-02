import { CoreStart, HttpFetchError } from 'kibana/public';
import { SEARCH_UI_ROUTE_PATH } from '../../common';

export interface Services {
  runSearchRequest: (body: any) => Promise<undefined | HttpFetchError>;
  addSuccessToast: (message: string) => void;
}

export function getServices(core: CoreStart): Services {
  return {
    addSuccessToast: (message: string) => core.notifications.toasts.addSuccess(message),
    runSearchRequest: async (body: any) => {
      try {
        const result = await core.http.post(`${SEARCH_UI_ROUTE_PATH}`, {
          body: JSON.stringify(body),
        });
        return result.raw_data;
      } catch (e) {
        return e;
      }
    },
  };
}

// This was just for demo from search-ui example
// Will rely more on kibana data plugin to query elasticsearch
export async function runRequest(body: any) {
  let rsp;
  await fetch(`..${SEARCH_UI_ROUTE_PATH}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'kbn-xsrf': 'search-ui-demo',
      'kbn-version': '8.0.0',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((data) => {
      rsp = data.raw_data;
    })
    .catch((err) => {
      rsp = err;
    });
  return rsp;
}
