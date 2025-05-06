import { Persona } from '../Models';

export type PersonaListingDTO = Pick<Persona, 'dni' | 'nombre' | 'apellido'>;

export const fromPersonaToListingDTO = (persona: Persona): PersonaListingDTO => {
    return {
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido
    };
};
