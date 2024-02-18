function isEmail(text: string) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(text);
}

export const notEmpty = (value: any) => !!value || "필수입니다.";
export const email = (value: any) =>
  isEmail(value) || "유효한 이메일이 아닙니다.";
export const password = (value: any) =>
  value.length >= 10 || "비밀번호는 10자 ~ 20자 입니다.";
