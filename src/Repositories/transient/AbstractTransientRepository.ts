import crypto from 'crypto';

import { InvalidData, UUID, WithId } from '../../models';
import { IRepository } from '../IRepository';
import { db } from './DB';
import { isEmptyObject } from '../../helpers';

export abstract class AbstractTransintRepository<TEntity> implements IRepository<TEntity> {
    protected abstract collection: Record<UUID, WithId<TEntity>>;

    public all(): WithId<TEntity>[] {
        return db.all(this.collection);
    }
    public get(id: UUID): WithId<TEntity> {
        return this.collection[id];
    }

    public save(entity: TEntity, id?: UUID): WithId<TEntity> {
        const beforeErrors = this.beforeSave(entity, id);
        if (!isEmptyObject(beforeErrors)) {
            throw new InvalidData(beforeErrors);
        }
        id = id ?? crypto.randomUUID();
        const entityWithId: WithId<TEntity> = { ...entity, _id: id };
        this.collection[id] = entityWithId;
        const afterErrors = this.afterSave(entityWithId);
        if (!isEmptyObject(afterErrors)) {
            throw new InvalidData(afterErrors);
        }
        return entityWithId;
    }
    public delete(id: UUID): boolean {
        const entity = this.collection[id];
        if (entity) {
            const beforeErrors = this.beforeDelete(entity, id);
            if (!isEmptyObject(beforeErrors)) {
                throw new InvalidData(beforeErrors);
            }
            delete this.collection[id];
            const afterErrors = this.afterDelete(entity);
            if (!isEmptyObject(afterErrors)) {
                throw new InvalidData(afterErrors);
            }
            return true;
        }
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected beforeSave(entity: TEntity, id?: UUID): Record<string, string> {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected afterSave(entity: WithId<TEntity>): Record<string, string> {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected beforeDelete(entity: WithId<TEntity>, _id?: UUID): Record<string, string> {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected afterDelete(entity: WithId<TEntity>): Record<string, string> {
        return {};
    }
}
