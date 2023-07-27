import { Injectable } from '@nestjs/common';
import { customer, users } from 'models';
import * as bcrypt from 'bcrypt';
import { createUser } from './user-dto/createUser.dto';
import { Sequelize } from 'sequelize-typescript';
import messageHelper from 'messegeHelper';
import { updatePassword, updateUsername } from './user-dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        private sequelize: Sequelize,
      ) {}

    async getAll(): Promise<users[]>{
        try {
            const result = await users.findAll();

            return result
        } catch (error) {
            return error
        }
    }

    async getUserById(id:number): Promise<users>{
        try {
            const result = await users.findByPk(id);

            return result;
        } catch (error) {
            return error
        }
    }

    //create User using query(SP)
    // async createUser(createUser: createUser): Promise<any> {
    //     try {
    //         const cekUsername = users.findOne({
    //             where: {
    //                 username: createUser.username
    //             }
    //         })
    //         if (cekUsername) {
    //             throw new Error ("Username sudah terdaftar")
    //         }
    //         const salt = await bcrypt.genSalt(10);
    //         const passHash = await bcrypt.hash(createUser.password, salt);

    //         const sendData ={
    //             username: createUser.username,
    //             password: passHash,
    //             firstname: createUser.firstname,
    //             lastname: createUser.lastname
    //         };
            
    //         const data = `[${JSON.stringify(sendData)}]`;
            
    //         const query = `CALL public.insertUserCustomer('${data}')`;
    //         const result = await this.sequelize.query(query);
        
    //         return messageHelper(sendData, 200, "Berhasil menambah user!")
    //     } catch (err) {
    //       return messageHelper(err.message, 400, "Gagal menambah user!")
    //     }
    // }

    //create User normal
    async createUser(createUser: createUser): Promise<any> {
        let id=0;
        try {
            const username= createUser.username
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(createUser.password, salt);

            const resultUsers = await users.create({
                username: username,
                password: passHash
            })
            console.log(passHash);

            id=resultUsers.id;

            const resultCustomer = await customer.create({
                first_name: createUser.firstname,
                last_name: createUser.lastname,
                user_id: resultUsers.id,
            })            

            return {resultUsers, resultCustomer}

        } catch (error) {
            const destroyUsers = await users.destroy({
                where:{
                    id: id
                }
            })
            return ("Tidak bisa insert user baru")
        }
    }

    //create User using transaction
    // async createUser(createUser: createUser): Promise<any> {
    //     let id=0;
    //     const result = this.sequelize.transaction(async (t)=>{
    //         try {
    //             const username= createUser.username
    //             const salt = await bcrypt.genSalt(10);
    //             const passHash = await bcrypt.hash(createUser.password, salt);

    //             const resultUsers = await users.create({
    //                 username: username,
    //                 password: passHash
    //             }, {
    //                 transaction: t
    //             })

    //             const resultCustomer = await customer.create({
    //                 first_name: createUser.firstname,
    //                 last_name: createUser.lastname,
    //                 user_id: resultUsers.id
    //             },{
    //                 transaction:t
    //             })

    //             return {resultUsers, resultCustomer}
    //         } catch (error) {
    //             await t.rollback()
    //             throw error.message
    //         }
    //     })
    // }

    //update Username
    async updateUsername(updateUser: updateUsername, paramID: number): Promise<any> {
        try {
            const result = await users.update({
                username: updateUser.username}, {
                    where: {
                    id: paramID
                    },
            });
            return messageHelper(result, 200, "Berhasil mengubah username!")
        } catch (error) {
            return messageHelper(error.message, 200, "Gagal mengubah username!")
        }
    }

    //update Password
    async updatePassword(updateUser: updatePassword, paramID: number): Promise<any> {
        try {
            const user = await users.findByPk(paramID);
            if (user===null) {
                return `User not found!`
            }
            const confirm = await bcrypt.compare(updateUser.password_lama, user.password);
            if (confirm === true) {
                const salt = await bcrypt.genSalt(10);
                const passHash = await bcrypt.hash(updateUser.password_baru, salt);
    
                const result = await users.update({
                    password: passHash}, {
                        where: {
                        id: paramID
                        },
                });
                return messageHelper(result, 200, "Berhasil mengubah password!")
            } else {
                return messageHelper("Masukkan password lama dengan benar", 400, "Gagal mengubah password!")
            }
        } catch (error) {
            return messageHelper(error.message, 400, "Gagal mengubah password!")
        }
    }

    //delete user
    async deleteUser(id: number): Promise <any> {
        try {
            const findID = await users.findByPk(id);
            if(!findID){
                throw new Error (`User dengan id ${id} tidak ditemukan`)
            }
            const resultCustomer = await customer.destroy({
                where:{user_id: id}
            })
            const resultUsers = await users.destroy({
                where:{id: id}
            })
            return messageHelper(`${resultCustomer} ${resultUsers}`, 200, "Berhasil menghapus user!")
        } catch (error) {
            return messageHelper(error.message, 400, "Gagal menghapus user!")
        }
    }

}