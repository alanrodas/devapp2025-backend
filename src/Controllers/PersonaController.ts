import { identity } from '../helpers';
import { Persona } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADController } from './BREADController';
import { PersonaAddDTO, PersonaEditDTO, PersonaAddManager, PersonaEditManager } from './InputDTO';
import { PersonaListingDTO, PersonaListingDTOManager } from './OutputDTO';

export class PersonaController extends BREADController<
    Persona,
    PersonaAddDTO,
    PersonaEditDTO,
    Persona,
    PersonaListingDTO
> {
    protected service: IService<Persona> = ServiceFactory.personaService();

    protected addDtoManager = PersonaAddManager;
    protected editDtoManager = PersonaEditManager;
    protected fullDtoManager = { toDto: identity };
    protected listingDtoManager = PersonaListingDTOManager;
}
