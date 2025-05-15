import zod from 'zod';

import { Auto, WithId } from '../../Models';
import { InputEditDTOManager, validatedDTOFromZodSafeParse } from './InputDTOManager';
import { autoAddSchema } from './AutoAddDTO';

export const autoEditSchema = autoAddSchema
    .extend({
        autos: zod.array(zod.string())
    })
    .partial();

export type AutoEditDTO = zod.infer<typeof autoEditSchema>;

export const AutoEditManager: InputEditDTOManager<AutoEditDTO, Auto> = {
    validatedDTO: (input: unknown): AutoEditDTO => validatedDTOFromZodSafeParse(autoEditSchema, input),
    toEntity: (dto: AutoEditDTO, baseEntity?: WithId<Auto>): WithId<Auto> => {
        return { ...baseEntity, ...dto } as WithId<Auto>;
    }
};
