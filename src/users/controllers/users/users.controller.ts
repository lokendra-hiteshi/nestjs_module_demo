import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuardGuard } from 'src/users/guards/auth-guard.guard';
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
