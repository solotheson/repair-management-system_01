import type { IUserRepository, CreateUserData, UpdateUserData } from "../../domain/repositories/user-repository"
import type { ManagedUser } from "../../domain/entities/managed-user"
import { UserDatasource } from "../datasources/user-datasource"
import { UserMapper } from "../mappers/user-mapper"

export class UserRepositoryImpl implements IUserRepository {
  private datasource = new UserDatasource()

  async getAll(): Promise<ManagedUser[]> {
    const dtos = await this.datasource.getAll()
    return UserMapper.toEntityList(dtos)
  }

  async getById(id: string): Promise<ManagedUser> {
    const dto = await this.datasource.getById(id)
    return UserMapper.toEntity(dto)
  }

  async create(data: CreateUserData): Promise<ManagedUser> {
    const dto = await this.datasource.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
    })
    return UserMapper.toEntity(dto)
  }

  async update(id: string, data: UpdateUserData): Promise<ManagedUser> {
    const dto = await this.datasource.update(id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      is_active: data.isActive,
    })
    return UserMapper.toEntity(dto)
  }

  async delete(id: string): Promise<void> {
    await this.datasource.delete(id)
  }
}
