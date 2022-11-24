import React from 'react';

import { useFormContext } from 'react-hook-form';

import ControlledInput from './ControlledInput';

function FinanceInfo() {
  const { control } = useFormContext();

  return (
    <>
      <ControlledInput control={control} label="IBAN" name="iban" />
      <ControlledInput control={control} label="BIC" name="bic" />
    </>
  );
}

export default FinanceInfo;
