import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.model';
import { UserDto } from '../dto/create-user.dto';
import { sign } from 'jsonwebtoken';
import { EnvironmentsService } from '../common/services/env.service';
import { BusinessService } from './business.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly envService: EnvironmentsService,
    private readonly businessService: BusinessService,
  ) {}

  async register(createUserDto: UserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error: any) {
      //Es una mala práctica poner un tipo any pero no llegué a poner la interface correcta
      console.error(error);
      throw new Error(
        error.message ? error.message : 'There was a problem register the user',
      );
    }
  }
  async login(mail: string, password: string) {
    try {
      const user = await this.findByMail(mail);
      if (!user) throw new Error('The user don´t exist');

      if (password !== user.password)
        throw new Error('The password is incorrect');
      const payload: UserDto = {
        mail,
        password,
      };
      const options = {
        expiresIn: this.envService.jwtLoginExpired,
        jwtid: user.id,
      };

      const token = sign(payload, this.envService.jwtSecret, options);

      return token;
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.message ? error.message : 'There was a problem register the user',
      );
    }
  }
  private async findByMail(mail: string) {
    return this.userModel.findOne({ mail }).exec();
  }

  async getUsers(
    mail: string | undefined | null,
    endpoint: string,
    token: string,
    pageNumber: number,
    pageLimit: number,
  ) {
    try {
      const users = await this.businessService.getUserslist(
        mail,
        endpoint,
        token,
        pageNumber,
        pageLimit,
      );
      return users;
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.message ? error.message : 'There was a problem register the user',
      );
    }
  }
}
