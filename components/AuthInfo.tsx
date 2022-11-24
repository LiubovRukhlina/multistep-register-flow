import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl } from '@mui/material';
import ControlledInput from './ControlledInput';

function AuthInfo() {
  const { control } = useFormContext();
  return (
    <>
      <FormControl variant="standard">
        <ControlledInput control={control} label="Email" name="email" />
      </FormControl>
      <FormControl variant="standard">
        <ControlledInput control={control} label="Password" name="password" />
      </FormControl>
      <ControlledInput
        control={control}
        label="Confirm Password"
        name="confirmPassword"
      />
    </>
  );
}

export default AuthInfo;
