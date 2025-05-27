import mongoose, { Schema } from 'mongoose';
import { Temporal } from 'temporal-polyfill';
import { Genero, Persona } from '../../../Models';

const PersonaSchema = new Schema<Persona>({
    dni: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaDeNacimiento: {
        type: String,
        required: true,
        get: (val: string): Temporal.PlainDate => {
            const parts = val.split('-').map((e) => Number(e));
            return new Temporal.PlainDate(parts[0], parts[1], parts[2]);
        },
        set: (val: Temporal.PlainDate): string => {
            return `${val.year}-${val.month}-${val.day}`;
        }
    },
    genero: {
        type: String,
        required: true,
        enum: [Genero.masculino, Genero.femenino, Genero.noBinario]
    },
    esDonanteDeOrganos: {
        type: Boolean,
        default: false
    },
    // Relationships
    autos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'AutoMongoModel'
        }
    ]
});

export const PersonaMongoModel = mongoose.model('PersonaMongoModel', PersonaSchema);
