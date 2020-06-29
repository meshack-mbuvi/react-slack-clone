import React from 'react';
import { Button } from 'semantic-ui-react';

const Submit = (props) => {
  const { loading, children, ...rest } = props;

  return (
    <Button
      disabled={loading}
      className={loading ? 'submit loading' : 'submit'}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default Submit;
