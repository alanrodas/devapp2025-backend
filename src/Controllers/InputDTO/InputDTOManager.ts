import zod from 'zod';
import { InvalidData, WithId } from '../../Models';

export type InputAddDTOManager<TInputDTO, TEntity> = {
    validatedDTO: (input: unknown) => TInputDTO;
    toEntity: (dto: TInputDTO) => TEntity;
};

export type InputEditDTOManager<TInputDTO, TEntity> = {
    validatedDTO: (input: unknown) => TInputDTO;
    toEntity: (dto: TInputDTO, baseEntity?: WithId<TEntity>) => WithId<TEntity>;
};

export const validatedDTOFromZodSafeParse = <TResult>(schema: zod.ZodType, input: unknown): TResult => {
    const result = schema.safeParse(input);
    if (!result.success) {
        throw InvalidData.fromZodError(result.error);
    }
    return result.data;
};
