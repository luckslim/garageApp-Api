import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
export interface CheckInProps {
  clientId: UniqueEntityID;
  typeVehicle: string;
  vehicleId: string;
  vehiclePhoto: string;
  checkInAt: Date;
  checkOutAt?: Date | null;
}
export class CheckIn extends Entity<CheckInProps> {
  get clientId() {
    return this.props.clientId;
  }
  get typeVehicle() {
    return this.props.typeVehicle;
  }
  get vehicleId() {
    return this.props.vehicleId;
  }
  get vehiclePhoto() {
    return this.props.vehiclePhoto;
  }
  get checkInAt() {
    return this.props.checkInAt;
  }
  get checkOutAt() {
    return this.props.checkOutAt;
  }
  static create(props: CheckInProps, id?: UniqueEntityID) {
    const checkIn = new CheckIn(props, id);
    return checkIn;
  }
}
