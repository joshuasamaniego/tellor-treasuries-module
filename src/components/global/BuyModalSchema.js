import * as yup from "yup";

export const formSchema = yup.object().shape({
  amount: yup.number().required().typeError("Must input number to buy"),
});
