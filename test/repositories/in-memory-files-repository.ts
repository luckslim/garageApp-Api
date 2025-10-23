import { FileRepository } from '@/domain/aplication/repositories/file-repository';
import { Files } from '@/domain/enterprise/entities/files';

export class InMemoryFilesRepository implements FileRepository {
  public items: Files[] = [];
  async create(file: Files){
    this.items.push(file)
  }
}
