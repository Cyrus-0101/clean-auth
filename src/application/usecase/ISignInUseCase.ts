import type IUserDto from "./IUserDto";

// Data Transfer Object (DTO) - Exposed entity
export default interface ISignInUseCase {
  signIn(userDto: IUserDto): Promise<IUserDto>;
}
