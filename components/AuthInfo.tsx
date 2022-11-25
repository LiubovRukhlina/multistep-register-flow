import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl } from '@mui/material';
import ControlledInput from './ControlledInput';

function AuthInfo() {
  const { control } = useFormContext();
  return (
    <div className="sign-up-container">
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
    </div>
  );
}

export default AuthInfo;
