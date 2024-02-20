import { AnySchema as JoiAnySchema } from "joi";
import { Request, Response, NextFunction } from "express";

import { checkError } from "../helpers";

export function validate(validator: JoiAnySchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await validator.validateAsync({
        body: req.body,
        query: req.query
      });
      req.body = validated.body;
    

      next();
    } catch (err: any) {
      err.isJoi = true;
      checkError(err, res);
    }
  };
}
