import React from 'react';
import { EuiCard, EuiFlexItem, EuiSpacer, EuiIcon } from '@elastic/eui';
export const CustomResult = ({ result }: any) => {
  return (
    <EuiFlexItem key={result.id.raw}>
      <EuiCard
        layout="horizontal"
        title={result.title.raw}
        isDisabled={false}
        description={result.description.raw}
        onClick={() => window.open(result.nps_link.raw, '_blank')}
        icon={<EuiIcon size="xl" type={'savedObjectsApp'} />}
      />
      <EuiSpacer />
    </EuiFlexItem>
  );
};
