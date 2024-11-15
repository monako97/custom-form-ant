import React from 'react';

import 'neko-ui/es/skeleton';

const Fallback = () => {
  return <n-skeleton active={true} title={true} rows={6} />;
};

export default Fallback;
