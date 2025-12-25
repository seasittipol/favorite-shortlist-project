import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'The ID of the user adding the favorite',
    example: 1,
  })
  @IsOptional()
  userId: number;

  @ApiProperty({
    description: 'The ID of the resort to add to favorites',
    example: 5,
  })
  @IsNotEmpty()
  resortId: number;
}
