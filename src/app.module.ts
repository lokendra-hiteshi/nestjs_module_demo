import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/db.config';
import { PostsModule } from './posts/posts.module';
import { ControllersController } from './auth/controllers/controllers.controller';
import { ServicesService } from './auth/services/services.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: databaseConfig.dialect,
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      // models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [ControllersController],
  providers: [ServicesService],
})
export class AppModule {}
