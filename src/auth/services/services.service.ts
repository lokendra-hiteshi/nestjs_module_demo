import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Users } from 'src/users/models/users.model';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async signUp(userDetails: CreateUserDto) {
    return this.usersModel.create(userDetails);
  }
}
