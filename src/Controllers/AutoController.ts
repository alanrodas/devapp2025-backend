import { Request } from 'express';
import { Auto } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADController } from './BREADController';
import { AutoService } from '../services/AutoService';
import { AutoListingDTO, AutoListingDTOManager } from './OutputDTO';
import { AutoAddDTO, AutoAddManager, AutoEditDTO, AutoEditManager } from './InputDTO';
import { identity } from '../helpers';

export class AutoController extends BREADController<Auto, AutoAddDTO, AutoEditDTO, Auto, AutoListingDTO> {
    protected service: IService<Auto> = ServiceFactory.autoService();
    protected addDtoManager = AutoAddManager;
    protected editDtoManager = AutoEditManager;
    protected fullDtoManager = { toDto: identity };
    protected listingDtoManager = AutoListingDTOManager;

    public async browse({ req }: { req: Request }): Promise<AutoListingDTO[]> {
        const entities = !req.query.owner
            ? // Primero obtenemos la totalidad de las entidades desde el service, para listado
              this.service.all()
            : (this.service as AutoService).allOfOwner(req.query.owner as string);
        return (await entities).map((e) => this.listingDtoManager.toDto(e));
    }
}
