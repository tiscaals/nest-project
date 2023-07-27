import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface product_categoryAttributes {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'product_category', schema: 'public', timestamps: false })
export class product_category
  extends Model<product_categoryAttributes, product_categoryAttributes>
  implements product_categoryAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('product_category_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'product_category_id', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200) })
  description?: string;

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
}
