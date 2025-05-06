/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';
import * as core from 'express-serve-static-core';

declare global {
    namespace Express {
        interface Request {
            readonly locals: Record<string, any>;
        }
    }
}
