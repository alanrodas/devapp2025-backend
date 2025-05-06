import { BREADController, PersonaController } from '../Controllers';
import { PersonaListingDTO } from '../DTO';
import { PersonaMiddleware } from '../Middlewares';
import { BREADMiddleware } from '../Middlewares/BREADMiddleware';
import { Persona } from '../Models';
import { BREADRouter } from './BREADRouter';

const controller: BREADController<Persona> = new PersonaController();
const middleware: BREADMiddleware<Persona, PersonaListingDTO, Persona> = new PersonaMiddleware();

export const PersonaRouter = () => BREADRouter(controller, middleware);
