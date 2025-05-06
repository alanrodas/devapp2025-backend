import { InvalidData } from './errors';
import { UUID } from './UUID';
import { Validation } from './Validations';

export type Auto = {
    patente: string;
    marca: string;
    modelo: string;
    anho: number;
    color: string;
    nroChasis: string;
    nroMotor: string;
    // Relationships
    owner: UUID;
};

export const validatedAuto = (entity: Auto): Validation<Auto> => {
    const errors: Record<string, string> = {};
    if (entity['patente'] === undefined) {
        errors['patente'] = 'The field is required';
    }
    if (entity['patente'] && typeof entity['patente'] !== 'string') {
        errors['patente'] = 'The field must be a string';
    }

    if (entity['marca'] === undefined) {
        errors['marca'] = 'The field is required';
    }
    if (entity['marca'] && typeof entity['marca'] !== 'string') {
        errors['marca'] = 'The field must be a string';
    }

    if (entity['modelo'] === undefined) {
        errors['modelo'] = 'The field is required';
    }
    if (entity['modelo'] && typeof entity['modelo'] !== 'string') {
        errors['modelo'] = 'The field must be a string';
    }

    if (entity['anho'] === undefined) {
        errors['anho'] = 'The field is required';
    }
    if (entity['anho'] && typeof entity['anho'] !== 'number') {
        errors['anho'] = 'The field must be a string';
    }

    if (entity['color'] === undefined) {
        errors['color'] = 'The field is required';
    }
    if (entity['color'] && typeof entity['color'] !== 'string') {
        errors['color'] = 'The field must be a string';
    }

    if (entity['nroChasis'] === undefined) {
        errors['nroChasis'] = 'The field is required';
    }
    if (entity['nroChasis'] && typeof entity['nroChasis'] !== 'string') {
        errors['nroChasis'] = 'The field must be a string';
    }

    if (entity['nroMotor'] === undefined) {
        errors['nroMotor'] = 'The field is required';
    }
    if (entity['nroMotor'] && typeof entity['nroMotor'] !== 'string') {
        errors['nroMotor'] = 'The field must be a string';
    }

    if (entity['owner'] === undefined) {
        errors['owner'] = 'The field is required';
    }
    if (entity['owner'] && typeof entity['owner'] !== 'string') {
        errors['owner'] = 'The field must be a UUID';
    }

    if (Object.keys(errors).length !== 0) return { success: false, error: new InvalidData(errors) };
    return { success: true, data: entity };
};
