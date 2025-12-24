import { ApiProperty } from '@nestjs/swagger';
import { Resort } from 'src/domain/entities/resort.entity';

export class ResortWithFavoriteResponse extends Resort {
  @ApiProperty({
    description: 'Indicates if the resort is marked as favorite by the user',
    example: true,
  })
  isFavorite: boolean;
}
