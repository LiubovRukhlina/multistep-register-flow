import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function CarInfo({ signupData, setSignupData }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  return (
    <form onSubmit={handleSubmit()}>
      <input
        {...register('car', { required: true })}
        placeholder="Car model"
        value={signupData.car}
        onChange={(event) =>
          setSignupData({ ...signupData, car: event.target.value })
        }
      />
      <input
        {...register('carRegistration', { required: false })}
        placeholder="Car registration"
        value={signupData.carRegistration}
        type="file"
        onChange={(event) =>
          setSignupData({ ...signupData, carRegistration: event.target.value })
        }
      />
    </form>
  );
}

export default CarInfo;
