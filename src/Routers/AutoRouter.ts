import { AutoController, BREADController } from '../Controllers';
import { AutoListingDTO } from '../DTO';
import { AutoMiddleware } from '../Middlewares';
import { BREADMiddleware } from '../Middlewares/BREADMiddleware';
import { Auto } from '../Models';
import { BREADRouter } from './BREADRouter';

const controller: BREADController<Auto> = new AutoController();
const middleware: BREADMiddleware<Auto, AutoListingDTO, Auto> = new AutoMiddleware();

export const AutoRouter = () => BREADRouter(controller, middleware);
