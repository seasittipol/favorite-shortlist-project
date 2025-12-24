import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'The ID of the user adding the favorite',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'The ID of the resort to add to favorites',
    example: 5,
  })
  resortId: number;
}
