import { Test, TestingModule } from '@nestjs/testing';
import { StatusGateway } from './status.gateway';
import { StatusService } from './status.service';

describe('StatusGateway', () => {
  let gateway: StatusGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusGateway, StatusService],
    }).compile();

    gateway = module.get<StatusGateway>(StatusGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
