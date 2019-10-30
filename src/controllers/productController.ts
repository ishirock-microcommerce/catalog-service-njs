declare var require: any

var uuid = require('uuid')
var fs = require('fs')
import { Route, Get, Post, Body, Query } from 'tsoa'
import { default as Product, ProductCreateRequest } from '../models/product'

@Route(`api/products`)
export class ProductController {
  /**
   * Get the all product
   */
  @Get()
  public async GetAll(@Query() currentPage: number = 0, @Query() highPrice: number = -1): Promise<any> {
    // @ts-ignore
    if (highPrice <= 0) {
      highPrice = Number.MAX_VALUE
    }
    var products = Product.find({ price: { $lt: highPrice }, }).exec()
    return Promise.resolve(products)
  }

  /**
   * Get product by Id
   * @param productId Product Id
   */
  @Get(`{productId}`)
  public Get(productId: string): Promise<any> {
    // @ts-ignore
    let product = Product.findOne({ id: productId }).exec()
    return Promise.resolve(product)
  }

  /**
   * Create a product
   * @param request This is a product creation request description
   */
  @Post()
  public Create(@Body() request: ProductCreateRequest): Promise<any> {
    let product = new Product(request)
    console.log(product)
    let result = Product.create(product)
    return Promise.resolve(result)
  }
}
