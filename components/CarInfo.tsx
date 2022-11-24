import { Button } from '@mui/material';
import React from 'react';

import { useFormContext } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { Car, getCars } from '../pages/api/cars';

function CarInfo() {
  const { register, setValue } = useFormContext();
  const { data: cars } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
    select: (carsData) => {
      return carsData.map((el: Car) => ({
        ...el,
        label: `${el.make} ${el.model}`,
        key: `${el.make} ${el.model}`,
      }));
    },
  });
  console.log('info ', cars);
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cars}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Car Model"
            {...register('car', { required: true })}
          />
        )}
      />

      <Button variant="contained" endIcon={<PhotoCamera />} component="label">
        Upload
        <input
          hidden
          accept="image/*"
          type="file"
          {...register('carRegistration', {
            onChange: (v) => {
              const path = v.target.value;
              const fileName = path.split('\\').pop();
              setValue('fileName', fileName);
            },
          })}
        />
      </Button>
    </>
  );
}

export default CarInfo;
