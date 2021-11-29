import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponse } from './common/dto/errorResponse.dto';
import { JoiValidationPipe } from './common/pipes/validation.pipe';
import { Response } from 'express';
import { AppService } from './app.service';
import { PaginateUsersDto } from './dto/get-users.dto';
import { paginateUsersSchema } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  @ApiOkResponse({ description: ' Users was got succesfully' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: ' Bad Request' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'Getting Users',
    description: 'This endpoint get a list of users',
  })
  async getUsers(
    @Body(new JoiValidationPipe(paginateUsersSchema))
    userBody: PaginateUsersDto,
    @Res() res: Response,
  ) {
    try {
      console.log('Start service get users');
      const userServiceEndpoint = userBody.path;
      const mail = userBody.search;
      const users = await this.appService.getUsers(
        mail,
        userServiceEndpoint,
        userBody.pageNumber,
        userBody.pageLimit,
      );
      return res.status(HttpStatus.OK).json({ data: users });
    } catch (error: any) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
