1. Se aplica POM, pero podría haber cierto problema de escabilidad, en vez de tener todos los locators en el constructor (o bien aplicar page object repository), se settean en cada función.
2. Los tests web fallaban por no ser case sensitive la validación del título, lo tomo como válido dado que no se especificaba hacerlo.
3. No hay tipado apropiado: Se indica que las funciones retornan un string, pero luego retornan un string o null.
4. `getTitle`: Se podría achicar el código a:  `return titleText.trim();` y luego directamente hacer el assertion del valor del título considerando que se hace un soft assertion y luego siempre (sin importar el resultado del assertion) se toma captura pantalla.
5. `getIllustrador`: Similar a lo anterior, se podría achicar el código a:  `return titleText.trim();`.
6. Veo que se hizo un enfoque en `web.spec.ts` y otra en `api.spec.ts` al recorrer testDataIterator, ¿Por qué se tomó esta decisión?
7. api: no es necesario hacer uso de axios, se podría hacer uso directamente de Playwright: [https://playwright.dev/docs/api-testing](https://playwright.dev/docs/api-testing).
8. Mejora: hacer uso fixture para poder usar una baseUrl para la web y otra para API. Ver: [https://playwright.dev/docs/test-fixtures#fixtures-options](https://playwright.dev/docs/test-fixtures#fixtures-options). También, con el uso de fixture se podría eliminar código duplicado entre ambos archivos de test, como ser la lectura del excel y el console.log con el hash al principio, o bien el console log con la hora de finalización.
9. Mejora: hacer uso de annotations [https://playwright.dev/docs/test-annotations#tag-tests](https://playwright.dev/docs/test-annotations#tag-tests).
10. Mejora: se podría crear scripts en el `package.json`, por ejemplo, `"testWeb": "npx playwright test --grep web.spec.ts"`, entonces se podría hacer directamente `npm run testWeb` el cual es más corto y fácil de recordar.
11. API: se está validando solamente por name en vez de tener un test con name y no por id.
