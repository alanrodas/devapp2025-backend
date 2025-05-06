import { fromPersonaToListingDTO, PersonaListingDTO } from '../DTO';
import { validatedPersona, Persona } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADMiddleware } from './BREADMiddleware';
import { identity } from '../helpers';

export class PersonaMiddleware extends BREADMiddleware<Persona, PersonaListingDTO, Persona> {
    protected service: IService<Persona> = ServiceFactory.personaService();
    protected entityToListingEntity = fromPersonaToListingDTO;
    protected entityToFullEntity = identity;
    protected validatedEntity = validatedPersona;
}
