import { Injectable } from '@nestjs/common';
import { createPC } from './dto/createProductCategory.dto';
import messageHelper from 'messegeHelper';
import { product, product_category } from 'models';
import { updatePC } from './dto/updateProductCategory.dto';
import { createProduct } from './dto/createProduct.dto';
import { promises as fsPromises} from 'fs';
import { updateProduct } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    //Get all category
    async getAllCategory(): Promise<any[]>{
        try {
            const result = await product_category.findAll();

            return result
        } catch (error) {
            return error
        }
    }

    //Create Product Category
    async createProductCategory(createPC: createPC): Promise <any> {
        try {
            const result = await product_category.create({
                name: createPC.name,
                description: createPC.description
            })
            return messageHelper(result, 200, "Berhasil menambah Product Category")
        } catch (error) {
            return messageHelper(error.message, 400, "Tidak bisa menambah Porduct Category")
        }
    }

    //Update Product Category
    async updateProductCategory(updatePC: updatePC, paramID: number): Promise <any> {
        try {
            const result = await product_category.update({
                name: updatePC.name,
                description: updatePC.description
            },{
                where:{
                    id: paramID
                }
            })
            return messageHelper(result, 200, "Berhasil update Product Category")
        } catch (error) {
            return messageHelper(error.message, 400, "Tidak bisa update Porduct Category")
        }
    }

    //Get all product
    async getAllProduct(): Promise<any[]>{
        try {
            const products = await product.findAll({
                where: {
                    active: true
                }
            });
            const productsValue: any[] = [];

            for (let i = 0; i < products.length; i++) {
                const existingImageNames = products[i].dataValues.image.split(',')
                productsValue[i]={
                    id:products[i].dataValues.id,
                    name: products[i].dataValues.name,
                    description: products[i].dataValues.description,
                    category_id: products[i].dataValues.category_id,
                    price: products[i].dataValues.price,
                    imagePath: `http://localhost:3003/image/${existingImageNames[0]}`
                };
            }
            return productsValue
        } catch (error) {
            return error
        }
    }

    //Get product by ID
    async getProductById(id:number): Promise<any[]>{
        try {
            const products = await product.findByPk(id);
            const existingImageNames = products.dataValues.image.split(',')
            
            const productsValue: any={
                id:products.dataValues.id,
                name: products.dataValues.name,
                description: products.dataValues.description,
                category_id: products.dataValues.category_id,
                price: products.dataValues.price,
                imagePath: `http://localhost:3003/image/${existingImageNames[0]}`
            };

            return productsValue
        } catch (error) {
            return error
        }
    }

    //Create Product
    async createProduct(createProduct:createProduct, images: any[]) {
        try {
            console.log(images);
            const filenames = images.map((image) => image.filename);
            const result= await product.create({
                name: createProduct.name,
                description: createProduct.description,
                category_id: parseInt(createProduct.category_id),
                price: createProduct.price,
                image: filenames.join(',')
            }, {
                returning: true
            });
            return messageHelper(result, 200, "Berhasil menambah Product")
        } catch (error) {
            return messageHelper(error.message, 400, "Tidak bisa menambah Product")
        }
    }

    //Update Product
    async updateProduct(paramID, updateProduct: updateProduct, images: any[]){
        try {
            console.log(images.length);
            const filenames = images.map((image) => image.filename);
            const findID= await product.findOne({
                where:{
                    id: paramID
                }
            })
            if(!findID){
                throw new Error ("Product tidak ditemukan")
            }
            const existingImageNames = findID.image.split(',');
            for (const imageName of existingImageNames) {
                const imagePath = `./images/${imageName}`;
                await fsPromises.unlink(imagePath);
            }
            const result= await product.update({
                name: updateProduct.name,
                description: updateProduct.description,
                category_id: parseInt(updateProduct.category_id),
                price: updateProduct.price,
                image: filenames.join(',')
            },{
                where:{id:paramID},
                returning:true
            })
            return messageHelper(result, 200, "Berhasil menambah Product")
        } catch (error) {
            return messageHelper(error.message, 400, "Tidak bisa update Product")
        }
    }

    //Delete  Product
    async deleteProduct(id:number) {
        try {
            const foundProduct = await product.findByPk(id)
            console.log(foundProduct);
            const result = await product.update({
                active: false
            },{
                where:{
                    id: foundProduct.id
                }
            })
            return messageHelper(result, 200, "Berhasil menghapus Product")
        } catch (error) {
            return messageHelper(error.message, 400, "Tidak bisa hapus Product")
        }
    }
}