import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../project.service';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of projects', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a project when found', () => {
      const project = service.findOne('1');
      expect(project.id).toBe('1');
    });

    it('should throw NotFoundException when not found', () => {
      expect(() => service.findOne('non-existent')).toThrow(NotFoundException);
    });
  });

  describe('incrementView', () => {
    it('should increment view count for a project', () => {
      const before = service.findOne('1');
      const previousViews = before.views ?? 0;
      const res = service.incrementView('1');
      expect(res.views).toBe(previousViews + 1);
    });
  });
});
