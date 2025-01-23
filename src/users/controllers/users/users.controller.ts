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
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUsersPost() {
    return [
      {
        username: 'Lokendra',
        email: 'loken7213@gmail.com',
        post: [
          {
            id: 1,
            title: 'Post 1',
          },
        ],
      },
    ];
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    const user = this.userService.fetchUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
