import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/, "Username can only contain letters, numbers, and spaces")
    .required("Username is required"),

  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),

  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  phone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
});
