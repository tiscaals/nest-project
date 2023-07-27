import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { users } from './users';

export interface customerAttributes {
  id?: number;
  first_name?: string;
  last_name?: string;
  user_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'customer', schema: 'public', timestamps: false })
export class customer
  extends Model<customerAttributes, customerAttributes>
  implements customerAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('customer_id_seq'::regclass)"),
  })
  @Index({ name: 'customer_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  first_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  last_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  createdAt?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  updatedAt?: Date;

  @HasOne(() => users, { sourceKey: 'user_id' })
  user?: users;
}
