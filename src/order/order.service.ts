import { Injectable } from '@nestjs/common';
import messageHelper from 'messegeHelper';
import { Sequelize } from 'sequelize-typescript';
import { orders, order_detail } from 'models';

@Injectable()
export class OrderService {
  constructor(
    private sequelize: Sequelize,
  ) {}

  async createOrder(createOrder: any): Promise<any> {
    try {
      const datas = createOrder;
      let total_product = 0;
      let total_price = 0;
      let user_id = 0;

      datas.map(data => {
          user_id = data.user_id,
          total_price += data.quantity*data.price
          total_product += data.quantity
      })
      
      let dt = {"user_id": user_id, "total_product": total_product, "total_price": total_price}
      const paramdt = `[${JSON.stringify(dt)}]`;
      const paramdts =  `${JSON.stringify(datas)}`;
  
      const query = `CALL public.insertOrder('${paramdt}','${paramdts}')`;
      const result = await this.sequelize.query(query);
  
      return messageHelper(result, 200, "sukses")
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal menambah order!")
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async updateOrder(id: number, updateOrder: any): Promise<any> {
    try {
      const findOrder = await orders.findByPk(id);
      if (!findOrder) {
        throw new Error(`Orders id ${id} tidak ditemukan!`);
      }
    
      const findOrderDetail = await order_detail.findAll({
        where: {
          order_id: findOrder.id,
        },
      });
    
      if (!findOrderDetail) {
        throw new Error("Order Detail Kosong!");
      }
    
      let hasil_orderDetail = updateOrder.order_detail;

      //  //FOR INI DIPAKE KALO PAKE PROCEDURE YANG updateOrder
      // for (let i = 0; i < findOrderDetail.length; i++) {
      //   hasil_orderDetail[i].id = findOrderDetail[i].id;
      // }

      const result = await this.sequelize.query(
        "CALL updateOrderNew(:order_id, :order_detail)",
        {
          replacements: {
            order_id: findOrder.id,
            order_detail: JSON.stringify(hasil_orderDetail)
          }
        }
      );
      
      return messageHelper(result, 200, "sukses")
    } catch (error) {
      return messageHelper(error.message, 400, "Gagal menambah order!")
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
