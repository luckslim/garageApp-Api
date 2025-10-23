import { AggregateRoot } from '@/core/entities/aggregate-root';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Files } from './files';
import { CheckInFiles } from './checkIn-file';
export interface CheckInProps {
  clientId: string;
  typeVehicle?: string;
  vehicleId: string;
  vehiclePhoto: string;
  file: CheckInFiles[];
  checkInAt?: Date;
  checkOutAt?: Date;
}
export class CheckIn extends AggregateRoot<CheckInProps> {
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
  get file() {
    return this.props.file;
  }
  get checkInAt() {
    return this.props.checkInAt;
  }
  get checkOutAt() {
    return this.props.checkOutAt;
  }
  set file(file: CheckInFiles[]) {
    this.props.file = file
  }
  static create(
    props: Optional<CheckInProps, 'checkInAt' | 'checkOutAt' | 'file'>,
    id?: UniqueEntityID,
  ) {
    const checkIn = new CheckIn(
      {
        ...props,
        file: props.file ?? [],
        checkInAt: props.checkOutAt ?? new Date(),
      },
      id,
    );
    return checkIn;
  }
}
