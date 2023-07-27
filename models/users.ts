import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { customer } from './customer';
import { orders } from './orders';

export interface usersAttributes {
  id?: number;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: string;
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @ForeignKey(() => customer)
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('users_id_seq'::regclass)"),
  })
  @Index({ name: 'users_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  password?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal(
      "'2023-04-14 07:54:34.718649+00'::timestamp with time zone",
    ),
  })
  createdAt?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal(
      "'2023-04-14 07:54:34.718649+00'::timestamp with time zone",
    ),
  })
  updatedAt?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    defaultValue: Sequelize.literal("'user'::character varying"),
  })
  roles?: string;

  @BelongsTo(() => customer)
  customer?: customer;

  @HasMany(() => orders, { sourceKey: 'id' })
  orders?: orders[];
}
