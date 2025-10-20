import { Product } from "../entities/product";

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract save(product: Product): Promise<void>;
}
