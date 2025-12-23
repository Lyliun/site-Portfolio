import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './project.service';
import * as projectDto from './dto/project.dto';

interface ViewCountResponse {
  views: number;
}

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): projectDto.ProjectDto[] {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): projectDto.ProjectDto {
    return this.projectsService.findOne(id);
  }

  @Post(':id/view')
  @HttpCode(HttpStatus.OK)
  incrementView(@Param('id') id: string): ViewCountResponse {
    return this.projectsService.incrementView(id);
  }
}
