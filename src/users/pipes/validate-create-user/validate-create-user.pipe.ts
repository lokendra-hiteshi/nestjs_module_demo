import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.email)) {
      throw new BadRequestException('Invalid email format');
    }

    const parseAgeToNumber = parseInt(value?.age?.toString());

    if (isNaN(parseAgeToNumber)) {
      throw new BadRequestException('Age should be number');
    }
    return value;
  }
}
