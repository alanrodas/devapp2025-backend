import { NextFunction, Request, Response } from 'express';
import { Validation, WithId } from '../Models';
import { IService } from '../Services';

export abstract class BREADMiddleware<TEntity, TListingDto, TFullEntityDto> {
    protected abstract service: IService<TEntity>;
    protected abstract validatedEntity: (entity: TEntity) => Validation<TEntity>;
    protected abstract entityToListingEntity: (entity: TEntity) => TListingDto;
    protected abstract entityToFullEntity: (entity: TEntity) => TFullEntityDto;

    public fetchEntityByParamId(req: Request<{ id: string }>, res: Response, next: NextFunction): void {
        const id = req.params.id;
        const entity = this.service.get(id);
        // Si está la entidad, se deja en el request como "locals.entity"
        req.locals.entity = entity;
        console.log(entity);
        next();
    }

    public fetchEntityFromBody(req: Request, res: Response, next: NextFunction): void {
        const entity = req.body;
        // Si está la entidad, se deja en el request como "locals.entity"
        req.locals.entity = entity;
        next();
    }

    public mergeEntityWithBody(req: Request, res: Response, next: NextFunction): void {
        const newEntity = { ...req.locals.entity, ...req.body };
        req.locals.entity = newEntity;
        next();
    }

    public validateEntity(req: Request, res: Response, next: NextFunction): void {
        const validation = this.validatedEntity(req.locals.entity);
        if (!validation.success) {
            throw validation.error;
        }
        req.locals.entity = validation.data;
        next();
    }

    public responseToListing(
        req: Request<{ id: string }, WithId<TListingDto>>,
        res: Response<WithId<TListingDto>>,
        next: NextFunction
    ): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = res as any;
        const convertedToDto = (entity: WithId<TEntity>): WithId<TListingDto> => ({
            _id: entity._id,
            ...this.entityToListingEntity(entity)
        });
        const entityOrEntities: WithId<TEntity> | WithId<TEntity>[] = response.body;
        if (!Array.isArray(entityOrEntities)) {
            response.body = convertedToDto(entityOrEntities);
        } else {
            response.body = entityOrEntities.map((e) => convertedToDto(e));
        }
        next();
    }

    public responseToFullEntity(
        req: Request<{ id: string }, WithId<TFullEntityDto>>,
        res: Response<WithId<TFullEntityDto>>,
        next: NextFunction
    ): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = res as any;
        const convertedToDto = (entity: WithId<TEntity>): WithId<TFullEntityDto> => ({
            _id: entity._id,
            ...this.entityToFullEntity(entity)
        });
        const entityOrEntities: WithId<TEntity> | WithId<TEntity>[] = response.body;
        if (!Array.isArray(entityOrEntities)) {
            response.body = convertedToDto(entityOrEntities);
        } else {
            response.body = entityOrEntities.map((e) => convertedToDto(e));
        }
        next();
    }
}
