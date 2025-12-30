"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const project_dto_1 = require("./dto/project.dto");
let ProjectsService = ProjectsService_1 = class ProjectsService {
    logger = new common_1.Logger(ProjectsService_1.name);
    projects = [
        {
            id: '1',
            name: 'Project Simplify(To do List)',
            tech: ['Next.js', 'NestJS', 'TypeScript'],
            description: 'Full-stack To do List application',
            status: project_dto_1.ProjectStatus.PRODUCTION,
            link: '#',
            github: 'https://github.com/Lyliun/projeto-simplify',
            views: 0,
        },
        {
            id: '2',
            name: 'Cyberpunk Eye Shader',
            tech: ['ShaderLab', 'C#', 'Unity'],
            description: 'VFX Eye Shader for Cyberpunk Style Characters',
            status: project_dto_1.ProjectStatus.DEPLOYED,
            link: '#',
            github: 'https://github.com/Lyliun/Lia-s-Shader',
            views: 0,
        },
        {
            id: '3',
            name: 'Karude Bot',
            tech: ['Python', 'SqLite', 'Discord.py'],
            description: 'All-round Discord Bot with various utilities and games',
            status: project_dto_1.ProjectStatus.ACTIVE,
            link: '#',
            github: 'https://github.com/Lyliun/Karude-beta',
            views: 0,
        },
    ];
    findAll() {
        return this.projects;
    }
    findOne(id) {
        const project = this.projects.find((p) => p.id === id);
        if (!project) {
            throw new common_1.NotFoundException(`Projeto com ID ${id} não encontrado`);
        }
        return project;
    }
    incrementView(id) {
        const project = this.findOne(id);
        const updatedViews = (project.views ?? 0) + 1;
        project.views = updatedViews;
        this.logger.log(`View incrementada para projeto ${project.name}: ${updatedViews}`);
        return { views: updatedViews };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = ProjectsService_1 = __decorate([
    (0, common_1.Injectable)()
], ProjectsService);
//# sourceMappingURL=project.service.js.map