export declare class Attribute {
    trait_type: string;
    value: any;
}
export declare class CreateMetadataDto {
    name: string;
    description: string;
    imageUrl: string;
    imageName: string;
    attributes: Attribute[];
}
export declare class CreateNftDto {
    name: string;
}
export declare class UpdateNftDto {
    name: string;
}
