import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { role } from '@prisma/client';


const mockPrisma = {
  users: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
  }
}

const mockJwtService = {
  sign: jest.fn().mockReturnValue('token'),
  verify: jest.fn(),
};

   
describe('AuthService', () => {
  let jwtService: JwtService;
  let service: AuthService;
  let prisma: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      AuthService,
      {
        provide: PrismaService, useValue: mockPrisma
      }, 
      { 
        provide: JwtService, useValue: mockJwtService 
      }
      ],
    }).compile()
    
    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService)
    jwtService = module.get<JwtService>(JwtService);
  })

  it("deve registrar um usuário", async () => {

    const dto = {
      name: "User Test",
      email: "user@gmail.com",
      password: "123456"
    } as any

    mockPrisma.users.create.mockResolvedValue({
      id: "1",
      name: dto.name,
      email: dto.email,
      role: 'USER'
    })

    const result = await service.register(dto)

    expect(result).toEqual({
      id: "1",
      name: dto.name,
      email: dto.email,
      role: "USER"
    })


    expect(prisma.users.create).toHaveBeenCalledWith({data: {
      name: dto.name,
      email: dto.email,
      password: expect.any(String),
  },
  select: {
      id: true,
      name: true,
      email: true,
      role: true,
  }})
  })

  it("deve validar um usuário", async () => {

    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);

    const dto = {
      id: "1",
      name: "User Test",
      email: "user@gmail.com",
      password: hashedPassword,
      role: 'USER'
    } as any

    mockPrisma.users.findUnique.mockResolvedValue(dto)

    const result = await service.validateUser(dto.email, password)

    expect(result).toEqual({
      id: "1",
      name: "User Test",
      email: dto.email,
      password: dto.password,
      role: "USER" 
    })

    expect(prisma.users.findUnique).toHaveBeenCalledWith({where: {email: dto.email}})
  })

  it("deve logar um usuário", async () => {

    const dto = {
      email: "user@gmail.com",
      password: "123456",
    } as any
    
    const user = await service.validateUser(dto.email, dto.password)
    const token = jwtService.sign(user)

    mockPrisma.users.findUnique.mockResolvedValue(user)
    mockJwtService.sign.mockReturnValue(token)

    const result = await service.login(dto)
    expect(result).toEqual({access_token: token})
    expect(mockJwtService.sign).toHaveBeenCalledWith(user)
    expect(prisma.users.findUnique).toHaveBeenCalledWith({where: {email: dto.email}})

  })
})