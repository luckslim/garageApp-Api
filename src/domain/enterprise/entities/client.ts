import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface ClientProps {
  name: string;
  email: string;
  password: string;
}
export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  set name(name: string) {
    this.props.name = name;
  }
  set email(email: string) {
    this.props.email = email;
  }
  set password(password: string) {
    this.props.password = password;
  }
  static create(props: ClientProps, id?: UniqueEntityID) {
    const client = new Client(props, id);
    return client;
  }
}
