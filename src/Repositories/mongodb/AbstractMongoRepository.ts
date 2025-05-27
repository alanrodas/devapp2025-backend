import { UUID, WithId } from '../../models';
import { IRepository } from '../IRepository';
import { Model } from 'mongoose';

export abstract class AbstractMongoRepository<TEntity> implements IRepository<TEntity> {
    protected abstract collection: Model<WithId<TEntity>>;

    public async all(): Promise<WithId<TEntity>[]> {
        return await this.collection.find();
    }

    public async get(id: UUID): Promise<WithId<TEntity> | undefined> {
        const result = await this.collection.findById(id);
        return result ?? undefined;
    }

    public async save(entity: TEntity, id?: UUID): Promise<WithId<TEntity>> {
        if (id) {
            return await this.collection.insertOne(entity);
        } else {
            const fullEntity = { ...entity, _id: id };
            await this.collection.updateOne(fullEntity);
            return fullEntity as WithId<TEntity>;
        }
    }

    public async delete(id: UUID): Promise<boolean> {
        const removed = await this.collection.deleteOne({ _id: id });
        return removed.deletedCount >= 1;
    }
}
