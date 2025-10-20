import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/product-repository";
import { UpdateProductDto } from "../dtos/update-product-dto";

type UpdateProductResponse = {
  product: Product;
};

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: UpdateProductDto): Promise<UpdateProductResponse> {
    const { id, description, name, price } = data;

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found!");
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    await this.productRepository.save(product);

    return {
      product,
    };
  }
}
