import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Posts } from 'src/posts/models/posts.model';

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: Date;

  @HasMany(() => Posts)
  posts: Posts[];
}
