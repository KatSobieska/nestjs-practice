import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tags.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, default: 0 })
  name: string;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({
    default: 1,
  })
  count: number;

  @ManyToMany((type) => Tag)
  @JoinTable({
    name: 'products_tags',
    joinColumn: {
      name: 'productId',
    },
    inverseJoinColumn: {
      name: 'tagId',
    },
  })
  tags: Tag[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  description: string;
}
