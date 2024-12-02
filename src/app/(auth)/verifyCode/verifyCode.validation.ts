import * as Yup from "yup";

export const validationSchema = Yup.object({
  resetCode: Yup.string()
    .matches(/^\d{6}$/, "Reset code must be exactly 6 digits") // يجب أن يحتوي على 6 أرقام فقط
    .required("Reset code is required"),
});
