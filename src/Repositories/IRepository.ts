import { UUID, WithId } from '../models';

export interface IRepository<TEntity> {
    all(): Promise<WithId<TEntity>[]>;
    get(id: UUID): Promise<WithId<TEntity> | undefined>;
    save(entity: TEntity, id?: UUID): Promise<WithId<TEntity>>;
    delete(id: UUID): Promise<boolean>;
}
