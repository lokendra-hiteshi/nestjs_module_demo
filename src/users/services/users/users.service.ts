import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Users } from 'src/users/models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  fetchUsers() {
    return this.usersModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async createUser(userDetails: CreateUserDto) {
    return this.usersModel.create(userDetails);
  }

  async fetchUserById(id: number) {
    return await this.usersModel.findByPk(id);
  }
}
