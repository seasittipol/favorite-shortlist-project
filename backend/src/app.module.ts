import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './domain/users/users.module';
import { ResortsModule } from './domain/resorts/resorts.module';
import { FavoritesModule } from './domain/favorites/favorites.module';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    ResortsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
