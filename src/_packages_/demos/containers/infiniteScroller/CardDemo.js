import React from 'react';
import Card from '../../components/card';

export default () => {
  const action = (
    <a href="http://pornhub.com">请联系我</a>
  );

  return (
    <Card style={{ width: 400 }} title="名片"
           action={action}>
      <p>徐斌</p>
      <p>电话: 0659657708</p>
      <Card type="nested" title="CV">
        <p>to be continued...</p>
        <Card type="nested" title="page 1">
          <p>to be completed...</p>
        </Card>
      </Card>
    </Card>
  );
}