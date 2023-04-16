import { LimitInputs, MarketInputs } from "types";
import { object, string, ObjectSchema } from "yup";

export const limitSchema: ObjectSchema<LimitInputs> = object()
  .shape({
    price: string().max(3, "error").required(),
    amount: string().required(),
    boost: string().required(),
  })
  .required();

export const marketSchema: ObjectSchema<MarketInputs> = object()
  .shape({
    amount: string().required(),
  })
  .required();
