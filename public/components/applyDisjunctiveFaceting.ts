import { Services } from './runRequest';
import { buildRequest } from './buildRequest';

function combineAggregationsFromResponses(responses: any) {
  return responses.reduce((acc: any, response: any) => {
    return {
      ...acc,
      ...response.aggregations,
    };
  }, {});
}

// To calculate a disjunctive facet correctly, you need to calculate the facet counts as if the filter was
// not applied. If you did not do this, list of facet values would collapse to just one value, which is
// whatever you have filtered on in that facet.
function removeFilterByName(state: any, facetName: any) {
  return {
    ...state,
    filters: state.filters.filter((f: any) => f.field !== facetName),
  };
}

function removeAllFacetsExcept(body: any, facetName: any) {
  return {
    ...body,
    aggs: {
      [facetName]: body.aggs[facetName],
    },
  };
}

function changeSizeToZero(body: any) {
  return {
    ...body,
    size: 0,
  };
}

async function getDisjunctiveFacetCounts(
  state: any,
  disunctiveFacetNames: any,
  runSearchRequest: Services['runSearchRequest']
) {
  const responses = await Promise.all(
    // Note that this could be optimized by *not* executing a request
    // if not filter is currently applied for that field. Kept simple here for clarity.
    disunctiveFacetNames.map((facetName: any) => {
      const newState = removeFilterByName(state, facetName);
      let body = buildRequest(newState);
      body = changeSizeToZero(body);
      body = removeAllFacetsExcept(body, facetName);
      return runSearchRequest(body);
    })
  );
  return combineAggregationsFromResponses(responses);
}

/**
 * This function will re-calculate facets that need to be considered
 * "disjunctive" (also known as "sticky"). Calculating sticky facets correctly
 * requires a second query for each sticky facet.
 *
 * @param {*} json
 * @param {*} state
 * @param {string[]} disunctiveFacetNames
 *
 * @return {Promise<Object>} A map of updated aggregation counts for the specified facet names
 */
export async function applyDisjunctiveFaceting(
  json: any,
  state: any,
  disunctiveFacetNames: any,
  runSearchRequest: Services['runSearchRequest']
) {
  const disjunctiveFacetCounts = await getDisjunctiveFacetCounts(
    state,
    disunctiveFacetNames,
    runSearchRequest
  );

  return {
    ...json,
    aggregations: {
      ...json.aggregations,
      ...disjunctiveFacetCounts,
    },
  };
}
