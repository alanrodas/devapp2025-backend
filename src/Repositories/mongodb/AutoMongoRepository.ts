import { Model } from 'mongoose';
import { Auto, WithId } from '../../models';
import { AbstractMongoRepository } from './AbstractMongoRepository';
import { AutoMongoModel } from './Models';

export class AutoMongoRepository extends AbstractMongoRepository<Auto> {
    protected collection = AutoMongoModel as unknown as Model<WithId<Auto>>;
}
