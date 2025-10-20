import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Product } from "../../src/domain/entities/product";
import { ProductRepository } from "../../src/domain/repositories/product-repository";

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = [];

  async create(product: Product) {
    this.items.push(product);
  }

  async findById(id: string) {
    const product = this.items.find((item) =>
      item.id.equals(new UniqueEntityID(id)),
    );

    if (!product) return null;

    return product;
  }

  async save(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id);

    this.items[itemIndex] = product;
  }
}
