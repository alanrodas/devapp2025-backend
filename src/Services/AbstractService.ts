import { NonExistentElement, UUID, WithId } from '../models';
import { IRepository } from '../repositories';
import { IService } from './IService';

export abstract class AbstractService<TEntity, TRepository extends IRepository<TEntity>> implements IService<TEntity> {
    protected abstract repository: TRepository;

    public async all(): Promise<WithId<TEntity>[]> {
        // Pedir al repositorio todos los datos
        return this.repository.all();
    }

    public async get(id: UUID): Promise<WithId<TEntity>> {
        // Obtener la entidad actualmente en la base
        const actualEntity = await this.repository.get(id);
        // Si no está la entidad, lanza un error
        if (!actualEntity) throw new NonExistentElement();
        // Devolver la entidad
        return actualEntity;
    }

    public async create(newEntity: TEntity): Promise<WithId<TEntity>> {
        // Guardamos la entidad
        return await this.repository.save(newEntity);
    }

    public async update(entity: WithId<TEntity>): Promise<WithId<TEntity>> {
        // Guardamos la entidad y devolvemos el resultado
        return await this.repository.save(entity, entity._id);
    }

    public async delete(entity: WithId<TEntity>): Promise<void> {
        // Borramos la entidad
        await this.repository.delete(entity._id);
    }
}
