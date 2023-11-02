import * as Yup from "yup";

const newPizzaSchema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().required(),
  description: Yup.string().required(),
  img: Yup.string().required(),
});

export const updatedPizzaSchema = Yup.object({
  name: Yup.string(),
  price: Yup.number(),
  description: Yup.string(),
  img: Yup.string(),
});

export default newPizzaSchema;
