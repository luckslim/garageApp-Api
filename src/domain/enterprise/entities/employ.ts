import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
interface EmployProps {
  name: string;
  email: string;
  password: string;
}
export class Employ extends Entity<EmployProps> {
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  static create(props: EmployProps, id?: UniqueEntityID) {
    const employ = new Employ(props, id);
    return employ;
  }
}
