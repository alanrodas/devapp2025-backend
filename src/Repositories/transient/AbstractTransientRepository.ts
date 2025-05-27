import crypto from 'crypto';

import { InvalidData, UUID, WithId } from '../../models';
import { IRepository } from '../IRepository';
import { db } from './DB';
import { isEmptyObject } from '../../helpers';

export abstract class AbstractTransientRepository<TEntity> implements IRepository<TEntity> {
    protected abstract collection: Record<string, WithId<TEntity>>;

    public async all(): Promise<WithId<TEntity>[]> {
        return db.all(this.collection);
    }

    public async get(id: UUID): Promise<WithId<TEntity> | undefined> {
        return this.collection[id as string];
    }

    public async save(entity: TEntity, id?: UUID): Promise<WithId<TEntity>> {
        const beforeErrors = await this.beforeSave(entity, id);
        if (!isEmptyObject(beforeErrors)) {
            throw new InvalidData(beforeErrors);
        }
        id = id ?? crypto.randomUUID();
        const entityWithId: WithId<TEntity> = { _id: id, ...entity };
        this.collection[id as string] = entityWithId;
        const afterErrors = await this.afterSave(entityWithId);
        if (!isEmptyObject(afterErrors)) {
            throw new InvalidData(afterErrors);
        }
        return entityWithId;
    }

    public async delete(id: UUID): Promise<boolean> {
        const entity = this.collection[id as string];
        if (entity) {
            const beforeErrors = await this.beforeDelete(entity, id);
            if (!isEmptyObject(beforeErrors)) {
                throw new InvalidData(beforeErrors);
            }
            delete this.collection[id as string];
            const afterErrors = await this.afterDelete(entity);
            if (!isEmptyObject(afterErrors)) {
                throw new InvalidData(afterErrors);
            }
            return true;
        }
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async beforeSave(entity: TEntity, id?: UUID): Promise<Record<string, string>> {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async afterSave(entity: WithId<TEntity>): Promise<Record<string, string>> {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async beforeDelete(entity: WithId<TEntity>, _id?: UUID): Promise<Record<string, string>> {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async afterDelete(entity: WithId<TEntity>): Promise<Record<string, string>> {
        return {};
    }
}
