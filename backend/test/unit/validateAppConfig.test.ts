import { ConfigValidator } from "../../src/config/ConfigValidator";
import { AppConfig } from "../../src/model/AppConfig";
import { appConfigSchema } from "../../src/validation/AppConfig.validation";
import { invalidAppConfigs, validAppConfigs } from "./fixtures/AppConfigs";

describe("App config...", () => {
  it.each(validAppConfigs)("should be validated as valid: %j", (config) => {
    const validationResult = ConfigValidator.validate<AppConfig>(config, appConfigSchema);
    expect(validationResult).toBeDefined();
    expect(validationResult.error).toBeUndefined();
    expect(validationResult.validatedConfig).toEqual(config);
  });

  it.each(invalidAppConfigs)("should be validated as invalid: %j", (config) => {
    const validationResult = ConfigValidator.validate<AppConfig>(config, appConfigSchema);
    expect(validationResult).toBeDefined();
    expect(validationResult.error).toBeDefined();
    expect(validationResult.validatedConfig).toBeUndefined();
  });
});
