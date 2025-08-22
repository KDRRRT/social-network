export const validatePosts: FieldValidatorType = (value) => {
  if (!value) {
    return "error";
  } else if (value.length > 10) {
    return "error";
  }
  
}

export const validateMesages: FieldValidatorType = (value) => {
  if (!value) {
    return "error";
  }
}

export type FieldValidatorType = (value: string) => string | undefined
