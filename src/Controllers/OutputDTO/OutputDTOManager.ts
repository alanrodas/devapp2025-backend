import { WithId } from '../../Models';

export type OutputDTOManager<TOutputDTO, TEntity> = {
    toDto: (entity: WithId<TEntity>) => WithId<TOutputDTO>;
};
