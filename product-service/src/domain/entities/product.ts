import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  static create(props: ProductProps, id?: UniqueEntityID) {
    const product = new Product(props, id);

    return product;
  }
}
