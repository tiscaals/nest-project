import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { order_detail } from './order_detail';
import { users } from './users';

export interface ordersAttributes {
  id?: number;
  user_id?: number;
  total_product?: number;
  total_price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'orders', schema: 'public', timestamps: false })
export class orders
  extends Model<ordersAttributes, ordersAttributes>
  implements ordersAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('orders_id_seq'::regclass)"),
  })
  @Index({ name: 'orders_id', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  total_product?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  total_price?: number;

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

  @HasMany(() => order_detail, { sourceKey: 'id' })
  order_details?: order_detail[];

  @BelongsTo(() => users)
  user?: users;
}
