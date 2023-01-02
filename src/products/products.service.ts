import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  Products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.Products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.Products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.Products[index] = updatedProduct;
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.Products.splice(index, 1);
  }

  findProduct(id: string): [Product, number] {
    const productIndex = this.Products.findIndex((prod) => prod.id === id);
    const product = this.Products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return [product, productIndex];
  }
}
