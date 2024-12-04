import type User from "../../domain/User";

export default interface IUserReadOnlyRepository {
  fetch(user: User): Promise<User>;
}
