import { NextFunction, Request, Response } from 'express';
import { WithId } from '../Models';
import { IService } from '../Services';

export abstract class BREADController<TEntity> {
    // Assumes a bread middleware was used
    protected abstract service: IService<TEntity>;

    public browse(
        req: Request<never, WithId<TEntity>[], never>,
        res: Response<WithId<TEntity>[]>,
        next: NextFunction
    ): void {
        // Primero obtenemos la totalidad de las entidades desde el service, para listado
        const entities = this.service.all();
        // Y ahora preparamos el response
        res.status(200).json(entities);
        next();
    }

    public read(
        req: Request<{ id: string }, WithId<TEntity>>,
        res: Response<WithId<TEntity>>,
        next: NextFunction
    ): void {
        // locals.entity ya contiene la entidad a leer,
        // basta decir que va a ser lo que queremos en el response
        res.status(200).json(req.locals.entity);
        next();
    }

    public edit(
        req: Request<{ id: string }, WithId<TEntity>, Partial<TEntity>>,
        res: Response<WithId<TEntity>>,
        next: NextFunction
    ): void {
        console.log('IN EDIT');
        console.log(req.locals.entity);
        // En locals.entity ya está la entidad mergeada con el body
        const newEntity = this.service.update(req.locals.entity);
        // Y devolvemos la entidad actualizada en el response
        res.status(200).json(newEntity);
        next();
    }

    public add(
        req: Request<never, WithId<TEntity>, TEntity>,
        res: Response<WithId<TEntity>>,
        next: NextFunction
    ): void {
        // Creamos la nueva entidad y devolvemos
        const newEntity = this.service.create(req.locals.entity);
        // Y devolvemos la entidad creada
        res.status(200).json(newEntity);
        next();
    }

    public delete(req: Request<{ id: string }>, res: Response<never>, next: NextFunction): void {
        this.service.delete(req.locals.entity);
        res.status(200).json();
        next();
    }
}
