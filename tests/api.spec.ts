import { test, expect } from '@playwright/test';
import { readExcel } from '../utils/excelReader';
import { getPokemonData } from '../utils/apiHelper';
import { hashSecret } from '../utils/hashUtil';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY!;
const hashedKey = hashSecret(secretKey);

test.describe('API Tests from Excel Data', () => {
  const filePath = 'testData/Datos-pruebas(2).xlsx'; 
  const testDataIterator = readExcel(filePath); 

  let row = testDataIterator.next(); 

  while (!row.done) {
    const [id, name, abilities] = row.value;

    test(`API Test for ${name || id}`, async ({}) => {
      // Loguea la clave secreta encriptada antes de cada test
      console.log('Hashed Secret:', hashedKey);
      const startTime = Date.now();

      
      const pokemon = await getPokemonData(id || name);

      
      if (!pokemon) {
        console.error(`No se encontraron datos para el Pokémon con id o nombre: ${id || name}`);
        return; 
      }

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(10000); 

      
      expect(pokemon.id).toBeDefined();
      expect(pokemon.name).toBeDefined();
      expect(pokemon.abilities).toBeInstanceOf(Array);

      
      expect(pokemon.id).toBe(id);
      expect(pokemon.name.toLowerCase()).toBe(name.toLowerCase());

      
      const expectedAbilities = abilities.split(',').map((ability: string) => ability.toLowerCase().trim());
      const actualAbilities = pokemon.abilities.map((abilityObj: any) => abilityObj.ability.name.toLowerCase());

      
      expect.soft(actualAbilities).toEqual(expect.arrayContaining(expectedAbilities));
      // console.log(actualAbilities)
      // console.log(expectedAbilities)
      // console.log(pokemon.id)
      // console.log(pokemon.name)
      
      const endTime = new Date();
      console.log(`Test finalizado a las: ${endTime}`);
    });

    row = testDataIterator.next();
  }
});
