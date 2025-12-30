import { ProjectDto } from './dto/project.dto';
export declare class ProjectsService {
    private readonly logger;
    private readonly projects;
    findAll(): ProjectDto[];
    findOne(id: string): ProjectDto;
    incrementView(id: string): {
        views: number;
    };
}
