import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { CreatePostType } from 'src/utils/types';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('create-post')
  createPost(@Body() postData: CreatePostType) {
    console.log(postData);
    return this.postsService.createPost(postData);
  }

  @Get()
  fetchAll() {
    return this.postsService.findAll();
  }

  @Get('by-user-id/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findByUserId(userId);
  }
}
