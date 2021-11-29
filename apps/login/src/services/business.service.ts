import { Injectable } from '@nestjs/common';
import { EnvironmentsService } from '../common/services/env.service';
import axios from 'axios';

@Injectable()
export class BusinessService {
  constructor(private readonly envService: EnvironmentsService) {}

  async getUserslist(
    mail: string | undefined | null,
    endpoint: string,
    token: string,
    pageNumber: number,
    pageLimit: number,
  ) {
    try {
      const url = `${this.envService.businessService}/users`;
      const users = await axios.post(url, {
        path: endpoint,
        search: mail,
        token,
        pageNumber,
        pageLimit,
      });
      return users.data.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.message ? error.message : 'There was a problem register the user',
      );
    }
  }
}
