import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Resort } from './resort.entity';

@Entity('favorites')
export class Favorite {
  @ApiProperty({ description: 'The unique identifier of the favorite' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The ID of the user who favorited', example: 1 })
  @Column()
  userId: number;

  @ApiProperty({ description: 'The ID of the favorited resort', example: 5 })
  @Column()
  resortId: number;

  @ApiProperty({ description: 'The user who favorited', type: () => User })
  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ description: 'The favorited resort', type: () => Resort })
  @ManyToOne(() => Resort, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'resortId' })
  resort: Resort;

  @ApiProperty({ description: 'The date when the favorite was created' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
