import { Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

export class WikipediaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(pokemonName: string) {
    await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
  }

  // async getTitle(): Promise<string> {
  //   return this.page.title();  
  // }

  async getTitle(): Promise<string> {
    try {
      const titleLocator = this.page.locator('h1#firstHeading span.mw-page-title-main');
      const titleText = await titleLocator.textContent();

      if (titleText) {
        return titleText.trim(); // Retorna el texto con espacios en blanco eliminados
      } else {
        console.log('No se encontró el título en el elemento');
        return null;
      }
    } catch (error) {
      console.error('Error al extraer el título:', error);
      await this.page.screenshot({ path: 'error_screenshot.png', fullPage: true });
      return null;
    }
  }

  async getIllustrador(): Promise<string>  {
    try {
     
          const artistLocator = this.page.locator('tr:has(th:has-text("Designed by")) td.infobox-data');
          const artistText = await artistLocator.textContent();


      if (artistText) {
        return artistText.trim(); // Retorna el texto con espacios en blanco eliminados
      } else {
        console.log('No se encontró texto en el elemento');
        return null;
      }
    } catch (error) {
      console.error('Error al extraer el texto:', error);
      return null;
    }
  }
  async downloadImage(imagePath: string) {
    // Usa un selector específico para la imagen deseada
    const imageElement = await this.page.$('td.infobox-image img');
    if (imageElement) {
      const imageUrl = await imageElement.getAttribute('src');
  
      if (imageUrl) {
        // Convierte la URL a una URL absoluta si es relativa
        const baseUrl = this.page.url();
        const absoluteImageUrl = new URL(imageUrl, baseUrl).toString();
        console.log(`Descargando imagen desde: ${absoluteImageUrl}`); // Imprime la URL para depuración
  
        const response = await this.page.goto(absoluteImageUrl);
        if (response && response.ok()) {
          const buffer = await response.body();
  
          // Asegúrate de que el directorio exista antes de intentar guardar la imagen
          const dir = path.dirname(imagePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
  
          fs.writeFileSync(imagePath, buffer);
          console.log(`Imagen guardada en: ${imagePath}`);
        } else {
          console.log('No se pudo descargar la imagen.');
        }
      } else {
        console.log('No se encontró la URL de la imagen.');
      }
    } else {
      console.log('No se encontró el elemento de la imagen.');
    }
  }
}
