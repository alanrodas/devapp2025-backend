import { NextFunction, Router, Request, Response } from 'express';
import { BREADController } from '../Controllers';

export const BREADRouter = <TEntity, TInputAddDTO, TInputEditDTO, TOutputFullDTO, TOutputListingDTO>(
    controller: BREADController<TEntity, TInputAddDTO, TInputEditDTO, TOutputFullDTO, TOutputListingDTO>
) => {
    const router = Router();

    const fetchEntityByParamId = (req: Request<{ id: string }>, res: Response, next: NextFunction): void => {
        const id = req.params.id;
        const entity = controller.fetchEntity(id);
        req.locals.entity = entity;
        next();
    };

    router.get('/:id', fetchEntityByParamId);
    router.put('/:id', fetchEntityByParamId);
    router.delete('/:id', fetchEntityByParamId);

    router.get('/', (req, res, next) => {
        res.status(200).json(
            controller.browse({
                req,
                res,
                next
            })
        );
    });
    router.get('/:id', (req, res, next) => {
        res.status(200).json(
            controller.read({
                entity: req.locals.entity,
                req,
                res,
                next
            })
        );
    });
    router.put('/:id', (req, res, next) => {
        res.status(200).json(
            controller.edit({
                dto: controller.validatedEditDto(req.body),
                entity: req.locals.entity,
                req,
                res,
                next
            })
        );
    });
    router.post('/', (req, res, next) => {
        res.status(200).json(
            controller.add({
                dto: controller.validatedAddDto(req.body),
                req,
                res,
                next
            })
        );
    });
    router.delete('/:id', (req, res, next) => {
        res.status(200).json(
            controller.delete({
                entity: req.locals.entity,
                req,
                res,
                next
            })
        );
    });

    return router;
};
