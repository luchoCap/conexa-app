import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ErrorResponse {
  @ApiProperty({ example: 'status code' })
  @IsNumber()
  statusCode!: number;

  @ApiProperty({
    example: 'message Error ',
  })
  @IsString()
  message!: string;

  @ApiProperty({
    example: 'Status Message Error',
  })
  @IsString()
  error!: string;
}
