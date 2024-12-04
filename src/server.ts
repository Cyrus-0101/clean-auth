import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as Express from "express";
import bodyParser from "body-parser";

// Declare metadata by @controller annotation
import "./entrypoint/controllers/AuthController";
import AuthServiceLocator from "./configuration/usecases/AuthServiceLocator";
import { TYPES } from "./constants/types";
import type IUserReadOnlyRepository from "./application/repositories/IUserReadOnlyRepository";
import UserRepository from "./infrastructure/UserRepository";

// Set up container
const container = new Container();

// Set up bindings
container
  .bind<AuthServiceLocator>(TYPES.AuthServiceLocator)
  .to(AuthServiceLocator);

container
  .bind<IUserReadOnlyRepository>(TYPES.IUserReadOnlyRepository)
  .to(UserRepository);

// Create server
const server = new InversifyExpressServer(container);
server.setConfig((app: Express.Application) => {
  // add body parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
});

const app = server.build();

app.listen(3000, () => {
  console.log("Inversify app running on port 3000");
});
