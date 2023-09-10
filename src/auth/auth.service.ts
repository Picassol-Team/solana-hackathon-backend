import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRequestDto, CreateUserDto, DecotedHashDto, UserDto } from './dto/auth.dto';
import { User } from './user.schema';
import { SolanaService } from 'src/solana/solana.service';
import { Attribute, CreateMetadataDto, CreateNftDto } from 'src/solana/dto/solana.dto';
import { AvatarGenerator } from 'src/utils/avatarGenerator';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly solanaService:SolanaService, private readonly avatarGenerator:AvatarGenerator) {}

  async createUser(createUserDto: CreateUserDto) {

    await this.avatarGenerator.downloadImageToUrl("https://api.dicebear.com/7.x/adventurer-neutral/png?seed="+createUserDto.address, './generatedAvatar.jpg');

    let attribute:Attribute={
      trait_type: 'Multiplier',
      value: "1"
    };
    let attributes:Attribute[]=[];
    attributes.push(attribute);

    let createMetadataDto:CreateMetadataDto={
      name: 'X Project NFT',
      description: 'X Project NFT',
      imageUrl: './generatedAvatar.jpg',
      imageName: 'generatedAvatar',
      attributes: attributes
    };

    const metadata = await this.solanaService.createMetadata(createMetadataDto);
    let createNftDto:CreateNftDto={
      name: 'X Project NFT'
    };
    const nftAddress = await this.solanaService.createNFT(metadata,createNftDto);
    createUserDto.nfts=[nftAddress];

    await this.solanaService.transferNFT(nftAddress, createUserDto.address);
    
    return await this.userModel.create(createUserDto);
  }

  async findOne(address: string) {
    return await this.userModel.findOne({ address: address }).lean();
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

  async getUser(id: string): Promise<UserDto> {
    return await this.userModel.findOne({ _id: id }).lean();
  }
}
