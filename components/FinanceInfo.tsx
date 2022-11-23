import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function FinanceInfo({ signupData, setSignupData }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  return (
    <form onSubmit={handleSubmit()}>
      <input
        {...register('iban', { required: true })}
        placeholder="IBAN"
        value={signupData.iban}
        onChange={(event) =>
          setSignupData({ ...signupData, iban: event.target.value })
        }
      />
      <input
        {...register('bic', { required: true })}
        placeholder="bic"
        value={signupData.bic}
        onChange={(event) =>
          setSignupData({ ...signupData, bic: event.target.value })
        }
      ></input>
    </form>
  );
}

export default FinanceInfo;
