import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnvironmentsService } from './common/services/env.service';
import { UserDocument } from './user.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private envService: EnvironmentsService,
  ) {}

  async getUsers(
    mail: string | null | undefined,
    endpoint: string,
    pageNumber: number,
    pageLimit: number,
  ) {
    try {
      if (endpoint !== this.envService.loginEndpoint)
        throw new Error('Endpoint is not correct');
      const data = await this.userModel
        .find(this.generateQuery(mail))
        .skip((pageNumber - 1) * pageLimit)
        .limit(pageLimit);

      const total = await this.userModel.count();

      return {
        data,
        page: pageNumber,
        total,
        lastPage: Math.ceil(total / pageLimit),
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.message ? error.message : 'There was a problem register the user',
      );
    }
  }

  private generateQuery(mail: string | undefined | null) {
    let query = {};
    if (mail) {
      query = { ...query, mail: { $regex: mail, $options: 'i' } };
    }
    return query;
  }
}
