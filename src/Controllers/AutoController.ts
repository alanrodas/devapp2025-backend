import { NextFunction, Request, Response } from 'express';
import { Auto, UUID, WithId } from '../Models';
import { IService, ServiceFactory } from '../services';
import { BREADController } from './BREADController';
import { AutoService } from '../services/AutoService';

export class AutoController extends BREADController<Auto> {
    protected service: IService<Auto> = ServiceFactory.autoService();

    public browse(
        req: Request<never, WithId<Auto>[], never, { owner: UUID }>,
        res: Response<WithId<Auto>[]>,
        next: NextFunction
    ): void {
        const entities = !req.query.owner
            ? // Primero obtenemos la totalidad de las entidades desde el service, para listado
              this.service.all()
            : (this.service as AutoService).allOfOwner(req.query.owner);
        // Y ahora preparamos el response
        res.status(200).json(entities);
        next();
    }
}
