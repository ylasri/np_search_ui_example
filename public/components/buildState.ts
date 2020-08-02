import { buildStateFacets } from './buildStateFacets';

function buildTotalPages(resultsPerPage: any, totalResults: any) {
  if (!resultsPerPage) return 0;
  if (totalResults === 0) return 1;
  return Math.ceil(totalResults / resultsPerPage);
}

function buildTotalResults(hits: any) {
  return hits.total.value;
}

function getHighlight(hit: any, fieldName: any) {
  /* if (hit._source.title === 'Rocky Mountain' && fieldName === 'title') {
    window.hit = hit;
    window.fieldName = fieldName;
  }*/
  if (!hit.highlight || !hit.highlight[fieldName] || hit.highlight[fieldName].length < 1) {
    return;
  }

  return hit.highlight[fieldName][0];
}

function buildResults(hits: any) {
  const addEachKeyValueToObject = (acc: any, [key, value]: any) => ({
    ...acc,
    [key]: value,
  });

  const toObject = (value: any, snippet: any) => {
    return { raw: value, ...(snippet && { snippet }) };
  };

  return hits.map((record: any) => {
    return Object.entries(record._source)
      .map(([fieldName, fieldValue]) => [
        fieldName,
        toObject(fieldValue, getHighlight(record, fieldName)),
      ])
      .reduce(addEachKeyValueToObject, {});
  });
}

/*
  Converts an Elasticsearch response to new application state

  When implementing an onSearch Handler in Search UI, the handler needs to convert
  search results into a new application state that Search UI understands.

  For instance, Elasticsearch returns "hits" for search results. This maps to
  the "results" property in application state, which requires a specific format. So this
  file iterates through "hits" and reformats them to "results" that Search UI
  understands.

  We do similar things for facets and totals.
*/
export function buildState(response: any, resultsPerPage: any) {
  const results = buildResults(response.hits.hits);
  const totalResults = buildTotalResults(response.hits);
  const totalPages = buildTotalPages(resultsPerPage, totalResults);
  const facets = buildStateFacets(response.aggregations);

  return {
    results,
    totalPages,
    totalResults,
    ...(facets && { facets }),
  };
}
