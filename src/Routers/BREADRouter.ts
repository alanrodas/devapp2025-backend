import { Router } from 'express';
import { BREADController } from '../Controllers';
import { BREADMiddleware } from '../Middlewares/BREADMiddleware';

export const BREADRouter = <TEntity, TDto>(
    controller: BREADController<TEntity>,
    middleware?: BREADMiddleware<TEntity, TDto, TEntity>
) => {
    const router = Router();

    if (middleware) {
        // En las rutas donde se recibe un id, obtener la entidad a partir de la misma
        router.get('/:id', middleware.fetchEntityByParamId.bind(middleware));
        router.put('/:id', middleware.fetchEntityByParamId.bind(middleware));
        router.delete('/:id', middleware.fetchEntityByParamId.bind(middleware));
        // En el add, la entidad viene del body
        router.post('/', middleware.fetchEntityFromBody.bind(middleware));
        // En el editar, hay que mergear la entidad encontrada con el body
        router.put('/:id', middleware.mergeEntityWithBody.bind(middleware));
        // En el agregar y editar, se debe validar las entidades
        router.put('/:id', middleware.validateEntity.bind(middleware));
        router.post('/', middleware.validateEntity.bind(middleware));
    }

    // Ahora si van las rutas reales
    router.get('/', controller.browse.bind(controller));
    router.get('/:id', controller.read.bind(controller));
    router.put('/:id', controller.edit.bind(controller));
    router.post('/', controller.add.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));

    if (middleware) {
        // En las rutas donde se listas entidades, se debe transformar a su correspondiente DTO
        router.get('/', middleware.responseToListing.bind(middleware));
        // En las que se devuelve una sola entidad, se debe transformar a una entidad completa
        router.get('/:id', middleware.responseToFullEntity.bind(middleware));
        router.put('/:id', middleware.responseToFullEntity.bind(middleware));
        router.post('/:id', middleware.responseToFullEntity.bind(middleware));
        // Ahora el response si está listo para enviarse de forma completa
    }
    return router;
};
