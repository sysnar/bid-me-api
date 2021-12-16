import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { MockRepository } from '@app/api/structure/ITest';
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

  describe('getAll', () => {
    it('should return an array of user', async () => {
      const manyUsers = await userService.getAll();
      expect(manyUsers).toEqual(testUserArray);
    });
  });

  describe('getOne', () => {
    it('should return a single user object', async () => {
      const singleUser = await userService.getOne({ id: 'a uuid' });
      expect(singleUser).toEqual(testUserOne);
    });
  });

  describe('createOne', () => {
    it('should create user', async () => {
      const createUserResult = await userService.createOne({
        name: 'user3',
        email: 'user3@gmail.com',
        password: 'secretpassword',
        created_dt: new Date('2021-1-1'),
      });

      expect(createUserResult).toEqual({
        id: userId,
        name: 'user3',
        email: 'user3@gmail.com',
        password: 'secretpassword',
        created_dt: new Date('2021-1-1'),
      });
    });
  });

  describe('updateOne', () => {
    it('should update user', async () => {
      const updateUserResult = await userService.updateOne(
        { id: userId },
        {
          name: 'user1',
          email: 'user1@gmail.com',
          password: 'secretpassword',
          created_dt: new Date('2021-12-13'),
          updated_dt: new Date('2021-12-14'),
        },
      );
      expect(updateUserResult).toEqual({
        id: userId,
        name: 'user1',
        email: 'user1@gmail.com',
        password: 'secretpassword',
        created_dt: new Date('2021-12-13'),
        updated_dt: new Date('2021-12-14'),
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete user', async () => {
      expect(userService.deleteOne({ id: 'a uuid' })).resolves.toEqual({ deleted: true });
    });
  });
});
