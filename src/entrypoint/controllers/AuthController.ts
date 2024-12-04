/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  interfaces,
  httpPost,
  request,
  response,
  controller,
} from "inversify-express-utils";
import * as Express from "express";
import type ISignInUseCase from "../../application/usecase/ISignInUseCase";
import { inject } from "inversify";
import { TYPES } from "../../constants/types";
import type AuthServiceLocator from "../../configuration/usecases/AuthServiceLocator";
import type IUserDto from "../../application/usecase/IUserDto";
import "reflect-metadata";

@controller("/auth")
export default class AuthController implements interfaces.Controller {
  // Satisfies Interface requirements to potentially have additional methods
  // before the explicitly defined ones.
  [key: string]: interfaces.ControllerHandler | any;

  private readonly signInUserCase: ISignInUseCase;

  constructor(
    @inject(TYPES.AuthServiceLocator) serviceLocator: AuthServiceLocator
  ) {
    // Inject the service locator and fetch the usecase
    this.signInUserCase = serviceLocator.GetSignInUseCase();
  }

  @httpPost("/signin")
  public async signIn(
    @request() req: Express.Request,
    @response() res: Express.Response
  ) {
    console.log("Route Request Hit");
    const userDto = req.body;

    return this.signInUserCase
      .signIn(userDto)
      .then((foundUserDto: IUserDto) => res.status(200).json(foundUserDto))
      .catch((err: Error) => res.status(400).json({ error: err.message }));
  }
}
