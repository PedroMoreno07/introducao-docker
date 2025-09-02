import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TestingModule, Test } from "@nestjs/testing";



describe("AuthController", () => {
    let controller: AuthController;
    let authService: jest.Mocked<AuthService>;
    let jwtService: jest.Mocked<JwtService>

    beforeEach(async () =>{
    const mockAuthService: jest.Mocked<AuthService> = {
        register: jest.fn(),
        login: jest.fn(),
        validateUser: jest.fn()
    } as any

    const mockJwtService: jest.Mocked<JwtService> = {
        sign: jest.fn(),
        verify: jest.fn()
    } as any

    const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
            {provide: AuthService, useValue: mockAuthService},
            {provide: JwtService, useValue: mockJwtService}
        ]
    }).compile()
    controller = module.get<AuthController>(AuthController)
    authService = module.get(AuthService)
    jwtService = module.get(JwtService)
})

    it("deve registrar um usuário", async () => {
        const dto = {
            name: "User Test",
            email: "user@gmail.com",
            password: "123456"
        }

        authService.register.mockResolvedValue({
            id: "1",
            name: dto.name,
            email: dto.email,
            role: 'USER'
        })

        const result = await controller.register(dto)
        expect(result).toEqual({
            id: "1",
            name: dto.name,
            email: dto.email,
            role: "USER"
        })
        expect(authService.register).toHaveBeenCalledWith(dto)
    })

    it("deve logar um usuário", async () => {
        
        const dto = {
            email: "user@gmail.com",
            password: "123456"
        }
        const user = await authService.validateUser(dto.email, dto.password)
        const token = jwtService.sign(user)
        authService.login.mockResolvedValue({
            access_token: token
        })
        const result = await controller.login(dto)
        expect(result).toEqual({access_token: token})
        expect(authService.login).toHaveBeenCalledWith(dto)
    })





})
