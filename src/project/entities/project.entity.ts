import { ProjectStatusEnum } from "../project.schema";

export class Project {
    title: string;
    description: string;
    projectOwnerAddress: string;
    status: ProjectStatusEnum;
    totalTask: number;
}
