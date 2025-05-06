import { Auto } from '../Models';

export type AutoListingDTO = Pick<Auto, 'patente' | 'marca' | 'modelo' | 'anho'>;

export const fromAutoToListingDTO = (entity: Auto): AutoListingDTO => {
    return {
        patente: entity.patente,
        marca: entity.marca,
        modelo: entity.modelo,
        anho: entity.anho
    };
};
