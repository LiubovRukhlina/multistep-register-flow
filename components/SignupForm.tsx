import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthInfo from './AuthInfo';
import CarInfo from './CarInfo';
import FinanceInfo from './FinanceInfo';
import MyStepper from './Stepper';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    iban: yup.string().required(),
    bic: yup.string().required(),
    car: yup.string().required(),
  })
  .required();
const SignupForm = () => {
  const [step, setStep] = useState(0);

  const HeaderTitles = [
    'Sign Up',
    'Provide your bank details',
    'Provide your car information',
  ];
  const StepSelector = () => {
    switch (step) {
      case 0:
        return <AuthInfo />;

      case 1:
        return <FinanceInfo />;

      case 2:
        return <CarInfo />;
      default:
        console.log(`wrong page number`);
    }
  };
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Record<string, string>) => {
    toast.success('🦄 Wow so easy!', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    delete data.carRegistration;
    exportData(data);
  };
  const exportData = (data: Record<string, string>) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';

    link.click();
  };
  return (
    <div className="form">
      <div className="stepper"></div>
      <div className="container">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                  onClick={async () => {
                    if (step === 0) {
                      const result = await methods.trigger([
                        'email',
                        'password',
                        'confirmPassword',
                      ]);
                      if (result) {
                        setStep((currentStep) => currentStep + 1);
                      }
                    }
                    if (step === 1) {
                      const result = await methods.trigger(['iban', 'bic']);
                      if (result) {
                        setStep((currentStep) => currentStep + 1);
                      }
                    }
                    if (step === 2) {
                    }
                  }}
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  type={step === HeaderTitles.length - 1 ? 'submit' : 'button'}
                >
                  {step === HeaderTitles.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Stack>
            </div>
          </form>
        </FormProvider>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SignupForm;
