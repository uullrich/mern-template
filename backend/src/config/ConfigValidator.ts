import { ObjectSchema, ValidationResult } from "joi";

export class ConfigValidator {
  public static validate<T>(
    config: Partial<T>,
    objectSchema: ObjectSchema,
  ): {
    validatedConfig?: T;
    error?: ValidationResult["error"];
  } {
    const validationResult = objectSchema
      .prefs({ errors: { label: "key" } })
      .validate(config, { abortEarly: false, stripUnknown: true });

    return {
      validatedConfig: validationResult.error ? undefined : (validationResult.value as T),
      error: validationResult.error,
    };
  }
}
