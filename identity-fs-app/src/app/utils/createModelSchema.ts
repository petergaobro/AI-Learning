import { z } from "zod";
import type Model from "../types/model";

// type Schema = Record<string, any>;
type Schema = Record<string, any>;

function generateStandardErrors(name: string, fieldType: string) {
  return {
    invalid_type_error: `${name} must be a ${fieldType}`,
    required_error: `${name} is required`,
  };
}

export default function createModelSchema(model: Model) {
  const schema: Schema = {};
  model.forEach((m) => {
    const standardErrors = generateStandardErrors(m.name, m.type);
    switch (m.type) {
      case "email": {
        schema[m.field] = z.string(standardErrors).email({
          message: m.errorMessages?.pattern,
        });
        break;
      }
      default:
        // text
        schema[m.field] = z.string(standardErrors);
    }
    if ("min" in m)
      schema[m.field] = schema[m.field].gte(m.min, {
        message: m.errorMessages?.min,
      });
    if ("max" in m)
      schema[m.field] = schema[m.field].lte(m.max, {
        message: m.errorMessages?.max,
      });
    if ("minLength" in m)
      schema[m.field] = schema[m.field].min(m.minLength, {
        message: m.errorMessages?.minLength,
      });
    if ("maxLength" in m)
      schema[m.field] = schema[m.field].max(m.maxLength, {
        message: m.errorMessages?.maxLength,
      });
    if ("pattern" in m)
      schema[m.field] = schema[m.field].regex(m.pattern, {
        message: m.errorMessages?.pattern,
      });
    if (!m.required) schema[m.field] = schema[m.field].optional();
  });
  return z.object(schema);
}
