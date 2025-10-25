import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface CheckInFilesProps {
  fileId: UniqueEntityID;
  checkInId: UniqueEntityID;
}
export class CheckInFiles extends Entity<CheckInFilesProps> {
  get fileId() {
    return this.props.fileId;
  }
  get checkInId() {
    return this.props.checkInId;
  }
  static create(props: CheckInFilesProps, id?: UniqueEntityID) {
    const client = new CheckInFiles(props, id);
    return client;
  }
}
