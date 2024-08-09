import { test, expect } from '@playwright/test';
import { readExcel } from '../utils/excelReader';
import { getPokemonData } from '../utils/apiHelper';
import { hashSecret } from '../utils/hashUtil';
import * as dotenv from 'dotenv';

dotenv.config();



const secretKey = process.env.SECRET_KEY!;
const hashedKey = hashSecret(secretKey);
//console.log('Hashed Secret:', hashedKey);

test.describe('API Tests from Excel Data', () => {
    const filePath = 'testData/Datos-pruebas(2).xlsx'; 
    const testDataIterator = readExcel(filePath); 
    
    let row = testDataIterator.next(); 
  
    // Recorre cada fila usando el iterador
    while (!row.done) {
      const [id, name, abilities] = row.value;
  
      test(`API Test for ${name || id}`, async ({}) => {
        console.log('Hashed Secret:', hashedKey);
  
        // Obtén los datos del Pokémon
        const pokemon = await getPokemonData(id || name);
  
        // Verifica el ID y nombre del Pokémon
        expect(pokemon.id).toBe(id);
        expect(pokemon.name).toBe(name.toLowerCase());
  
        // Asegúrate de que las habilidades sean arrays de strings
        const expectedAbilities = abilities.split(',').map((ability: string) => ability.toLowerCase().trim());
        const actualAbilities = pokemon.abilities.map((abilityObj: any) => abilityObj.ability.name.toLowerCase());
  
        // Valida que las habilidades del Pokémon contengan las habilidades esperadas
        expect.soft(actualAbilities).toEqual(expect.arrayContaining(expectedAbilities));
      });
  
      // Avanza a la siguiente fila
      row = testDataIterator.next();
    }
  });
