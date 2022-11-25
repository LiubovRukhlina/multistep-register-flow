import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthInfo from './AuthInfo';
import CarInfo from './CarInfo';
import FinanceInfo from './FinanceInfo';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - min 8 chars')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    iban: yup.string().required(),
    bic: yup.string().required(),
    car: yup.string().required(),
  })
  .required();

const steps = [
  'Sign Up',
  'Provide your bank details',
  'Provide your car information',
];
const SignupForm = () => {
  const [step, setStep] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

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
    toast.success('🦄 Form submitted!', {
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
  const handleStep = (step: number) => () => {
    setActiveStep(step);
    setStep(step);
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  return (
    <div className="form">
      <div className="container">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="header">
              <h1>{HeaderTitles[step]}</h1>
            </div>
            <div className="stepper">
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="body">{StepSelector()}</div>
            <div className="footer">
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => {
                    handleBack();
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
                        handleNext();
                        handleComplete();
                        setStep((currentStep) => currentStep + 1);
                      } else {
                      }
                    }
                    if (step === 1) {
                      const result = await methods.trigger(['iban', 'bic']);
                      if (result) {
                        handleNext();
                        handleComplete();
                        setStep((currentStep) => currentStep + 1);
                      }
                    }
                    if (step === 2) {
                      handleComplete();
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
