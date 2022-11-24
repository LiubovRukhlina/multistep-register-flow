import { Control, FieldValues, useController } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';

type ControlledInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
  name: string;
  label?: string;
};
function ControlledInput({ control, name, label }: ControlledInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl variant="standard" error={!!error?.message}>
      <InputLabel htmlFor={field.name}>{label}</InputLabel>
      <OutlinedInput
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        label={label}
        name={field.name} // send down the input name
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
}

export default ControlledInput;
