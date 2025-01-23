import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.email)) {
      throw new BadRequestException('Invalid email format');
    }

    const parseAgeToNumber = parseInt(value.age.toString());

    if (isNaN(parseAgeToNumber)) {
      console.log('Checking age');
      throw new BadRequestException('Age should be number');
    }
    return value;
  }
}
