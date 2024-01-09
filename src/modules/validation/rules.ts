

function isEmail(text: string) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(text);
}

export const notEmpty = (value : any) => !!value || 'Required.';
export const email = (value : any) => isEmail(value) || 'Invalid Email'
export const password = (value : any) => value.length >= 10 || 'min 10 chars'
