import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/users/models/users.model';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  fetchUsers() {
    return this.usersModel.findAll();
  }

  async createUser(userDetails: CreateUserType): Promise<Users> {
    return this.usersModel.create(userDetails);
  }

  async fetchUserById(id: number) {
    return await this.usersModel.findByPk(id);
  }
}
