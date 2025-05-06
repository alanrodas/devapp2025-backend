import { IService } from './IService';
import { Auto, Persona } from '../Models';
import { AutoListingDTO, PersonaListingDTO } from '../DTO';
import { AutoService } from './AutoService';
import { PersonaService } from './PersonaService';

export abstract class ServiceFactory {
    private static personaServiceSingletonInstance: IService<Persona, PersonaListingDTO> | undefined = undefined;
    private static autoServiceSingletonInstance: IService<Auto, AutoListingDTO> | undefined = undefined;

    public static personaService(): IService<Persona, PersonaListingDTO> {
        if (ServiceFactory.personaServiceSingletonInstance === undefined) {
            ServiceFactory.personaServiceSingletonInstance = new PersonaService();
        }
        return ServiceFactory.personaServiceSingletonInstance;
    }

    public static autoService(): IService<Auto, AutoListingDTO> {
        if (ServiceFactory.autoServiceSingletonInstance === undefined) {
            ServiceFactory.autoServiceSingletonInstance = new AutoService();
        }
        return ServiceFactory.autoServiceSingletonInstance;
    }
}
