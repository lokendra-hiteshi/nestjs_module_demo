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
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { generateToken } from 'src/utils/jwt';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authServices: ServicesService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  async signUpUser(@Body(ValidateCreateUserPipe) userDetails: CreateUserDto) {
    try {
      const user = await this.authServices.signUp(userDetails);
      if (!user) {
        throw new HttpException('Error in sign up', HttpStatus.BAD_REQUEST);
      }
      const token = generateToken(userDetails?.email);
      return {
        message: 'New User created succesfully',
        token,
      };
    } catch (err) {
      return {
        message: `Error in sign up new user: ${err}`,
      };
    }
  }
}
