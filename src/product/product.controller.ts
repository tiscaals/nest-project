import { Body, Controller, Param, Patch, Post, UseInterceptors, HttpException, HttpStatus, UploadedFiles, Get, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { createPC } from './dto/createProductCategory.dto';
import { updatePC } from './dto/updateProductCategory.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createProduct } from './dto/createProduct.dto';
import { diskStorage , Multer } from 'multer'
import { updateProduct } from './dto/updateProduct.dto';

export function uploadGambar(): ReturnType<typeof FilesInterceptor> {
    return FilesInterceptor('images', 5, {
        storage: diskStorage({
            destination: './images',
            filename: (req, file, cb) => {
                const randomName = Array(16).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}-${file.originalname}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new HttpException('Hanya boleh file gambar!', HttpStatus.FORBIDDEN), false);
            }
            cb(null, true);
        },
    });
}

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}
    @Get('category')
    getAllCategory():any{
        return this.productService.getAllCategory()
    }
    
    @Post('category')
    createProductCategory(@Body() createPC: createPC): any{
        return this.productService.createProductCategory(createPC)
    }
    
    @Patch('category/:id')
    updateProductCategory(@Body() updatePC: updatePC, @Param('id') id: number): any{
        return this.productService.updateProductCategory(updatePC,id)
    }

    @Get()
    getAllProduct():any{
        return this.productService.getAllProduct()
    }

    @Get(':id')
    getProductById(@Param('id') id: number):any{
        return this.productService.getProductById(id)
    }

    @Post('create')
    @UseInterceptors(uploadGambar())
    createProduct(@Body() createProduct: createProduct, @UploadedFiles() images: Multer.File[]): any{
        return this.productService.createProduct(createProduct, images)
    }

    @Patch(':id')
    @UseInterceptors(uploadGambar())
    updateProduct(@Param('id') id: number, @Body() updateProduct: updateProduct, @UploadedFiles() image: Multer.file[]): any{
        return this.productService.updateProduct(id, updateProduct, image)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number): any{
        return this.productService.deleteProduct(id)
    }
}
