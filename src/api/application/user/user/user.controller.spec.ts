import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('userController should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });
});
