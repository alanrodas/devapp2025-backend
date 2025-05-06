// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import process from 'process';
import { RequestWithLocals, ErrorCatching, ResponseInterceptor, ResponseSender } from './Middlewares';
import { AutoRouter, PersonaRouter } from './Routers';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

/********** MIDDLEWARE EXTERNOS *************/
app.use(cors());
app.use(helmet());
app.use(express.json());
/******** FIN MIDDLEWARE EXTERNOS ***********/

/*********** MIDDLEWARES PROPIOS *************/
app.use(ResponseInterceptor);
// Todo envío al cliente, no corta inmediatamente,
// sino que solo se envía al final, cuando se llama al ResponseSender.
// Por lo que siempre hay que llamar a next();
app.use(RequestWithLocals);
/********* FIN MIDDLEWARES PROPIOS **********/

/*************** ENDPOINTS ******************/
app.use('/personas', PersonaRouter());
app.use('/autos', AutoRouter());
/*************** FIN ENDPOINTS ******************/

/************** ERROR HANDLING ******************/
app.use(ErrorCatching);
// Recién acá se envía posta.
app.use(ResponseSender);
/************ FIN ERROR HANDLING ***************/

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
