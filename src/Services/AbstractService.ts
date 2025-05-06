import { NonExistentElement, UUID, WithId } from '../models';
import { IRepository } from '../repositories';
import { IService } from './IService';

export abstract class AbstractService<TEntity, TRepository extends IRepository<TEntity>> implements IService<TEntity> {
    protected abstract repository: TRepository;

    public all(): WithId<TEntity>[] {
        // Pedir al repositorio todos los datos
        return this.repository.all();
    }

    public get(id: UUID): WithId<TEntity> {
        // Obtener la entidad actualmente en la base
        const actualEntity = this.repository.get(id);
        // Si no está la entidad, lanza un error
        if (!actualEntity) throw new NonExistentElement();
        // Devolver la entidad
        return actualEntity;
    }

    public create(newEntity: TEntity): WithId<TEntity> {
        // Guardamos la entidad
        return this.repository.save(newEntity);
    }

    public update(entity: WithId<TEntity>): WithId<TEntity> {
        // Guardamos la entidad y devolvemos el resultado
        return this.repository.save(entity, entity._id);
    }

    public delete(entity: WithId<TEntity>): void {
        // Borramos la entidad
        this.repository.delete(entity._id);
    }
}
