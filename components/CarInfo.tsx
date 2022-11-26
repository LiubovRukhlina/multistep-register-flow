import { Button } from '@mui/material';
import React, { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { Car, getCars } from '../pages/api/cars';

function CarInfo() {
  const { register } = useFormContext();
  const [fName, setFName] = useState<string>();

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

  return (
    <div className="controlled-input-container">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cars}
        sx={{ m: 1, width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Car Model"
            {...register('car', { required: true })}
          />
        )}
      />

      <Button
        variant="contained"
        endIcon={<PhotoCamera />}
        component="label"
        sx={{ m: 1, width: 300 }}
      >
        Upload car registration:
        <div>
          <input
            hidden
            accept="image/*"
            type="file"
            {...register('carRegistration', {
              onChange: (v) => {
                const path = v.target.value;
                const fileName = path.split('\\').pop();

                setFName(fileName);
                console.log(fName);
              },
            })}
          />
        </div>
      </Button>
      <div>{fName}</div>
    </div>
  );
}

export default CarInfo;
