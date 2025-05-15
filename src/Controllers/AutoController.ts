import { Request } from 'express';
import { Auto } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADController } from './BREADController';
import { AutoService } from '../services/AutoService';
import { AutoListingDTO, AutoLitingDTOManager } from './OutputDTO';
import { AutoAddDTO, AutoAddManager, AutoEditDTO, AutoEditManager } from './InputDTO';
import { identity } from '../helpers';

export class AutoController extends BREADController<Auto, AutoAddDTO, AutoEditDTO, Auto, AutoListingDTO> {
    protected service: IService<Auto> = ServiceFactory.autoService();
    protected addDtoManager = AutoAddManager;
    protected editDtoManager = AutoEditManager;
    protected fullDtoManager = { dto: identity };
    protected listingDtoManager = AutoLitingDTOManager;

    public browse({ req }: { req: Request }): AutoListingDTO[] {
        const entities = !req.query.owner
            ? // Primero obtenemos la totalidad de las entidades desde el service, para listado
              this.service.all()
            : (this.service as AutoService).allOfOwner(req.query.owner as string);
        return entities.map((e) => this.listingDtoManager.toDto(e));
    }
}
