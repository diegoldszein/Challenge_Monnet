import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../pageObjects/wikipediaPage';
import { readExcel } from '../utils/excelReader';
import { hashSecret } from '../utils/hashUtil';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY!;
const hashedKey = hashSecret(secretKey);
console.log('Hashed Secret:', hashedKey);

test.describe('Web Tests from Excel Data', () => {
  const filePath = 'testData/Datos-pruebas(2).xlsx'; 
  const testDataIterator = readExcel(filePath); 

  for (let row of testDataIterator) {
    const [id, name] = row;

    test(`Web Test for ${name || id}`, async ({ page }, testInfo) => {
      const wikipediaPage = new WikipediaPage(page);
      console.log('Hashed Secret:', hashedKey);

      
      await wikipediaPage.navigateTo(name);

      
      const titleText = await wikipediaPage.getTitle();
      expect(titleText).not.toBeNull();
      expect.soft(titleText).toContain(`${name}`);
      await testInfo.attach('titulo',{
        body: await page.screenshot({ path: 'screenshots/error_screenshot.png', fullPage: true }),
        contentType: 'image/png'
      })
      ;

      
      const artistText = await wikipediaPage.getIllustrador();

      if (artistText) {
        console.log('Artista encontrado:', artistText);
      } else {
        console.log('Artista no encontrado');
      }

      // Define la ruta donde se guardará la imagen
      const imagesDir = path.join(__dirname, '../images');
      const imageFilePath = path.join(imagesDir, `${name}.png`);

      // Descarga la imagen
      await wikipediaPage.downloadImage(imageFilePath);

      // Validaciones de la imagen
      expect(imageFilePath).toMatch(/\.(jpg|jpeg|png|svg)$/i);
      const fileSize = fs.statSync(imageFilePath).size;
      expect(fileSize).toBeLessThan(500000); // Menos de 500 KB
    });
  }
});

