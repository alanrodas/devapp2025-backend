import zod from 'zod';

import { Persona, WithId } from '../../Models';
import { InputEditDTOManager, validatedDTOFromZodSafeParse } from './InputDTOManager';
import { personaAddSchema } from './PersonaAddDTO';

export const personaEditSchema = personaAddSchema
    .extend({
        autos: zod.array(zod.string())
    })
    .partial();

export type PersonaEditDTO = zod.infer<typeof personaEditSchema>;

export const PersonaEditManager: InputEditDTOManager<PersonaEditDTO, Persona> = {
    validatedDTO: (input: unknown): PersonaEditDTO => validatedDTOFromZodSafeParse(personaEditSchema, input),
    toEntity: (dto: PersonaEditDTO, baseEntity?: WithId<Persona>): WithId<Persona> => {
        return { ...baseEntity, ...dto } as WithId<Persona>;
    }
};
