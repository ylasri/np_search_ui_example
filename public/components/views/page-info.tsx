import React from 'react';
import { EuiSpacer, EuiFlexItem, EuiTitle } from '@elastic/eui';

export const CustomPageInfo = ({ start, end, searchTerm, totalResults }: any) => {
  return (
    <EuiFlexItem>
      <EuiTitle size="xxxs">
        <h1>{`Showing ${start} to ${end} results out of ${totalResults}, searching for term "${searchTerm}"`}</h1>
      </EuiTitle>
      <EuiSpacer />
    </EuiFlexItem>
  );
};
