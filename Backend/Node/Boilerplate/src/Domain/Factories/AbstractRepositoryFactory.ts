import { InMemoryRepositoryFactory } from '../../Infra/InMemory/InMemoryRepositoryFactory';
import { TypeORMRepositoryFactory } from '../../Infra/TypeORM/Repositories/TypeORMRepositoryFactory';
import { RepositoryFactory } from './RepositoryFactory';


export class AbstractRepositoryFactory {
  static createFactory(type: 'memory' | 'database'): RepositoryFactory {
    if (type === 'memory') {
      return new InMemoryRepositoryFactory();
    } else if (type === 'database') {
      return new TypeORMRepositoryFactory();
    } else {
      throw new Error('Invalid factory type');
    }
  }
}
