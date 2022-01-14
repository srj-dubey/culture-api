//Validation for regestering a new user

import Joi from "@hapi/joi";

//register a new user

export const registerUser = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(120).required(),
    email: Joi.string().min(6).max(60).email().required(),
    password: Joi.string().min(8).max(30).required(),
  });

  return schema.validate(data);
};
