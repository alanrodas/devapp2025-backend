import { UUID, WithId } from '../models';

export interface IService<TEntity> {
    all(): Promise<WithId<TEntity>[]>;
    get(id: UUID): Promise<WithId<TEntity>>;
    create(entity: TEntity): Promise<WithId<TEntity>>;
    update(entity: WithId<TEntity>): Promise<WithId<TEntity>>;
    delete(entity: WithId<TEntity>): Promise<void>;
}
