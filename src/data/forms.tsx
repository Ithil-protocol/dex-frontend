import { FactoryInputs, LimitInputs, MarketInputs } from "@/types";
import { object, string, ObjectSchema } from "yup";

export const limitSchema: ObjectSchema<LimitInputs> = object()
  .shape({
    price: string().required(),
    amount: string().required(),
    boost: string(),
  })
  .required();

export const marketSchema: ObjectSchema<MarketInputs> = object()
  .shape({
    amount: string().required(),
  })
  .required();

export const factorySchema: ObjectSchema<FactoryInputs> = object()
  .shape({
    underlyingAddress: string().required(),
    accountingAddress: string().required(),
  })
  .required();
