import { UUID, WithId } from '../models';

export interface IService<TEntity> {
    all(): WithId<TEntity>[];
    get(id: UUID): WithId<TEntity>;
    create(entity: TEntity): WithId<TEntity>;
    update(entity: WithId<TEntity>): WithId<TEntity>;
    delete(entity: WithId<TEntity>): void;
}
