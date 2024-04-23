import { Injectable } from '@nestjs/common';

export interface User {
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly mockedUsers: User[] = [
    {
      username: 'Alice',
      password: 'pass',
    },
    {
      username: 'Bob',
      password: 'pass',
    },
  ];

  findByUsername(username: string): User | null {
    return this.mockedUsers.find((user) => user.username === username) ?? null;
  }
}
