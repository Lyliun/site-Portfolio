import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProjectDto, ProjectStatus } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  private readonly projects: ProjectDto[] = [
    {
      id: '1',
      name: 'Project Simplify(To do List)',
      tech: ['Next.js', 'NestJS', 'TypeScript'],
      description: 'Full-stack To do List application',
      status: ProjectStatus.PRODUCTION,
      link: '#',
      github: 'https://github.com/Lyliun/projeto-simplify',
      views: 0,
    },
    {
      id: '2',
      name: 'Cyberpunk Eye Shader',
      tech: ['ShaderLab', 'C#', 'Unity'],
      description: 'VFX Eye Shader for Cyberpunk Style Characters',
      status: ProjectStatus.DEPLOYED,
      link: '#',
      github: 'https://github.com/Lyliun/Lia-s-Shader',
      views: 0,
    },
    {
      id: '3',
      name: 'Karude Bot',
      tech: ['Python', 'SqLite', 'Discord.py'],
      description: 'All-round Discord Bot with various utilities and games',
      status: ProjectStatus.ACTIVE,
      link: '#',
      github: 'https://github.com/Lyliun/Karude-beta',
      views: 0,
    },
  ];

  findAll(): ProjectDto[] {
    return this.projects;
  }

  findOne(id: string): ProjectDto {
    const project = this.projects.find((p) => p.id === id);

    if (!project) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }

    return project;
  }

  incrementView(id: string): { views: number } {
    const project = this.findOne(id);

    const updatedViews = (project.views ?? 0) + 1;

    project.views = updatedViews;

    this.logger.log(
      `View incrementada para projeto ${project.name}: ${updatedViews}`,
    );

    return { views: updatedViews };
  }
}
