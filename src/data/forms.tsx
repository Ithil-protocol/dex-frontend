import { LimitInputs, MarketInputs } from "types";
import { object, string, ObjectSchema } from "yup";

export const limitSchema: ObjectSchema<LimitInputs> = object().shape({
  Price: string().required(),
  Amount: string().required(),
  Boost: string().required(),
});

export const marketSchema: ObjectSchema<MarketInputs> = object().shape({
  Amount: string().required(),
});
