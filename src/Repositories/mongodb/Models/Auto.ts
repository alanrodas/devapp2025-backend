import mongoose, { Schema } from 'mongoose';
import { Auto } from '../../../Models';

const AutoSchema = new Schema<Auto>({
    patente: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    anho: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    nroChasis: {
        type: String,
        required: true
    },
    nroMotor: {
        type: String,
        required: true
    },
    // Relationships
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'PersonaMongoModel'
    }
});

export const AutoMongoModel = mongoose.model('AutoMongoModel', AutoSchema);
