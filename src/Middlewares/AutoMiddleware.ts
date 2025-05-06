import { fromAutoToListingDTO, AutoListingDTO } from '../DTO';
import { identity } from '../helpers';
import { validatedAuto, Auto } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADMiddleware } from './BREADMiddleware';

export class AutoMiddleware extends BREADMiddleware<Auto, AutoListingDTO, Auto> {
    protected service: IService<Auto> = ServiceFactory.autoService();
    protected entityToListingEntity = fromAutoToListingDTO;
    protected entityToFullEntity = identity;
    protected validatedEntity = validatedAuto;
}
