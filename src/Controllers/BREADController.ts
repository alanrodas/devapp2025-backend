import { NextFunction, Request, Response } from 'express';
import { UUID, WithId } from '../Models';
import { IService } from '../Services';
import { InputAddDTOManager, InputEditDTOManager } from './InputDTO';
import { OutputDTOManager } from './RequestDTO/OutputDTOManager';

type ControllerProps = {
    req: Request;
    res: Response;
    next: NextFunction;
};

export abstract class BREADController<TEntity, TInputAddDTO, TInputEditDTO, TOutputFullDTO, TOutputListingDTO> {
    // Assumes a bread middleware was used
    protected abstract service: IService<TEntity>;
    protected abstract addDtoManager: InputAddDTOManager<TInputAddDTO, TEntity>;
    protected abstract editDtoManager: InputEditDTOManager<TInputEditDTO, TEntity>;
    protected abstract fullDtoManager: OutputDTOManager<TOutputFullDTO, TEntity>;
    protected abstract listingDtoManager: OutputDTOManager<TOutputListingDTO, TEntity>;

    public validatedEditDto(dto: unknown): TInputEditDTO {
        return this.editDtoManager.validatedDTO(dto);
    }

    public validatedAddDto(dto: unknown): TInputAddDTO {
        return this.addDtoManager.validatedDTO(dto);
    }

    public fetchEntity(id: UUID): WithId<TEntity> {
        return this.service.get(id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public browse(props: ControllerProps): TOutputListingDTO[] {
        return this.service.all().map((e) => this.listingDtoManager.toDto(e));
    }

    public read({ entity }: ControllerProps & { entity: WithId<TEntity> }): TOutputFullDTO {
        return this.fullDtoManager.toDto(entity);
    }

    public edit({ dto, entity }: ControllerProps & { dto: TInputEditDTO; entity: WithId<TEntity> }): TOutputFullDTO {
        const dtoAsEntity: WithId<TEntity> = this.editDtoManager.toEntity(dto, entity);
        const savedEntity = this.service.update(dtoAsEntity);
        return this.fullDtoManager.toDto(savedEntity);
    }

    public add({ dto }: ControllerProps & { dto: TInputAddDTO }): TOutputFullDTO {
        const dtoAsEntity: TEntity = this.addDtoManager.toEntity(dto);
        const savedEntity = this.service.create(dtoAsEntity);
        return this.fullDtoManager.toDto(savedEntity);
    }

    public delete({ entity }: ControllerProps & { entity: WithId<TEntity> }): void {
        this.service.delete(entity);
    }
}
