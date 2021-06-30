import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let provider: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService],
    }).compile();

    provider = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
