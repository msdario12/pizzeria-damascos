import * as Yup from "yup";

const newPizzaSchema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().required(),
  description: Yup.string().required(),
  img: Yup.string().required(),
});

export default newPizzaSchema;
