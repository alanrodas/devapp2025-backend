import { PersonaDTO } from '../DTO';
import { Persona } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADController } from './BREADController';

export class PersonaController extends BREADController<Persona, PersonaDTO> {
    protected service: IService<Persona, PersonaDTO> = ServiceFactory.personaService();
}
