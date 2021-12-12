import { Test, TestingModule } from '@nestjs/testing';

import { MockRepository } from '../../../../api/structure/ITest';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const mockUserRepository = () => ({
  save: jest.fn(),
  create: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: UserRepository, useValue: mockUserRepository() }],
    }).compile();

    userService = await module.resolve(UserService);
    userRepository = await module.resolve(UserRepository);
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });
});
