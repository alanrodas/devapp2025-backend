import zod from 'zod';

import { Auto } from '../../Models';
import { InputAddDTOManager, validatedDTOFromZodSafeParse } from './InputDTOManager';

export const autoAddSchema = zod.object({
    patente: zod.string().regex(/[A-Z]{2}\s[0-9]{3}\s[A-Z]{2}/),
    marca: zod.string(),
    modelo: zod.string(),
    anho: zod.number().min(1850).max(2100),
    color: zod.string(),
    nroChasis: zod.string(),
    nroMotor: zod.string(),
    owner: zod.string()
});

export type AutoAddDTO = zod.infer<typeof autoAddSchema>;

export const AutoAddManager: InputAddDTOManager<AutoAddDTO, Auto> = {
    validatedDTO: (input: unknown): AutoAddDTO => validatedDTOFromZodSafeParse(autoAddSchema, input),
    toEntity: (dto: AutoAddDTO): Auto => {
        return { ...dto };
    }
};
