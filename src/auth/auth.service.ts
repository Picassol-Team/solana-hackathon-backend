import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRequestDto, CreateUserDto, DecotedHashDto } from './dto/auth.dto';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async login(authRequestDto: AuthRequestDto) {
    const decodedHash = await this.decodeHash(authRequestDto.hash);

    const address = decodedHash.address;

    const userIsExists = await this.userModel
      .exists({ address: address })
      .lean();

    if (userIsExists) {
      const privateKey = 'zqlYoI1Ix8azT5cYu9HKBCJrGxd2JuDe';

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ data: decodedHash }, privateKey);

      return { token: token };
    }

    throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }

  async decodeHash(hash: string): Promise<DecotedHashDto> {
    let decotedHashDto: DecotedHashDto;
    return decotedHashDto;
  }
}
