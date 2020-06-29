import React from 'react';
import { Button } from 'semantic-ui-react';

const ActionButton = (props) => {
  const { loading, children, className = 'btn-primary', ...rest } = props;

  return (
    <Button disabled={loading} className={className} {...rest}>
      {children}
    </Button>
  );
};

export default ActionButton;
