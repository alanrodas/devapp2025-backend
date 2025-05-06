import { Persona } from '../Models';
import { IRepository, RepositoryFactory } from '../repositories';
import { AbstractService } from './AbstractService';

export class PersonaService extends AbstractService<Persona, IRepository<Persona>> {
    protected repository = RepositoryFactory.personaRepository();
}
