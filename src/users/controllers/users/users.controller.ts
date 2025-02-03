import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuardGuard } from 'src/users/guards/auth-guard.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuardGuard)
  async getUsers() {
    try {
      const users = await this.userService.fetchUsers();
      return {
        message: 'Users fetched successfully.',
        users,
      };
    } catch (err) {
      return {
        message: `Error in fetching users: ${err}`,
      };
    }
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    try {
      const user = await this.userService.createUser(userData);
      return {
        message: 'New User created successfully.',
        user,
      };
    } catch (err) {
      return {
        message: `Error in creating user: ${err}`,
      };
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.fetchUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'User fertched successfully.',
        user,
      };
    } catch (err) {
      return {
        message: `Error in fetching user: ${err}`,
      };
    }
  }
}
