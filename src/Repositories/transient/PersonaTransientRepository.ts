import { Persona, UUID, WithId } from '../../models';
import { AbstractTransientRepository } from './AbstractTransientRepository';
import { db } from './DB';

export class PersonaTransientRepository extends AbstractTransientRepository<Persona> {
    protected collection = db.personas;

    protected async beforeSave(entity: Persona, id?: UUID): Promise<Record<string, string>> {
        // Por defecto una persona comienza sin autos
        if (!id) {
            entity.autos = [];
        }

        const errors: Record<string, string> = {};
        // Verificamos que no haya dos personas con el mismo DNI,
        // y que no hayan autos no existentes.
        const withSameDni = db.all(db.personas).filter((e) => e.dni === entity.dni);
        if ((!id && withSameDni.length !== 0) || (id && withSameDni.length !== 1)) {
            errors.dni = 'The dni must be unique. Another person with the same dni already exists.';
        }
        // Verificamos que todos los autos de la persona existan
        for (const auto of entity.autos) {
            if (!db.autos[auto]) {
                errors.autos =
                    "Not all the given autos id's exist in the system. Only existing autos can be added to the list.";
                break;
            }
        }
        return errors;
    }

    protected async beforeDelete(entity: WithId<Persona>): Promise<Record<string, string>> {
        // Borramos todos los autos asociados a la persona
        for (const auto of entity.autos) {
            delete db.autos[auto];
        }
        return {};
    }
}
