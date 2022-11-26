import React from 'react';

import { useFormContext } from 'react-hook-form';

import ControlledInput from './common/ControlledInput';

function FinanceInfo() {
  const { control } = useFormContext();

  return (
    <div className="controlled-input-container">
      <ControlledInput
        control={control}
        label="Credit Card Number"
        name="CreditCardNumber"
      />
      <ControlledInput
        control={control}
        label="Cardholder Name"
        name="CardholderName"
      />
      <ControlledInput
        control={control}
        label="Expiration date"
        name="ExpirationDate"
      />
      <ControlledInput control={control} label="CVV" name="cvv" />
    </div>
  );
}

export default FinanceInfo;
