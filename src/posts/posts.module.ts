import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';
import { Posts } from './models/posts.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/models/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Posts, Users])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
