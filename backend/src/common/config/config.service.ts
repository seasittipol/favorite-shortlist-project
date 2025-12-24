import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface CorsConfig {
  origin: string;
  credentials: boolean;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
}

export interface ApiConfig {
  prefix: string;
  version: string;
  timeout: number;
}

export interface UploadConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

export interface SecurityConfig {
  bcryptRounds: number;
  rateLimitMax: number;
  rateLimitWindowMs: number;
}

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  // Server Configuration
  get port(): number {
    return this.configService.get<number>('app.port', 3000);
  }

  get environment(): string {
    return this.configService.get<string>('app.environment', 'development');
  }

  get isDevelopment(): boolean {
    return this.environment === 'development';
  }

  get isProduction(): boolean {
    return this.environment === 'production';
  }

  get isTest(): boolean {
    return this.environment === 'test';
  }

  // Database Configuration
  get database(): DatabaseConfig {
    return this.configService.getOrThrow<DatabaseConfig>('app.database');
  }

  get databaseUrl(): string {
    const db = this.database;
    return `postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`;
  }

  // JWT Configuration
  get jwt(): JwtConfig {
    return this.configService.getOrThrow<JwtConfig>('app.jwt');
  }

  // CORS Configuration
  get cors(): CorsConfig {
    return this.configService.getOrThrow<CorsConfig>('app.cors');
  }

  // Redis Configuration
  get redis(): RedisConfig {
    return this.configService.getOrThrow<RedisConfig>('app.redis');
  }

  get redisUrl(): string {
    const redis = this.redis;
    const auth = redis.password ? `:${redis.password}@` : '';
    return `redis://${auth}${redis.host}:${redis.port}/${redis.db}`;
  }

  // API Configuration
  get api(): ApiConfig {
    return this.configService.getOrThrow<ApiConfig>('app.api');
  }

  get globalPrefix(): string {
    const api = this.api;
    return `${api.prefix}/${api.version}`;
  }

  // Upload Configuration
  get upload(): UploadConfig {
    return this.configService.getOrThrow<UploadConfig>('app.upload');
  }

  // Email Configuration
  get email(): EmailConfig {
    return this.configService.getOrThrow<EmailConfig>('app.email');
  }
}
