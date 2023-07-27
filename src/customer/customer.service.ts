import { Injectable } from '@nestjs/common';
import messageHelper from 'messegeHelper';
import { customer, order_detail, orders, users } from 'models';
import { updateCustomer } from './dto/customerUpdate.dto';
import { Sequelize } from 'sequelize-typescript';
import { query } from 'express';

@Injectable()
export class CustomerService {
    constructor(
        private sequelize: Sequelize,
      ) {}

    async getCustomer(): Promise <any>{
        try {
            return "Hello customer!"
        } catch (error) {
            return `${error.message}`
        }
    }

    async getUserCustomer(): Promise <any> {
        try {
            const result = await users.findAll({
                attributes: ['id','username', 'password'],
                include:[
                    {
                        model: customer,
                        as: "customer",
                        required: true,
                        attributes: ["first_name", "last_name"]
                    }
                ]
            })
            return messageHelper(result, 200, "Berhasil")
        } catch (error) {
            return messageHelper(error.message, 400, "Gagal")
        }
    }

    async getUserOrder(): Promise <any> {
        try {
            const result = await users.findAll({
                attributes: ['id','username'],
                include:[
                    {
                        model: customer,
                        as: "customer",
                        attributes: ["first_name", "last_name"]
                    },
                    {
                        model: orders,
                        as: "orders",
                        attributes: ["total_product", "total_price"],
                        include:[
                            {
                                model: order_detail,
                                as: "order_details",
                                attributes: ["product_id", "quantity"]
                            }
                        ]
                    },
                ]
            })
            return messageHelper(result, 200, "Berhasil")
        } catch (error) {
            return messageHelper(error.message, 400, "Gagal")
        }
    }

    async getUserOrderQuery(): Promise <any> {
        try {
            const query = 'SELECT * FROM VIEW_ALL'
            const result = await this.sequelize.query(query)

            return messageHelper(result, 200, "Berhasil")
        } catch (error) {
            return messageHelper(error.message, 400, "Gagal")
        }
    }

    async updateUserCustomer(updateCustomer: updateCustomer, id:number): Promise <any> {
        try {
            const foundUser = await customer.findByPk(id);
            if(!foundUser){
                throw new Error (`User dengan id ${id} tidak ditemukan`)
            }
            const result = this.sequelize.transaction(async (t)=>{
                try {
                    await users.update({
                        username: updateCustomer.username
                    },{
                        where:{
                            id:id
                        },
                        transaction:t
                    })

                    await customer.update({
                        first_name: updateCustomer.firstname,
                        last_name: updateCustomer.lastname
                    },{
                        where:{
                            user_id:id
                        },
                        transaction:t
                    })
                } catch (error) {
                    await t.rollback()
                    throw messageHelper(error.message, 400, "Gagal")
                }
            })
            return messageHelper(result, 200, "Berhasil")
        } catch (error) {
            return messageHelper(error.message, 400, "Gagal")
        }
    }
}