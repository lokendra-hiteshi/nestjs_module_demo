import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dtos/CreatePost.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('create-post')
  async createPost(@Body() postData: CreatePostDto) {
    try {
      const post = await this.postsService.createPost(postData);

      return {
        message: 'New Post created succesfully',
        post,
      };
    } catch (err) {
      return {
        message: `Error in creating a post: ${err}`,
      };
    }
  }

  @Get()
  async fetchAll() {
    try {
      const posts = await this.postsService.findAll();
      return {
        message: 'Post fetched successfully',
        posts,
      };
    } catch (err) {
      return {
        message: `Error in fetching post: ${err}`,
      };
    }
  }

  @Get('by-user-id/:userId')
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const posts = await this.postsService.findByUserId(userId);
      return {
        message: 'Post fetched by user successfully.',
        posts,
      };
    } catch (err) {
      return {
        message: `Error in fetching post by user id, ${err}`,
      };
    }
  }
}
