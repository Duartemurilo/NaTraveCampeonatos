/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ZodObject, ZodTypeAny } from "zod";

export function isRequiredField<T extends ZodTypeAny>(
  schema: ZodObject<any>,
  fieldName: string
): boolean {
  const shape = schema.shape;
  const field = shape[fieldName];

  if (!field) return false;

  const description = field._def;

  return description?.typeName !== "ZodOptional" && description?.typeName !== "ZodNullable";
}
