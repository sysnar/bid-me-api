import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { MockRepository } from '../../../../api/structure/ITest';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const userId = uuidv4();
const testUserName = 'user1';
const testUserEmail = 'user1@gmail.com';
const testUserArray = [
  { id: userId, name: testUserName, email: testUserEmail, password: 'secretpassword' },
  { id: userId, name: 'user2', email: 'user2@gmail.com', password: 'secretpassword' },
  { id: userId, name: 'user3', email: 'user3@gmail.com', password: 'secretpassword' },
];
const testUserOne = testUserArray[0];

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

  describe('getAll', () => {
    it('should return an array of user', async () => {
      const manyUsers = await userService.getAll();
      expect(manyUsers).toEqual(testUserArray);
    });
  });

  describe('getOne', () => {
    it('should return a single user object', async () => {
      const singleUser = await userService.getOne('a uuid');
      expect(singleUser).toEqual(testUserOne);
    });
  });

  describe('createOne', () => {
    it('should create user', async () => {
      const createUserResult = await userService.createOne({
        name: 'sysnar',
        email: 'sysn4r@gmail.com',
        password: 'secretpassword',
      });
      expect(createUserResult).toEqual({
        name: 'sysnar',
        email: 'sysn4r@gmail.com',
        password: 'secretpassword',
      });
    });
  });

  describe('updateOne', () => {
    it('should update user', async () => {
      const dateNow = new Date();
      const updateUserResult = await userService.updateOne('a uuid', {
        name: 'sysnar',
        email: 'sysn4r@gmail.com',
        password: 'secretpassword',
        created_dt: dateNow,
      });
      expect(updateUserResult).toEqual({
        name: 'sysnar',
        email: 'sysn4r@gmail.com',
        password: 'secretpassword',
        created_dt: dateNow,
        updated_dt: '',
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete user', async () => {
      expect(userService.deleteOne('a uuid')).resolves.toEqual({ deleted: true });
    });
  });
});
