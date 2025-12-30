import { ProjectsService } from './project.service';
import * as projectDto from './dto/project.dto';
interface ViewCountResponse {
    views: number;
}
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): projectDto.ProjectDto[];
    findOne(id: string): projectDto.ProjectDto;
    incrementView(id: string): ViewCountResponse;
}
export {};
