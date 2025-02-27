import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { Users } from 'src/users/models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async fetchUsers() {
    return await this.usersModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async fetchUserByEmail(email: string) {
    return await this.usersModel.findOne({
      where: {
        email,
      },
    });
  }

  async fetchUserById(id: number) {
    return await this.usersModel.findByPk(id);
  }
}
