import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface FilesProps {
  fileName: string;
  url: string;
}
export class Files extends Entity<FilesProps> {
  get fileName() {
    return this.props.fileName;
  }
  get url() {
    return this.props.url;
  }
  static create(props: FilesProps, id?: UniqueEntityID) {
    const files = new Files(props, id);
    return files;
  }
}
