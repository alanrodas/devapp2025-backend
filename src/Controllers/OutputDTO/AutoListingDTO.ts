import { Auto, WithId } from '../../Models';

export type AutoListingDTO = Pick<Auto, 'patente' | 'marca' | 'modelo' | 'anho'>;

export const AutoLitingDTOManager = {
    toDto: (entity: WithId<Auto>): WithId<AutoListingDTO> => {
        return {
            _id: entity._id,
            patente: entity.patente,
            marca: entity.marca,
            modelo: entity.modelo,
            anho: entity.anho
        };
    }
};
