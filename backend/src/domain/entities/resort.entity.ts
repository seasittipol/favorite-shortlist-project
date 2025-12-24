import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('resorts')
export class Resort {
  @ApiProperty({ description: 'The unique identifier of the resort' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The sequential number of the resort',
    example: 1,
    required: false,
  })
  @Column({ type: 'integer', nullable: true })
  no: number;

  @ApiProperty({
    description: 'The name of the resort',
    example: 'Paradise Beach Resort',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The location/place of the resort',
    example: 'Phuket',
    required: false,
  })
  @Column({ nullable: true })
  place: string;

  @ApiProperty({
    description: 'Room type information',
    example: 'Deluxe Room',
    required: false,
  })
  @Column({ nullable: true })
  room: string;

  @ApiProperty({
    description: 'Bed configuration',
    example: '2 Queen Beds',
    required: false,
  })
  @Column({ nullable: true })
  bed: string;

  @ApiProperty({
    description: 'Room condition details',
    example: 'Non-smoking',
    required: false,
  })
  @Column({ nullable: true })
  condition: string;

  @ApiProperty({
    description: 'Price information',
    example: 'THB 3,500',
    required: false,
  })
  @Column({ nullable: true })
  price: string;

  @ApiProperty({
    description: 'Travel sustainable level certification',
    example: 'Level 2',
    required: false,
  })
  @Column({ nullable: true })
  travelSustainableLevel: string;

  @ApiProperty({
    description: 'Average rating score',
    example: 8.5,
    required: false,
  })
  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  rating: number;

  @ApiProperty({
    description: 'Total number of reviews',
    example: '245 reviews',
    required: false,
  })
  @Column({ nullable: true })
  totalReviews: string;

  @ApiProperty({ description: 'The date when the resort was created' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the resort was last updated' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
