import ICreateUserDto from "../../../auth/dtos/ICreateUserDto";
import IUser from "../../../auth/entities/IUser";
import IUserRepository from "../../../auth/use-cases/ports/IUserRepository";

export default class UserRepository implements IUserRepository {
  findByEmail(email: string): Promise<IUser> {}

  save(user: ICreateUserDto): Promise<IUser> {}
}
