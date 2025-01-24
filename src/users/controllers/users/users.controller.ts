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
import { AuthGuardGuard } from 'src/users/guards/auth-guard.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserType } from 'src/utils/types';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuardGuard)
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserType) {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.fetchUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
