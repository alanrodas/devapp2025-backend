import { PersonaController } from '../Controllers';
import { BREADRouter } from './BREADRouter';

export const PersonaRouter = () => BREADRouter(new PersonaController());
