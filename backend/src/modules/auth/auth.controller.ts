import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { loginBodySchema, registerBodySchema } from './auth.schemas';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (request: Request, response: Response): Promise<void> => {
    const data = registerBodySchema.parse(request.body);

    const user = await this.authService.register(data);

    response.status(201).json(user);
  };

  login = async (request: Request, response: Response): Promise<void> => {
    const data = loginBodySchema.parse(request.body);

    const result = await this.authService.login(data);

    response.status(200).json(result);
  };
}