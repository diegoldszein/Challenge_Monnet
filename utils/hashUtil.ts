import * as dotenv from 'dotenv';
import { createHash } from 'crypto';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error('SECRET_KEY no está definida. Asegúrate de que la variable de entorno esté configurada correctamente.');
}

export function hashSecret(secret: string): string {
  if (typeof secret !== 'string') {
    throw new TypeError('El argumento "secret" debe ser de tipo string.');
  }
  return createHash('sha256').update(secret).digest('hex');
}


const hashedKey = hashSecret(secretKey);
console.log('Hashed Secret:', hashedKey);

