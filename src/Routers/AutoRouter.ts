import { AutoController } from '../Controllers';
import { BREADRouter } from './BREADRouter';

export const AutoRouter = () => BREADRouter(new AutoController());
