import { Auto, WithId, UUID } from '../../models';
import { AbstractTransintRepository } from './AbstractTransientRepository';
import { db } from './DB';

export class AutoTransientRepository extends AbstractTransintRepository<Auto> {
    protected collection = db.autos;

    protected beforeSave(entity: Auto, id?: UUID): Record<string, string> {
        // Validamos que exista un dueño con el ID dado
        const errors: Record<string, string> = {};
        const withSamePatente = db.all(db.autos).filter((e) => e.patente === entity.patente);
        if ((!id && withSamePatente.length !== 0) || (id && withSamePatente.length !== 1)) {
            errors.dni = 'The patente must be unique. Another auto with the same patente already exists.';
        }
        const owner = db.personas[entity.owner];
        if (!owner) {
            errors.owner = 'The owner does not exist';
        }
        return errors;
    }

    protected afterSave(entity: WithId<Auto>): Record<string, string> {
        // Guardamos el auto en dentro del dueño
        db.personas[entity.owner].autos.push(entity._id);
        return {};
    }

    protected afterDelete(entity: WithId<Auto>): Record<string, string> {
        // Borrar el auto del dueño
        const owner = db.personas[entity.owner];
        const idx = owner.autos.indexOf(entity._id);
        owner.autos.splice(idx, 1);
        return {};
    }
}
