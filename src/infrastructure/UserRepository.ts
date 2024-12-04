import { injectable } from "inversify";
import type IUserReadOnlyRepository from "../application/repositories/IUserReadOnlyRepository";
import type User from "../domain/User";

@injectable()
export default class UserRepository implements IUserReadOnlyRepository {
  /**
   * @description This is the fetch that accesses our data layer
   * @param user
   */
  public async fetch(user: User): Promise<User> {
    return user;
  }
}
