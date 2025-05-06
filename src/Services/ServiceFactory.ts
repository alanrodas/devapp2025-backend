import { IService } from './IService';
import { Auto, Persona } from '../Models';
import { AutoListingDTO, PersonaListingDTO } from '../DTO';
import { AutoService } from './AutoService';
import { PersonaService } from './PersonaService';

export abstract class ServiceFactory {
    private static personaServiceSingletonInstance: IService<Persona> | undefined = undefined;
    private static autoServiceSingletonInstance: IService<Auto> | undefined = undefined;

    public static personaService(): IService<Persona> {
        if (ServiceFactory.personaServiceSingletonInstance === undefined) {
            ServiceFactory.personaServiceSingletonInstance = new PersonaService();
        }
        return ServiceFactory.personaServiceSingletonInstance;
    }

    public static autoService(): IService<Auto> {
        if (ServiceFactory.autoServiceSingletonInstance === undefined) {
            ServiceFactory.autoServiceSingletonInstance = new AutoService();
        }
        return ServiceFactory.autoServiceSingletonInstance;
    }
}
