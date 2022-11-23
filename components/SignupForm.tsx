import Head from 'next/head';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthInfo from './AuthInfo';
import CarInfo from './CarInfo';
import FinanceInfo from './FinanceInfo';
import MyStepper from './Stepper';

const SignupForm = () => {
  const [step, setStep] = useState(0);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    iban: '',
    bic: 0,
    carRegistration: '',
  });
  const HeaderTitles = [
    'Sign Up',
    'Provide your bank details',
    'Provide your car information',
  ];
  const StepSelector = () => {
    switch (step) {
      case 0:
        return (
          <AuthInfo signupData={signupData} setSignupData={setSignupData} />
        );

      case 1:
        return (
          <FinanceInfo signupData={signupData} setSignupData={setSignupData} />
        );

      case 2:
        return (
          <CarInfo signupData={signupData} setSignupData={setSignupData} />
        );
      default:
        console.log(`wrong page number`);
    }
  };

  return (
    <div className="form">
      <div className="stepper"></div>
      <div className="container">
        <div className="header">
          <h1>{HeaderTitles[step]}</h1>
        </div>
        <div className="stepper">
          <MyStepper />
        </div>
        <div className="body">{StepSelector()}</div>
        <div className="footer">
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => {
                setStep((currentStep) => currentStep - 1);
              }}
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
              disabled={step == 0}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (step === HeaderTitles.length - 1) {
                  alert('Form submitted successfully!');
                } else {
                  setStep((currentStep) => currentStep + 1);
                }
              }}
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
            >
              {step === HeaderTitles.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
