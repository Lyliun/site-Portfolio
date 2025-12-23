import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../project.controller';
import { ProjectsService } from '../project.service';
import { ProjectStatus } from '../dto/project.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProject = {
    id: '1',
    name: 'Test Project',
    tech: ['Jest'],
    description: 'Testing description',
    status: ProjectStatus.ACTIVE,
    link: '#',
    github: '#',
    views: 10,
  };

  const mockService = {
    findAll: jest.fn().mockReturnValue([mockProject]),
    findOne: jest.fn().mockReturnValue(mockProject),
    incrementView: jest.fn().mockReturnValue({ views: 11 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of projects', () => {
      const result = controller.findAll();
      expect(result).toEqual([mockProject]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single project by id', () => {
      const result = controller.findOne('1');
      expect(result).toEqual(mockProject);
      expect(mockService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if service throws it', () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.findOne('99')).toThrow(NotFoundException);
    });
  });

  describe('incrementView', () => {
    it('should return the updated view count', () => {
      const result = controller.incrementView('1');
      expect(result).toEqual({ views: 11 });
      expect(mockService.incrementView).toHaveBeenCalledWith('1');
    });
  });
});
