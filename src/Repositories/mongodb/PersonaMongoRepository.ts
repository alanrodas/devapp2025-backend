import { Model } from 'mongoose';
import { Persona, WithId } from '../../models';
import { AbstractMongoRepository } from './AbstractMongoRepository';
import { PersonaMongoModel } from './Models';

export class PersonaMongoRepository extends AbstractMongoRepository<Persona> {
    protected collection = PersonaMongoModel as unknown as Model<WithId<Persona>>;
}
