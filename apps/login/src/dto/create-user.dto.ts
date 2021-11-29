import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({
    description: 'User Email',
    example: 'lcapraro110@gmail.com',
  })
  @IsEmail()
  mail!: string;

  @ApiProperty({
    description: 'User Password',
    example: '123456',
  })
  @IsString()
  password!: string;
}
