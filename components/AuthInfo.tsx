import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function AuthInfo({ signupData, setSignupData }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  return (
    <form onSubmit={handleSubmit()}>
      <input
        {...register('email', { required: true })}
        placeholder="Email"
        value={signupData.email}
        onChange={(event) =>
          setSignupData({ ...signupData, email: event.target.value })
        }
      />
      <input
        {...register('password', { required: true })}
        placeholder="Password"
        value={signupData.password}
        onChange={(event) =>
          setSignupData({ ...signupData, password: event.target.value })
        }
      ></input>
      <input
        {...register('confirmPassword', { required: true })}
        placeholder="Confirm password"
        value={signupData.confirmPassword}
        onChange={(event) =>
          setSignupData({ ...signupData, confirmPassword: event.target.value })
        }
      ></input>
    </form>
  );
}

export default AuthInfo;
