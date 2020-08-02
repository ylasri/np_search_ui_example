import React from 'react';
import { EuiFieldSearch, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';

export const CustomSearchBox = ({ onChange, value, onSubmit }: any) => {
  return (
    <EuiFormRow fullWidth helpText="This is a custom search box using eui framework">
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFieldSearch
            placeholder="Search..."
            fullWidth
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onSubmit} iconSide="left" iconType="search" color="secondary" fill>
            Search
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
};
