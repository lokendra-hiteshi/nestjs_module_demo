import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from 'src/posts/dtos/CreatePost.dto';
import { Posts } from 'src/posts/models/posts.model';
import { Users } from 'src/users/models/users.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts)
    private postsModel: typeof Posts,
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async createPost(postData: CreatePostDto): Promise<Posts> {
    return this.postsModel.create(postData);
  }

  async findAll() {
    return this.postsModel.findAll({
      order: [['createdAt', 'DESC']],
    });
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
      order: [['createdAt', 'DESC']],
    });
  }
}
