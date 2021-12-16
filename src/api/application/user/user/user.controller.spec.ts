import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { User } from '@app/models/user/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const userId = uuidv4();
const testUserName = 'user1';
const testUserEmail = 'user1@gmail.com';
const testUserCreateDt = new Date('2021-12-13');
const testUserUpdateDt = new Date('2021-12-14');
const testUserArray = [
  {
    id: userId,
    name: testUserName,
    email: testUserEmail,
    password: 'secretpassword',
    created_dt: testUserCreateDt,
    updated_dt: testUserUpdateDt,
  },
  {
    id: userId,
    name: 'user2',
    email: 'user2@gmail.com',
    password: 'secretpassword',
    created_dt: new Date('2021-11-11'),
    updated_dt: new Date('2021-11-12'),
  },
  {
    id: userId,
    name: 'user3',
    email: 'user3@gmail.com',
    password: 'secretpassword',
    created_dt: new Date('2021-1-1'),
  },
];
const testUserOne = testUserArray[0];

const mockUserRepository = () => ({
  find: jest.fn().mockResolvedValue(testUserArray),
  findOne: jest.fn().mockResolvedValue(testUserOne),
  save: jest.fn().mockResolvedValue(testUserArray[2]),
  create: jest.fn().mockReturnValue(testUserOne),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [Logger, UserService, { provide: UserRepository, useValue: mockUserRepository() }],
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

  describe('getOne', () => {
    it('should return signle user in Response Entity', async () => {
      const body: ResponseEntity<User> = await userController.getOne({ id: 'a userid' });
      const data = body.data;

      expect(body.statusCode).toBe('OK');
      expect(body.message).toBe('');
      expect(data.name).toBe('user1');
      expect(data.email).toBe('user1@gmail.com');
      expect(data.created_dt).toStrictEqual(new Date('2021-12-13'));
      expect(data.updated_dt).toStrictEqual(new Date('2021-12-14'));
    });
  });

  describe('createOne', () => {
    it('should return signle user in Response Entity', async () => {
      const body: ResponseEntity<User | string> = await userController.createOne(testUserOne);

      expect(body.statusCode).toBe('OK');
      expect(body.message).toBe('');
    });
  });
});
