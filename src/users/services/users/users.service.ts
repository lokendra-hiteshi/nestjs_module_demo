import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { email: 'loken7213@gmail.com', username: 'Lokendra' },
    { email: 'loken7213@gmail.com', username: 'Lokendra' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }

  fetchUserById(id: number) {
    return { id, username: 'Lokendra', email: 'loken@gmail.com' };
  }
}
