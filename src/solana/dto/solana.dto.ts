export class Attribute {
  trait_type:string;
  value:any;
}

export class CreateMetadataDto {
  name: string;
  description: string;
  imageUrl:string;
  imageName:string;
  attributes:Attribute[];
}

export class CreateNftDto {
  name: string;
}

export class UpdateNftDto {
  name: string;
}