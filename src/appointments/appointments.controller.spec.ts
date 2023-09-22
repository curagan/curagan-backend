import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentsController } from './appointments.controller';
import { AppoinmentsService } from './appointments.service';

describe('AppoinmentsController', () => {
  let controller: AppoinmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppoinmentsController],
      providers: [AppoinmentsService],
    }).compile();

    controller = module.get<AppoinmentsController>(AppoinmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
