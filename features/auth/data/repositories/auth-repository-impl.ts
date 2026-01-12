import type {
  IAuthRepository,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../../domain/repositories/auth-repository"
import type { User } from "../../domain/entities/user"
import { AuthDatasource } from "../datasources/auth-datasource"
import { AuthMapper } from "../mappers/auth-mapper"

export class AuthRepositoryImpl implements IAuthRepository {
  private datasource = new AuthDatasource()

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const dto = await this.datasource.login({
      email: credentials.email,
      password: credentials.password,
    })
    return AuthMapper.toAuthResponse(dto)
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const dto = await this.datasource.register({
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    })
    return AuthMapper.toAuthResponse(dto)
  }

  async logout(): Promise<void> {
    await this.datasource.logout()
  }

  async getCurrentUser(): Promise<User> {
    const dto = await this.datasource.getCurrentUser()
    return AuthMapper.toUser(dto)
  }
}
