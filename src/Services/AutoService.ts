import { Auto, UUID, WithId } from '../Models';
import { IRepository, RepositoryFactory } from '../Repositories';
import { AbstractService } from './AbstractService';

export class AutoService extends AbstractService<Auto, IRepository<Auto>> {
    protected repository = RepositoryFactory.autoRepository();

    public allOfOwner(id: UUID): WithId<Auto>[] {
        // Pedir al repositorio todos los datos
        const entities = this.repository.all();
        // Filtrar por aquellos cuyo owner coincida con el dado
        return entities.filter((e) => e.owner === id);
    }
}
