import React from 'react';
import { EuiSelect, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';

export const CustomResultPerPage = ({ options, resultsPerPage, setResultsPerPage }: any) => {
  const sortOptions = options.map((item: any) => ({
    value: item,
    text: 'Show '.concat(item, ' results'),
  }));

  return (
    <EuiFormRow fullWidth>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiSelect
            id="sort"
            options={sortOptions}
            value={resultsPerPage}
            // eslint-disable-next-line radix
            onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
            compressed
          />
          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
};
