import { Injectable } from '@nestjs/common';
import { IGenericError, IGenericResponse } from 'src/entities/generic-object';
import { signInSchema, signUpSchema } from 'src/helpers/schemas/userSchema';
import { UserRepository } from 'src/repositories/user.repository';
import { Validator } from 'src/utils/validator';
import { CANT_QUERY_ON_DATABASE, CANT_SAVE_REGISTER_ON_DATABASE, USER_NOT_FOUND } from 'src/errors';
import { Crypto } from 'src/utils/crypto';
import { AuthToken } from 'src/utils/token';
import { IAuth } from 'src/entities/auth';
import { SignInUser } from 'src/entities/user';

@Injectable()
export class UserService {
  private validator = new Validator();
  private crypto = new Crypto();
  private token = new AuthToken();

  constructor(private readonly UserRepository: UserRepository) { }

  public async signUp(body: any): Promise<IGenericResponse | IGenericError> {
    try {
      const isValidated = await this.validator.validate(body, signUpSchema);
      if (typeof (isValidated) !== 'boolean') return isValidated;

      const { email, name, password, picture } = body;
      const encrypted = this.crypto.encrypt(password);
      await this.UserRepository.create({ email, name, picture, password: encrypted });

      return { code: 201, message: 'Successful created user!' };
    } catch (e: any) {
      console.log(e);
      return CANT_SAVE_REGISTER_ON_DATABASE;
    }
  }

  public async signIn(body: any): Promise<IGenericResponse | IGenericError> {
    try {
      const isValidated = await this.validator.validate(body, signInSchema);
      if (typeof (isValidated) !== 'boolean') return isValidated;

      const { email, password } = body;
      const user = await this.UserRepository.getByEmail(email);

      if (user) {
        const decrypted = this.crypto.decrypt(user.password);
        if (decrypted === password) {
          const auth = this.token.generateAccessAuth(user.id) as IAuth;
          return { code: 200, message: `Bem vindo(a) ao sistema ${user.name}!`, data: auth };
        }
      }

      return USER_NOT_FOUND;

    } catch (e: any) {
      console.log(e);
      return CANT_QUERY_ON_DATABASE;
    }
  }
}
