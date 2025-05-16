import { NextFunction, Router, Request, Response } from 'express';
import { BREADController } from '../Controllers';

export const BREADRouter = <TEntity, TInputAddDTO, TInputEditDTO, TOutputFullDTO, TOutputListingDTO>(
    controller: BREADController<TEntity, TInputAddDTO, TInputEditDTO, TOutputFullDTO, TOutputListingDTO>
) => {
    const router = Router();

    const fetchEntityByParamId = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const id = req.params.id;
        const entity = await controller.fetchEntity(id);
        req.locals.entity = entity;
        next();
    };

    router.get('/:id', fetchEntityByParamId);
    router.put('/:id', fetchEntityByParamId);
    router.delete('/:id', fetchEntityByParamId);

    router.get('/', async (req, res, next) => {
        res.status(200).json(
            await controller.browse({
                req,
                res,
                next
            })
        );
    });
    router.get('/:id', async (req, res, next) => {
        res.status(200).json(
            await controller.read({
                entity: req.locals.entity,
                req,
                res,
                next
            })
        );
    });
    router.put('/:id', async (req, res, next) => {
        res.status(200).json(
            await controller.edit({
                dto: controller.validatedEditDto(req.body),
                entity: req.locals.entity,
                req,
                res,
                next
            })
        );
    });
    router.post('/', async (req, res, next) => {
        res.status(200).json(
            await controller.add({
                dto: controller.validatedAddDto(req.body),
                req,
                res,
                next
            })
        );
    });
    router.delete('/:id', async (req, res, next) => {
        res.status(200).json(
            await controller.delete({
                entity: req.locals.entity,
                req,
                res,
                next
            })
        );
    });

    return router;
};
