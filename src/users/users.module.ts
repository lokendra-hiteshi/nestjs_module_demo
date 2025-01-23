import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middleware/example/example.middleware';
import { AnotherMiddleware } from './middleware/another/another.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware)
      .forRoutes({
        path: 'users',
        method: RequestMethod.GET,
      })
      .apply(AnotherMiddleware)
      .forRoutes({
        path: 'users',
        method: RequestMethod.GET,
      });
  }
}
