"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const solana_service_1 = require("../solana/solana.service");
const avatarGenerator_1 = require("../utils/avatarGenerator");
let AuthService = class AuthService {
    constructor(userModel, solanaService, avatarGenerator) {
        this.userModel = userModel;
        this.solanaService = solanaService;
        this.avatarGenerator = avatarGenerator;
    }
    async createUser(createUserDto) {
        await this.avatarGenerator.downloadImageToUrl("https://api.dicebear.com/7.x/adventurer-neutral/png?seed=" + createUserDto.address, './generatedAvatar.jpg');
        let attribute = {
            trait_type: 'Multiplier',
            value: "1"
        };
        let attributes = [];
        attributes.push(attribute);
        let createMetadataDto = {
            name: 'X Project NFT',
            description: 'X Project NFT',
            imageUrl: './generatedAvatar.jpg',
            imageName: 'generatedAvatar',
            attributes: attributes
        };
        const metadata = await this.solanaService.createMetadata(createMetadataDto);
        let createNftDto = {
            name: 'X Project NFT'
        };
        const nftAddress = await this.solanaService.createNFT(metadata, createNftDto);
        createUserDto.nfts = [nftAddress];
        return await this.userModel.create(createUserDto);
    }
    async login(authRequestDto) {
        const decodedHash = await this.decodeHash(authRequestDto.hash);
        const address = decodedHash.address;
        const userIsExists = await this.userModel
            .exists({ address: address })
            .lean();
        if (userIsExists) {
            const privateKey = 'zqlYoI1Ix8azT5cYu9HKBCJrGxd2JuDe';
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ data: decodedHash }, privateKey);
            return { token: token };
        }
        throw new common_1.HttpException('UNAUTHORIZED', common_1.HttpStatus.UNAUTHORIZED);
    }
    async decodeHash(hash) {
        let decotedHashDto;
        return decotedHashDto;
    }
    async getUser(id) {
        return await this.userModel.findOne({ _id: id }).lean();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, solana_service_1.SolanaService, avatarGenerator_1.AvatarGenerator])
], AuthService);
//# sourceMappingURL=auth.service.js.map