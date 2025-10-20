import { Product } from "../entities/product";

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
}
