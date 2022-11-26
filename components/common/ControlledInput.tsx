import { Control, FieldValues, useController } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ChangeEventHandler, useCallback, useState } from 'react';
import {
  AutocompleteRenderInputParams,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

type ControlledInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  accept?: string;
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  autocompleteRenderInputParams?: AutocompleteRenderInputParams | undefined;
};

function ControlledInput({
  control,
  name,
  label,
  type = 'text',
  onChange,
  autocompleteRenderInputParams,
}: ControlledInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant="outlined"
      error={!!error?.message}
      sx={{ m: 1, width: 200 }}
    >
      <InputLabel htmlFor={field.name}>{label}</InputLabel>
      <OutlinedInput
        {...autocompleteRenderInputParams}
        onChange={onChange || field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        label={label}
        name={field.name} // send down the input name
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        endAdornment={
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
}

export default ControlledInput;
