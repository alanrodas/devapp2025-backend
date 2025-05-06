import { Persona } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADController } from './BREADController';

export class PersonaController extends BREADController<Persona> {
    protected service: IService<Persona> = ServiceFactory.personaService();
}
