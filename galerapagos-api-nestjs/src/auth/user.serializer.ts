import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (param: string, user: string) => any) {
    console.log('serializeUser');
    done(null, user.username);
  }

  deserializeUser(username: string, done: (param: string, user: User) => any) {
    console.log('deserializeUser');
    const user = this.usersService.findByUsername(username);

    if (!user) {
      return done(
        `Could not deserialize user: user with ${username} could not be found`,
        null,
      );
    }

    done(null, user);
  }
}
