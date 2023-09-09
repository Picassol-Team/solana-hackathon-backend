import { CreateMetadataDto, CreateNftDto, UpdateNftDto } from './dto/solana.dto';
export declare class SolanaService {
    metaplex: any;
    wallet: any;
    constructor();
    createMetadata(createMetadataDto: CreateMetadataDto): Promise<any>;
    createNFT(metadata: any, createNftDto: CreateNftDto): Promise<string>;
    updateNFT(nftAddress: string, metadata: any, updateNftDto: UpdateNftDto): Promise<any>;
    getNFT(nftAddress: string): Promise<any>;
}
