import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { order_detail } from './order_detail';

export interface productAttributes {
  id?: number;
  name?: string;
  description?: string;
  category_id?: number;
  price?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

@Table({ tableName: 'product', schema: 'public', timestamps: false })
export class product
  extends Model<productAttributes, productAttributes>
  implements productAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('product_id_seq'::regclass)"),
  })
  @Index({ name: 'product_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  category_id?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  price?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  image?: string;

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

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('true'),
  })
  active?: boolean;

  @HasMany(() => order_detail, { sourceKey: 'id' })
  order_details?: order_detail[];
}
