

# Proyecto de Automatización Monnet

Este proyecto es un desafío de automatización que incluye pruebas de API y pruebas web utilizando Playwright y TypeScript. El desafío está estructurado para garantizar que las pruebas sean eficientes, reutilizables y sigan las mejores prácticas. El proyecto también maneja datos secretos de manera segura encriptando una clave usando SHA-256.

## Tabla de Contenidos
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
  - [Pruebas de API](#pruebas-de-api)
  - [Pruebas Web](#pruebas-web)
- [Generación de Reportes](#generación-de-reportes)
- [Consideraciones](#consideraciones)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)
- Playwright (`@playwright/test`)
- Lector de Excel (`xlsx`)

## Instalación
1. **Clona el repositorio:**
   Opción 1
   ```bash
   git clone https://github.com/diegoldszein/Challenge_Monnet.git
   cd Monnet
   ```
   Opción 2
   Seguir los pasos de este video:
   https://www.youtube.com/watch?v=ILJ4dfOL7zs
   

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

## Configuración
1. **Variables de Entorno:**
   Colocar la clave en el archivo `.env` , copiar del ejemplo .env.example
   

## Ejecución de Pruebas

### Pruebas de API
Las pruebas de API obtienen datos de Pokémon desde la PokeAPI utilizando IDs o nombres del archivo de Excel (`Datos-pruebas.xlsx`). La clave secreta encriptada se registra antes de cada prueba.

Para ejecutar las pruebas de API:
```bash
npx playwright test --grep "api.spec.ts"
```

### Pruebas Web
Las pruebas web validan información en las páginas de Wikipedia de Pokémon utilizando los nombres del archivo de Excel. La clave secreta encriptada se registra antes de cada prueba.

Para ejecutar las pruebas web:
```bash
npx playwright test --grep "web.spec.ts"
```
### Ambas Pruebas en paralelo
Para ejecutar ambas pruebas en paralelo:
```bash
npx playwright test 
```

## Generación de Reportes
Después de ejecutar las pruebas, se genera automáticamente un reporte en formato HTML.

Para ver el reporte:
```bash
npx playwright show-report 
```

## Consideraciones
- **Manejo de Clave Secreta:** La clave secreta se encripta de manera segura usando SHA-256 y se registra en formato encriptado antes de cada prueba.
- **Manejo del Archivo Excel:** Las pruebas leen directamente desde el archivo Excel para evitar la duplicación de datos.
- **Validaciones en Pruebas Web:** Las pruebas web validan el título de la página, registran el nombre del ilustrador y aseguran que las imágenes descargadas cumplan con los criterios especificados.

## Estructura del Proyecto
- `tests/`: Contiene todos los archivos de pruebas (API y web).
- `utils/`: Funciones de utilidad para leer archivos Excel, encriptar claves y realizar interacciones con la API.
- `images/`: Carpeta donde se guardan las imágenes descargadas.
- `testData/`: El archivo Excel `Datos-pruebas.xlsx` utilizado para las pruebas.

