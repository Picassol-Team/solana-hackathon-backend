import { Injectable } from '@nestjs/common';
import { CreateMetadataDto, CreateNftDto, UpdateNftDto } from './dto/solana.dto';
const { Keypair, Connection,PublicKey } = require("@solana/web3.js");
const { TokenStandard } = require( '@metaplex-foundation/mpl-token-metadata');
const fs = require("fs");
const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
} = require("@metaplex-foundation/js");


@Injectable()
export class SolanaService {
    metaplex: any;
    wallet: any;
    constructor(){
        // Create connection and wallet
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        this.wallet = Keypair.fromSecretKey(
        new Uint8Array([
            124, 185, 118, 98, 159, 175, 46, 249, 113, 123, 127, 110, 62, 62, 235, 238,
            86, 204, 61, 141, 158, 228, 11, 34, 58, 92, 147, 160, 161, 54, 167, 10, 249,
            94, 29, 234, 137, 96, 68, 198, 59, 118, 255, 70, 186, 226, 248, 219, 6, 113,
            181, 36, 109, 46, 12, 214, 156, 239, 90, 56, 154, 140, 147, 242,
            ])
        );

        console.log("Public Key:", this.wallet.publicKey.toBase58());

        this.metaplex = Metaplex.make(connection)
        .use(keypairIdentity(this.wallet))
        .use(
            bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000,
            })
        );
    }

    async createMetadata(createMetadataDto:CreateMetadataDto) {

        const metadata = await this.metaplex.nfts().uploadMetadata({
          name: createMetadataDto.name,
          description: createMetadataDto.description,
      
          image: await toMetaplexFile(fs.readFileSync(createMetadataDto.imageUrl), createMetadataDto.imageName),
          attributes: createMetadataDto.attributes,
        });
        
        return metadata;
    }
    
    async createNFT(metadata:any,createNftDto:CreateNftDto): Promise<string>{
        
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
    
    async updateNFT(nftAddress:string,metadata:any,updateNftDto:UpdateNftDto) {
        // console.log(`Step 1 - Fetching existing NFT`);
        const nft = await this.metaplex.nfts().findByMint({
            mintAddress: new PublicKey(nftAddress),
        });
        if (!nft || !nft.json?.image) {
            throw new Error("Unable to find existing nft or image uri!");
        }
        // console.log(`   NFT Found!`);
        
        const result = await this.metaplex.nfts().update(
            {
            name: updateNftDto.name,
            nftOrSft: nft,
            uri: metadata.uri,
            },
            { commitment: "finalized" }
        );
        // console.log(`Success!🎉`);
        // console.log(
        //     `   Updated NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`
        // );
        return result;
    }
    
    async getNFT(nftAddress:string) {
        const nft = await this.metaplex.nfts().findByMint({
            mintAddress:new PublicKey(nftAddress),
        });
        if (!nft || !nft.json?.image) {
            throw new Error("Unable to find existing nft or image uri!");
        }

        return nft;
    }
}
