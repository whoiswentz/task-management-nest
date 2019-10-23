import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export enum Environments {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config: dotenv.DotenvParseOutput = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      DB_TYPE: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
      DB_PORT: Joi.number().default(5432),
      DB_HOST: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_SYNCHRONIZE: Joi.boolean().required(),
      JWT_EXPIRESIN: Joi.number().default(36000),
      JWT_SECRET: Joi.string().required(),
    });

    const validationResult: Joi.ValidationResult = envVarsSchema.validate(envConfig);
    if (validationResult.error) {
      throw new Error(`Config validation error: ${validationResult.error.message}`);
    }
    return validationResult.value;
  }

  get env(): EnvConfig {
    return this.envConfig;
  }
}
