
const passwordValidator = (value: string) =>{
  const errors = [];
  if(value.length < 8 || value.length > 255) errors.push('Password must contain from 8 to 255 symbols');
  return errors;
}

export {passwordValidator}