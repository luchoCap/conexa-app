import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from './common/dto/errorResponse.dto';
import { UserDto } from './dto/create-user.dto';
import { userSchema } from './schemas/user.schema';
import { JoiValidationPipe } from './common/pipes/validation.pipe';
import { fullUrl } from './common/utils/path.util';

@ApiCookieAuth()
@ApiTags('Login')
@Controller()
export class AppController {
  constructor(private readonly appService: UserService) {}

  @Post('register')
  @ApiOkResponse({ description: ' Register was succesfully' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: ' Bad Request' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'registerUser',
    description: 'This endpoint register a user',
  })
  async register(
    @Body(new JoiValidationPipe(userSchema)) user: UserDto,
    @Res() res: Response,
  ) {
    try {
      console.log('Start register service');
      await this.appService.register(user);
      return res.status(HttpStatus.OK).json(true);
    } catch (error: any) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @ApiOkResponse({ description: ' Login was succesfully' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: ' Bad Request' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'login user',
    description: 'This endpoint login a user',
  })
  async login(
    @Body(new JoiValidationPipe(userSchema)) user: UserDto,
    @Res() res: Response,
  ) {
    try {
      console.log('Start login service');
      const jwt = await this.appService.login(user.mail, user.password);
      return res.status(HttpStatus.OK).json(jwt);
    } catch (error: any) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('users')
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
  @ApiQuery({ name: 'search' })
  @ApiQuery({ name: 'page_number' })
  @ApiQuery({ name: 'page_limit' })
  async users(
    @Query('search') search: string | undefined | null,
    @Query('page_number') pageNumber: number,
    @Query('page_limit') pageLimit: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      let token;
      //esta condición es debido a que nests swagger con cookies tiene sus complicaciones para agregarlo
      if (req.headers.authorization) {
        token = req.headers.authorization
          .split(' ')
          .slice(1, 2)
          .join() as string;
      } else {
        token = req.cookies.token as string;
      }
      console.log('Start get service');
      const url = fullUrl(req);
      const users = await this.appService.getUsers(
        search,
        url,
        token,
        pageNumber,
        pageLimit,
      );
      return res.status(HttpStatus.OK).json(users);
    } catch (error: any) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
