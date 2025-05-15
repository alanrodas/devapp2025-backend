import zod from 'zod';
import { Temporal } from 'temporal-polyfill';

import { Genero, Persona } from '../../Models';
import { InputAddDTOManager, validatedDTOFromZodSafeParse } from './InputDTOManager';

export const personaAddSchema = zod.object({
    dni: zod.string().regex(/^[1-9][0-9]{6,8}$/, {
        message: 'Expected a DNI formatted string, with 7 to 9 digits, no dots or dashes.'
    }),
    nombre: zod.string(),
    apellido: zod.string(),
    fechaDeNacimiento: zod
        .string()
        .date(
            'Invalid date. Expected a date in the YYYY-MM-DD format, with two digits for month and day (e.g. 03 and not 3).'
        )
        .transform<Temporal.PlainDate>((dateStr) => {
            const [year, month, day] = dateStr.split('-').map((e) => Number(e));
            return new Temporal.PlainDate(year, month, day);
        }),
    genero: zod.nativeEnum(Genero),
    esDonanteDeOrganos: zod.boolean()
});

export type PersonaAddDTO = zod.infer<typeof personaAddSchema>;

export const PersonaAddManager: InputAddDTOManager<PersonaAddDTO, Persona> = {
    validatedDTO: (input: unknown): PersonaAddDTO => validatedDTOFromZodSafeParse(personaAddSchema, input),
    toEntity: (dto: PersonaAddDTO): Persona => {
        return { ...dto, autos: [] };
    }
};
