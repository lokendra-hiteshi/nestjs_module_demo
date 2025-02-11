import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/auth/dtos/CreateUser.dto';
import { Users } from 'src/users/models/users.model';
import { LoginUserDto } from '../dtos/LoginUser.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async signUp(userDetails: CreateUserDto) {
    return await this.usersModel.create(userDetails);
  }

  async login(loginUser: LoginUserDto) {
    const user = await this.usersModel.findOne({
      where: {
        email: loginUser?.email,
        username: loginUser?.username,
      },
    });
    return user;
  }
}
