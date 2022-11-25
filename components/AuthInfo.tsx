import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, FormControl } from '@mui/material';
import ControlledInput from './common/ControlledInput';

function AuthInfo() {
  const { control } = useFormContext();
  return (
    <Box sx={{ display: 'flex', displayDirection: 'column', flex: 1 }}>
      <FormControl variant="standard">
        <ControlledInput control={control} label="Email" name="email" />
      </FormControl>
      <FormControl variant="standard">
        <ControlledInput
          control={control}
          label="Password"
          name="password"
          type="password"
        />
      </FormControl>
      <ControlledInput
        control={control}
        label="Confirm Password"
        name="confirmPassword"
        type="password"
      />
    </Box>
  );
}

export default AuthInfo;
