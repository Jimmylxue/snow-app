import { Box } from 'native-base';
import React from 'react';

type Props = {
  children: React.ReactNode;
  center?: boolean;
  bg?: string;
};

export default ({ children, center, ...props }: Props) => {
  return (
    <Box
      {...props}
      style={
        center ? { alignItems: 'center', justifyContent: 'center' } : null
      }>
      {children}
    </Box>
  );
};
