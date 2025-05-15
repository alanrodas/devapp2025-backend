import { Persona, WithId } from '../../Models';

export type PersonaListingDTO = Pick<Persona, 'dni' | 'nombre' | 'apellido'>;

export const PersonaListingDTOManager = {
    toDto: (persona: WithId<Persona>): WithId<PersonaListingDTO> => {
        return {
            _id: persona._id,
            dni: persona.dni,
            nombre: persona.nombre,
            apellido: persona.apellido
        };
    }
};
