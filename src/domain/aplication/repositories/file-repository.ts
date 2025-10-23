import { Files } from '@/domain/enterprise/entities/files';

export abstract class FileRepository {
  abstract create(file: Files): Promise<void>;
}
