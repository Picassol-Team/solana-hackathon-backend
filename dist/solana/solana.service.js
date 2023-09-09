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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaService = void 0;
const common_1 = require("@nestjs/common");
const { Keypair, Connection, PublicKey } = require("@solana/web3.js");
const { TokenStandard } = require('@metaplex-foundation/mpl-token-metadata');
const fs = require("fs");
const { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, } = require("@metaplex-foundation/js");
let SolanaService = class SolanaService {
    constructor() {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        this.wallet = Keypair.fromSecretKey(new Uint8Array([
            124, 185, 118, 98, 159, 175, 46, 249, 113, 123, 127, 110, 62, 62, 235, 238,
            86, 204, 61, 141, 158, 228, 11, 34, 58, 92, 147, 160, 161, 54, 167, 10, 249,
            94, 29, 234, 137, 96, 68, 198, 59, 118, 255, 70, 186, 226, 248, 219, 6, 113,
            181, 36, 109, 46, 12, 214, 156, 239, 90, 56, 154, 140, 147, 242,
        ]));
        console.log("Public Key:", this.wallet.publicKey.toBase58());
        this.metaplex = Metaplex.make(connection)
            .use(keypairIdentity(this.wallet))
            .use(bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000,
        }));
    }
    async createMetadata(createMetadataDto) {
        const metadata = await this.metaplex.nfts().uploadMetadata({
            name: createMetadataDto.name,
            description: createMetadataDto.description,
            image: await toMetaplexFile(fs.readFileSync(createMetadataDto.imageUrl), createMetadataDto.imageName),
            attributes: createMetadataDto.attributes,
        });
        return metadata;
    }
    async createNFT(metadata, createNftDto) {
        const nft = await this.metaplex.nfts().create({
            uri: metadata.uri,
            name: createNftDto.name,
            seller_fee_basis_points: 500,
            isCollection: false,
            creators: [{ address: this.wallet.publicKey, verified: true, share: 100 }],
            tokenStandard: TokenStandard.ProgrammableNonFungible,
        });
        return nft.mintAddress.toBase58();
    }
    async updateNFT(nftAddress, metadata, updateNftDto) {
        const nft = await this.metaplex.nfts().findByMint({
            mintAddress: new PublicKey(nftAddress),
        });
        if (!nft || !nft.json?.image) {
            throw new Error("Unable to find existing nft or image uri!");
        }
        const result = await this.metaplex.nfts().update({
            name: updateNftDto.name,
            nftOrSft: nft,
            uri: metadata.uri,
        }, { commitment: "finalized" });
        return result;
    }
    async getNFT(nftAddress) {
        const nft = await this.metaplex.nfts().findByMint({
            mintAddress: new PublicKey(nftAddress),
        });
        if (!nft || !nft.json?.image) {
            throw new Error("Unable to find existing nft or image uri!");
        }
        return nft;
    }
};
exports.SolanaService = SolanaService;
exports.SolanaService = SolanaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SolanaService);
//# sourceMappingURL=solana.service.js.map