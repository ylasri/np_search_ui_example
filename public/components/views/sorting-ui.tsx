import React from 'react';
import { EuiSelect, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';

export const CustomSorting = ({ onChange, value, options }: any) => {
  const sortOptions = options.map((item: any) => ({
    value: ''.concat(item.value, '|||').concat(item.direction),
    text: item.name,
  }));

  return (
    <EuiFormRow fullWidth label="Sort results by">
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiSelect
            id="sort"
            options={sortOptions}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            compressed
          />
          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
};
