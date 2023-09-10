import { ProjectStatusEnum } from "../project.schema";

export class CreateProjectDto {
  title: string;
  description: string;
  projectOwnerAddress: string;
  status: ProjectStatusEnum;
}
