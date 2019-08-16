import React from 'react';
import ReactLoadable from 'react-loadable';

const MyLoadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

export default function DocLoadable(opts) {
  return ReactLoadable(
    Object.assign(
      {
        loading: MyLoadingComponent,
        delay: 200, // Avoiding Flash Of Loading Component
        timeout: 5000, // 5 seconds
      },
      opts
    )
  );
}