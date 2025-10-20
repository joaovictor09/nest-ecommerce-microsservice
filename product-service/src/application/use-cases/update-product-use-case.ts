import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/product-repository";
import { UpdateProductDto } from "../dtos/update-product-dto";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Either, left, right } from "../utils/either";

type UpdateProductResponse = Either<
  ResourceNotFoundError,
  {
    product: Product;
  }
>;

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: UpdateProductDto): Promise<UpdateProductResponse> {
    const { id, description, name, price } = data;

    const product = await this.productRepository.findById(id);

    if (!product) {
      return left(new ResourceNotFoundError());
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    await this.productRepository.save(product);

    return right({
      product,
    });
  }
}
