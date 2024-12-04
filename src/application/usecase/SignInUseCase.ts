import User from "../../domain/User";
import type IUserReadOnlyRepository from "../repositories/IUserReadOnlyRepository";
import type ISignInUseCase from "./ISignInUseCase";
import type IUserDto from "./IUserDto";

export default class SignInUseCase implements ISignInUseCase {
  /**
   * @description This is the async exposed signIn method
   * @param userDto
   */

  private userReadOnlyRepository: IUserReadOnlyRepository;

  constructor(userReadOnlyRepository: IUserReadOnlyRepository) {
    this.userReadOnlyRepository = userReadOnlyRepository;
  }

  public async signIn(userDto: IUserDto): Promise<IUserDto> {
    const user = new User(
      userDto.id,
      userDto.name,
      userDto.email,
      userDto.password,
      userDto.type
    );

    await this.userReadOnlyRepository.fetch(user);

    const foundUserDto = user;

    if (foundUserDto) {
      return foundUserDto;
    }

    return foundUserDto;
  }
}
