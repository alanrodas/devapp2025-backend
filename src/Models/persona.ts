import { UUID } from './UUID';
import { Temporal } from 'temporal-polyfill';
import { Validation } from './Validations';
import { InvalidData } from './errors';
import zod from 'zod';

type Genero = 'masculino' | 'femenino' | 'no binario';

export type Persona = {
    dni: string;
    nombre: string;
    apellido: string;
    fechaDeNacimiento: Temporal.PlainDate;
    genero: Genero;
    esDonanteDeOrganos: boolean;
    // Relationships
    autos?: UUID[];
};

const personaSchema = zod.object({
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
    genero: zod.enum(['masculino', 'femenino', 'no binario']),
    esDonanteDeOrganos: zod.boolean(),
    autos: zod.optional(zod.array(zod.string()))
});

export const validatedPersona = (entity: Persona): Validation<Persona> => {
    const result = personaSchema.safeParse(entity);
    if (result.success) return result;
    return { success: false, error: InvalidData.fromZodError(result.error) };
};
