import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from 'src/posts/models/posts.model';
import { Users } from 'src/users/models/users.model';
import { CreatePostType } from 'src/utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts)
    private postsModel: typeof Posts,
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async createPost(postData: CreatePostType): Promise<Posts> {
    console.log('PostData in services', postData);
    return this.postsModel.create(postData);
  }

  async findAll() {
    return this.postsModel.findAll();
  }

  async findByUserId(userId: number) {
    const user = await this.usersModel.findByPk(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return this.postsModel.findAll({
      where: {
        userId: userId,
      },
    });
  }
}
