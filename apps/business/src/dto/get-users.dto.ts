import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PaginateUsersDto {
  @ApiProperty({
    description: 'Login Path',
    example: 'http://localhost:3000/users',
  })
  @IsString()
  path!: string;

  @ApiProperty({
    description: 'search Mail',
    example: 'lcpararo110@gmail.com',
  })
  search?: string;

  @ApiProperty({
    description: 'JWT token',
    example: '1234dfsdasdasd56',
  })
  @IsString()
  token!: string;

  @ApiProperty({
    description: 'start page number',
    example: 1,
  })
  @IsNumber()
  pageNumber!: number;

  @ApiProperty({
    description: 'elements limit for page',
    example: 10,
  })
  @IsNumber()
  pageLimit!: number;
}
