import { Button } from '@mui/material';
import React from 'react';

import { useFormContext } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const cars = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
];

function CarInfo() {
  const { register, setValue } = useFormContext();

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
