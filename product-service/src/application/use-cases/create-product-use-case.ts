import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/product-repository";
import { CreateProductDto } from "../dtos/create-product-dto";

type CreateProductResponse = {
  product: Product;
};

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDto): Promise<CreateProductResponse> {
    const { description, name, price } = data;

    const product = Product.create({
      name,
      description,
      price,
    });

    await this.productRepository.create(product);

    return {
      product,
    };
  }
}
