import { Auto, WithId, UUID } from '../../models';
import { AbstractTransientRepository } from './AbstractTransientRepository';
import { db } from './DB';

export class AutoTransientRepository extends AbstractTransientRepository<Auto> {
    protected collection = db.autos;

    protected async beforeSave(entity: Auto, id?: UUID): Promise<Record<string, string>> {
        // Validamos que exista un dueño con el ID dado
        const errors: Record<string, string> = {};
        const withSamePatente = db.all(db.autos).filter((e) => e.patente === entity.patente);
        if ((!id && withSamePatente.length !== 0) || (id && withSamePatente.length !== 1)) {
            errors.dni = 'The patente must be unique. Another auto with the same patente already exists.';
        }
        const owner = db.personas[entity.owner as string];
        if (!owner) {
            errors.owner = 'The owner does not exist';
        }
        return errors;
    }

    protected async afterSave(entity: WithId<Auto>): Promise<Record<string, string>> {
        // Guardamos el auto en dentro del dueño
        db.personas[entity.owner as string].autos.push(entity._id);
        return {};
    }

    protected async afterDelete(entity: WithId<Auto>): Promise<Record<string, string>> {
        // Borrar el auto del dueño
        const owner = db.personas[entity.owner as string];
        const idx = owner.autos.indexOf(entity._id);
        owner.autos.splice(idx, 1);
        return {};
    }
}
