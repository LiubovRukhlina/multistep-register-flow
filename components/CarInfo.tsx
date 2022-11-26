import { Button } from '@mui/material';
import React, { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery } from '@tanstack/react-query';
import { Car, getCars } from '../pages/api/cars';
import ControlledInput from './common/ControlledInput';

function CarInfo() {
  const { control, setValue, register } = useFormContext();
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
        sx={{ width: 300 }}
        renderInput={(params) => (
          <ControlledInput
            autocompleteRenderInputParams={params}
            control={control}
            label="Car Model"
            name="car"
          />
        )}
      />

      <Button variant="outlined" endIcon={<PhotoCamera />} component="label">
        Upload car registration
        <br />
        <div>
          <input
            hidden
            accept="image/*"
            type="file"
            {...register('carRegistration', {
              onChange: (v) => {
                const path = v.target.value;
                const fileName = path.split('\\').pop();
                setValue('fileName', fileName);
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
