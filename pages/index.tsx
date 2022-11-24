import React from 'react';
import SignupForm from '../components/SignupForm';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCars } from './api/cars';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['cars'], getCars);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Signup() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}

export default Signup;
