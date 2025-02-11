import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { CreateUserDto } from 'src/auth/dtos/CreateUser.dto';
import { generateToken } from 'src/utils/jwt';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { LoginUserDto } from './dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: ServicesService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUpUser(@Body(ValidateCreateUserPipe) userDetails: CreateUserDto) {
    try {
      const user = await this.authServices.signUp(userDetails);
      if (!user) {
        throw new HttpException('Error in sign up', HttpStatus.BAD_REQUEST);
      }

      return {
        message:
          'New User created succesfully, please login via username and email.',
      };
    } catch (err) {
      console.error('Error while sign up', err);
      return {
        message: `Error in sign up new user: ${err}`,
      };
    }
  }

  @Post('login')
  async loginUser(@Body() loginUser: LoginUserDto) {
    try {
      const user = await this.authServices.login(loginUser);
      if (!user) {
        throw new HttpException('Error in login', HttpStatus.BAD_REQUEST);
      }
      const token = generateToken(loginUser?.email);
      if (!token) {
        throw new HttpException(
          'unable to generate token',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        message: 'User logged in succesfully',
        token,
      };
    } catch (err) {
      console.error('Error while login', err);
      return {
        message: `Error in login user: ${err}`,
      };
    }
  }
}
