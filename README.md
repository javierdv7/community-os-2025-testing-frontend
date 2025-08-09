# Pruebas de software para Frontend

**Objetivo**

Aprender conceptos y técnicas profesionales de pruebas de software resolviendo ejercicios incrementales.
Nuestro caso de uso será en el contexto de una aplicación Frontend.

**Descripción**

Vamos a comenzar desde las pruebas unitarias y llegareremos hasta las pruebas de extremo a extremo (end-to-end o e2e) con herramientas multi navegador e integradas con Visual Studio Code. 
Además, a medida que implementamos las pruebas, utilizaremos técnicas y metodologías que nos permitirán realizar pruebas de manera profesional y enfocado en buenas prácticas.

** Análisis de caso: Sitio web inscripción evento **


## Fundamentos de pruebas de software

En el desarrollo de software, escribir código que funcione no es suficiente.
Es necesario asegurarse de que el programa hace exactamente lo que se espera en diferentes situaciones. Para eso existen las pruebas de software.

Probar un software significa ejecutar partes del programa, observar los resultados y compararlos con lo que debería suceder.
El objetivo principal es detectar errores antes de que el software llegue al usuario final y asegurar que cumple con los requisitos.

Existen distintos tipos de pruebas, pero las más básicas son las pruebas unitarias, que verifican el funcionamiento de una pequeña parte del código, como una función o un método.
Estas pruebas ayudan a identificar problemas temprano y facilitan el mantenimiento del sistema.

Para organizarlas de forma clara, se usa frecuentemente el patrón AAA (Arrange, Act, Assert), que veremos a continuación.

### Definición y patrón AAA

En el ámbito del desarrollo de software, una prueba de software es un procedimiento controlado que permite verificar si una parte del programa cumple con las expectativas establecidas en su especificación.
Las pruebas tienen como objetivo principal detectar defectos antes de que el producto llegue al usuario final, reduciendo costos y aumentando la calidad.

Entre las diversas técnicas y estructuras que se utilizan para organizar las pruebas, una de las más comunes es el patrón AAA, que corresponde a las siglas de:

#### Arrange (Preparar)
En esta fase se definen las condiciones iniciales necesarias para ejecutar la prueba.
Esto incluye la preparación de datos de entrada, la configuración del entorno y cualquier inicialización previa necesaria.
Por ejemplo, si queremos probar una función que calcula descuentos, en este paso decidimos con cuántos días de anticipación haremos la compra y cuál sería el descuento esperado.

#### Act (Actuar)
Aquí se ejecuta la acción que se desea probar.
Generalmente consiste en llamar a la función o método en cuestión con los datos preparados en la fase anterior.
Continuando con el ejemplo del cálculo de descuentos, en esta fase llamaríamos a calculateDiscount() pasándole la cantidad de días de anticipación.

#### Assert (Afirmar/Verificar)
En esta fase se comparan los resultados obtenidos en la ejecución contra los resultados esperados.
Si el valor devuelto por la función coincide con lo esperado, la prueba se considera exitosa; en caso contrario, se registra como fallida.
Por ejemplo, si la función retorna 20 y el valor esperado era 20, la prueba pasa.

El patrón AAA fomenta la claridad y legibilidad en las pruebas, ya que separa de forma lógica la preparación, la ejecución y la verificación, evitando que el código de prueba se convierta en un bloque poco comprensible.

---
### Ejercicio 1: Implementa una prueba unitaria

**Objetivo:** Escribir 2 pruebas unitarias para una función que calcula un descuento en base a la diferencia de días que hay entre la fecha del evento y la fecha actual.

Agrega un archivo que implemente la funcionalidad (`calculateDiscount.js`) y otro para las pruebas (`calculateDiscount.test.js`).

**src/calculateDiscount.js**

```javascript
export function calculateDiscount(daysDiff) {
  if (daysDiff > 15) {
    return 30;
  } else if (daysDiff >= 3 && daysDiff <= 15) {
    return 15;
  } else if (daysDiff >= 0 && daysDiff < 3) {
    return 0;
  } else {
    return -1;
  }
}
```
La función recibe la cantidad de dias de diferencia y las reglas son las siguientes:

Reglas del cálculo de descuento:

- Si faltan más de 15 días para el evento → 30% de descuento.
- Si faltan entre 3 y 15 días → 15% de descuento.
- Si faltan entre 0 y 2 días → 0% de descuento.
- Si el número de días es negativo → -1 (valor inválido).

**tests/calculateDiscount.test.js**(borrador)

```javascript
// importa la función calculateDiscount usando ESM Modules 
import {} from ''

// Caso donde la diferencia es más de 15 días
function testCase1(){
  // ARRANGE: Declara variables daysDiff y expectedResult

  // ACT: Ejecuta la función calculateDiscount con la variable daysDiff. guarda el resultado en result

  // ASSERT
  if (result === expected) {
    console.log("✅ Test Case 1 passed");
  } else {
    console.error(`❌ Test Case 1 failed: expected ${expected}, got ${result}`);
  }
}

// Caso donde la diferencia es entre 3 y 15 días
function testCase2(){
  //Implementa igual que en test case 1
}

//Ejecución de casos
testCase1()
testCase2()
```

Ejecuta el archivo de pruebas usando NodeJS.

```bash
node tests/calculateDiscount.test.js
```

---

## Implementación de pruebas de software FIRST

En el capítulo anterior vimos cómo hacer una prueba unitaria sin framework, usando funciones y if/else.
Este método funciona, pero tiene limitaciones:

- Hay que escribir mucho código repetido.
- No tenemos un reporte estructurado de los resultados.
- No podemos integrar fácilmente estas pruebas a un flujo automatizado.

Para mejorar, debemos seguir buenas prácticas y usar herramientas adecuadas.
Las buenas pruebas de software suelen cumplir con las características del acrónimo FIRST

Las pruebas buenas tienen estas cinco características:

**F (Fast) – Rápidas:**
Se hacen muy rápido para que no tarden y puedas correrlas siempre.

**I (Independent) – Independientes:**
Cada prueba funciona sola, sin depender de otra.

**R (Repeatable) – Repetibles:**
Si haces la prueba muchas veces, siempre da el mismo resultado.

**S (Self-validating) – Auto-validadas:**
La prueba te dice sola si pasó o falló, sin que tengas que revisar.

**T (Timely) – A tiempo:**
Se hacen al mismo tiempo que escribes el código, para encontrar errores rápido.

Un framework como Vitest (o Jest, Mocha, etc.) actúa como un Test Runner y nos ayuda a cumplir con FIRST porque:

- Ejecuta todas las pruebas automáticamente, sin que tengamos que llamarlas una por una.
- Organiza los resultados con nombres descriptivos y estados claros (✅ / ❌).
- Permite matchers expresivos (expect(result).toBe(expected)), que son más claros que if/else.
- Soporta cobertura de código para saber qué partes del programa han sido probadas.
- Integra la ejecución de pruebas con herramientas de CI/CD.

### Escribir pruebas de software 

Cuando usamos un framework para pruebas, podemos organizar los tests usando dos palabras clave:

`describe()` para agrupar pruebas que son parecidas o del mismo tema.

`it()` para escribir una prueba específica que verifica algo puntual.

Esto ayuda a que las pruebas sean más ordenadas y fáciles de entender.

```javascript
import { describe, it } from 'vitest';

describe('Nombre del grupo de pruebas', () => {
  it('Descripción de la prueba 1', () => {
    // Aquí va el código de la prueba 1
  });

  it('Descripción de la prueba 2', () => {
    // Aquí va el código de la prueba 2
  });
});
```

Con Vitest, podemos usar matchers, que son funciones que comparan valores y generan mensajes automáticos de éxito o error.

Por ejemplo, el mismo test se puede escribir así:

```javascript
import { expect } from 'vitest';

expect(result).toBe(expected);
```

Esto simplifica mucho el código y hace que los reportes sean claros y fáciles de interpretar.

Puedes revisar más matchers y ejemplos en la [documentación oficial de Vitest](https://vitest.dev/api/expect.html#tobe)

### Ejecución de pruebas con Vitest 
Instala Vitest y el paquete oficial para cobertura usando V8:

```bash
npm install --save-dev vitest @vitest/coverage-v8
```

### Cobertura

La cobertura de código es una métrica que indica qué porcentaje del código fuente fue ejecutado al correr las pruebas.
En otras palabras, nos dice qué partes del programa fueron realmente probadas.

¿Por qué es importante la cobertura?
Nos ayuda a identificar qué líneas o funciones no están siendo probadas, para poder escribir pruebas que las cubran.

Aumentar la cobertura generalmente mejora la calidad y confiabilidad del software, porque reduce la posibilidad de que haya errores escondidos.

Sirve como guía para que los desarrolladores no olviden probar partes importantes del código.

```bash
 PASS  tests/calculateDiscount.test.js
  calculateDiscount
    ✓ devuelve 30 cuando faltan más de 15 días (5 ms)
    ✓ devuelve 15 cuando faltan entre 3 y 15 días (2 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 src      |     100 |      100 |     100 |     100 |                   
  calculateDiscount.js | 100 | 100      | 100     | 100     |                   
----------|---------|----------|---------|---------|-------------------

Test Files 2 passed (2 total)
Tests       2 passed (2 total)
Snapshots   0 total
Time        0.68s
```

- File: Archivo o carpeta analizada.

- % Stmts (Statements): Porcentaje de sentencias ejecutadas durante las pruebas.

- % Branch (Ramas): Porcentaje de caminos alternativos (como en if o switch) que fueron recorridos.

- % Funcs (Funciones): Porcentaje de funciones llamadas.

- % Lines (Líneas): Porcentaje de líneas de código ejecutadas.

- Uncovered Line #s: Números de línea donde el código no fue ejecutado durante las pruebas.

---
### Ejercicio 2: Instala y configura un Test Runner

- Usa las instrucciones señaladas para instalar vitest y el reporte de cobertura, y el comando de ejecución `npm test`.
- Cambia el archivo `tests/calculateDiscount.test.js` para que utilize `describe`,`it` y `expect` agregando al inicio del test lo siguiente:

```javascript
import { describe, it, expect } from 'vitest';
```

- Asegura que tus pruebas siguen ejecutandose sin problemas
---

### Principios de las pruebas de software

- Encontrar errores, no demostrar perfección → El testing confirma que hay fallos, no que el software sea perfecto.
- No se puede probar todo → Hay que elegir qué probar.
- Probar pronto es mejor → Detectar fallos antes ahorra tiempo y dinero.
- Los fallos se concentran → Unas pocas partes suelen tener la mayoría de los defectos.
- Depende del contexto → No se prueba igual un banco que un videojuego.
- Sin errores no significa que funcione → Puede estar libre de fallos, pero no cumplir lo que el usuario necesita.
- Planificar y controlar el testing → Hay que definir qué, cómo, cuándo y con qué criterios se probará.

## Pruebas de Integración para Frontend

### Implementación de aplicación Frontend

En esta sección construiremos una aplicación frontend sencilla usando tecnologías modernas y librerías populares.

Tecnologías y librerías a usar**

- **Vite** como herramienta de desarrollo rápida.
- **Bootstrap** para estilos y diseño responsivo.
- **Leaflet** para mostrar mapas interactivos.
- **date-fns** para manejo de fechas.

Para comenzar, crea un proyecto con Vite en modo desarrollo:

```bash
npm install --dev vite
```

Luego instala las dependencias necesarias:
```bash
npm install bootstrap leaflet date-fns
```

**src/styles.css**

```css
:root {
  --bs-body-bg: #121212;
  --bs-body-color: #f8f9fa;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
}
#map {
  min-height: 300px;
}
```

**src/calculateDiscount.js**
```javascript
import { differenceInCalendarDays, isAfter, isValid } from 'date-fns';

/**
 * Calculates the discount percentage based on the current date and the event date.
 * @param {Date} today - Current date.
 * @param {Date} eventDate - Date of the event.
 * @returns {number} Discount percentage: 30, 15, 0, or -1 if outside the valid registration period.
 */
export function calculateDiscount(today, eventDate) {
  if (!isValid(today) || !isValid(eventDate)) {
    throw new Error('Parameters must be valid Date objects');
  }

  const daysDiff = differenceInCalendarDays(eventDate, today);

  if (daysDiff > 15) {
    return 30; // early registration discount
  } else if (daysDiff >= 3 && daysDiff <= 15) {
    return 15; // mid registration discount
  } else if (daysDiff >= 0 && daysDiff < 3) {
    return 0; // late registration, no discount
  } else {
    return -1; // outside valid registration period
  }
}

/**
 * Retorna el mensaje de descuento según la fecha actual y fecha del evento
 * @param {Date} today 
 * @param {Date} eventDate 
 * @returns {string} Mensaje para mostrar en el formulario
 */
export function getDiscountMessage(today, eventDate) {
  const discount = calculateDiscount(today, eventDate);

  if (discount > 0) {
    return `¡Aprovecha un ${discount}% de descuento por inscripción anticipada!`;
  }
  if (discount === 0) {
    return 'Últimos días para inscribirte, sin descuento.';
  }
  return 'El periodo de inscripción ha finalizado.';
}
```

**src/main.js**

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { initMap } from './map.js';
import { initForm } from './formHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initForm();
});

```

**src/map.js**

```javascript
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function initMap() {
  const map = L.map('map').setView([-33.4314, -70.6281], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([-33.4314, -70.6281])
    .addTo(map)
    .bindPopup('Ubicación del evento')
    .openPopup();
}
```

**src/formHandler.js**
```javascript
import { getDiscountMessage } from './calculateDiscount.js';
import { startOfDay, parseISO, format } from 'date-fns';

export function initForm() {
  const form = document.getElementById('eventForm');
  const discountMessage = document.getElementById('discountMessage');

  // Definimos la fecha del evento con parseISO para evitar confusiones
  const eventDate = parseISO('2025-08-20'); // formato YYYY-MM-DD
  const eventDateSpan = document.getElementById('eventDate');

  try {
    const today = startOfDay(new Date());
    discountMessage.textContent = getDiscountMessage(today, eventDate);
    eventDateSpan.textContent = format(eventDate, 'dd/MM/yyyy')

    if (discountMessage.textContent === 'El periodo de inscripción ha finalizado.') {
      form.querySelector('button[type="submit"]').disabled = true;
    }
  } catch (error) {
    discountMessage.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name && email) {
      alert(`¡Gracias por inscribirte, ${name}!`);
      form.reset();
    }
  });
}
```

finalmete tu sección `scripts` del archivo `package.json` debe verse así:

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run --coverage"
  },
```
Ejecuta `npm run dev` y valida que la aplicación se está ejecutando.

### JSDOM para simulación de browser

Cuando escribimos pruebas para código frontend que manipula el DOM (como formularios, eventos o elementos HTML), necesitamos un entorno que simule un navegador web.

JSDOM es una biblioteca que crea una simulación ligera del DOM en Node.js, permitiendo ejecutar y probar código frontend sin abrir un navegador real.

**vitest.config.js**

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',  // Simula el entorno de navegador
  },
});
```

### Integración del código Frontend con las pruebas

Cuando probamos código que trabaja con la página web (el DOM), como formularios o botones, ese código puede cambiar el contenido de la página.

Si hacemos varias pruebas seguidas, el resultado de una prueba puede afectar a la siguiente porque la página ya no está igual que al principio.

Esto puede hacer que las pruebas den resultados erróneos o confusos.

**¿Cómo evitamos ese problema?**
Usamos la función `beforeEach()` para volver a cargar y preparar la página desde cero antes de cada prueba.

Así nos aseguramos que cada prueba empieza con la misma página limpia, sin cambios de pruebas anteriores.

```javascript
import fs from 'fs'
import path from 'path'
import { initForm } from '../src/formHandler.js';

describe('Grupo de pruebas', () => {
  beforeEach(() => {
    // Cargar el HTML original para tener la página limpia
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')

    // Poner el HTML en el documento simulado (JSDOM)
    document.documentElement.innerHTML = html;

    // Inicializar el código que maneja el formulario o la página
    initForm();
  });

  it('prueba 1', () => {
    // Aquí el DOM está limpio y listo para probar
  });

  it('prueba 2', () => {
    // Otra prueba que también empieza desde cero
  });
});
```

#### Eventos del navegador en pruebas de software

Cuando nuestro código frontend usa addEventListener para escuchar eventos, por ejemplo el envío de un formulario (submit), en las pruebas necesitamos simular que ese evento sucede para verificar cómo responde nuestro código.

**¿Cómo simulamos un evento?**
Creamos un evento con `new Event('nombreDelEvento')` y luego lo enviamos al elemento con `dispatchEvent`. Por ejemplo:

```javascript
const event = new Event('submit');
document.getElementById('IdForm').dispatchEvent(event);
```

Esto hace que el formulario "crea" que fue enviado, y ejecuta el código que tenemos asociado al evento submit.

---
### Ejercicio 3: Ejecuta Vitest con jsdom

- Re-escribe las pruebas para las nuevas funciones del archivo `tests/calculateDiscount.test.js`

```javascript
import { parseISO } from 'date-fns';

const eventDate = parseISO('2025-08-20');
```

- Crea una prueba de integración para el envío del formulario usando `beforeEach` para incluir el html y usa `formInit()` para configurar el formulario antes de las pruebas.

- En la etapa de preparación (Arrange) de la prueba usa algo similar a lo siguiente:

```javascript
document.getElementById('name').value = 'NombreUsuario';
document.getElementById('email').value = 'NombreUsuario@email.com';
```

- En la etapa de ejecución (Act) despacha el evento `submit` para poder simular el envío.

- Valida lo siguiente en la etapa de Aserción:
  - Los campos del formulario quedaron vacíos
  - el elemento con Id `discountMessage` tiene el mensaje indicado
--


## Dobles de prueba


### Código no determinista
En nuestro código, el mensaje de descuento depende de la fecha actual `(new Date())`. Esto hace que el resultado cambie con el tiempo, es decir, el comportamiento es no-determinista.

Esto es malo para las pruebas porque:

- Una prueba que pase hoy, puede fallar mañana si la fecha actual cambia y el mensaje esperado es distinto.
- Hace que las pruebas no sean confiables ni repetibles.
- Dificulta detectar errores reales cuando fallan las pruebas.


Para resolver esto usamos los fake timers de Vitest para controlar la "fecha actual" en las pruebas y hacerlas deterministas.

```javascript
import { vi } from 'vitest';
import { parseISO } from 'date-fns';

vi.useFakeTimers();
vi.setSystemTime(parseISO('2025-07-01'));
```

Esto fuerza al código que usa new Date() a usar la fecha que definimos, manteniendo el resultado constante. Lo podemos usar en el momento de hacer la preparación de la prueba.


### Espías

En pruebas, a veces queremos verificar si una función externa se llamó y con qué argumentos, sin que se ejecute su comportamiento real.

Un espía (spy) es un tipo de doble de prueba que:

Observa las llamadas a una función existente.

Permite controlar su comportamiento si queremos (mock).

Nos ayuda a validar interacciones sin efectos secundarios.

Por ejemplo, para espiar window.alert usamos:

```javascript
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
```

Esto reemplaza temporalmente alert con una función que no muestra nada, pero registra si se llamó y con qué argumentos.

Luego, para validar que alert se llamó con el mensaje correcto según el escenario ARRANGE, usamos el matcher:

```javascript
expect(alertSpy).toHaveBeenCalledWith('Mensaje esperado');
```

Esto comprueba que la función fue llamada al menos una vez con exactamente ese texto.

---
### Ejercicio 4: Mejoras en las pruebas de integración

- Agrega una fecha fija para la prueba de envío exitoso del formualario usando los fake timers de Vitest
- Agrega un espía para la función `window.alert` y valida una vez enviado el formulario, el alert es invocado con el mensaje que corresponde.

---

## Pruebas de extremo a extremo (E2E)

Las pruebas de extremo a extremo (E2E) verifican que una aplicación funcione correctamente desde el punto de vista del usuario final.
Se prueban todos los componentes juntos, simulando la interacción real en el navegador: cargar páginas, hacer clic, completar formularios, navegar y verificar resultados visibles.

Este tipo de pruebas asegura que la aplicación completa, incluyendo frontend, backend y cualquier integración, funcione como se espera.


### Playwright para pruebas E2E

Playwright es una herramienta moderna y poderosa para automatizar navegadores y realizar pruebas E2E.

Sus ventajas principales son:

- Soporta múltiples navegadores (Chromium, Firefox, WebKit).
- Permite escribir pruebas confiables y rápidas.
- Facilita la automatización de flujos complejos con API sencilla.
- Cuenta con herramientas para grabar y depurar tests.

Instalación y configuración básica
Para instalar Playwright en tu proyecto, ejecuta:


```bash
npm install --save-dev @playwright/test
```

Luego, instala los navegadores que Playwright usa:

```bash
npx playwright install
```

### Implementar pruebas E2E con Playwright

Crea una carpeta `tests/e2e` en tu proyecto.

Dentro, crea archivos `.spec.js` o `.test.js` para tus pruebas.

Ejemplo mínimo:

```javascript
import { test, expect } from '@playwright/test';

test('la página carga y muestra título', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Mi Aplicación/);
});
```

Agrega estos scripts a `package.json`.

```json
"preview": "vite preview",
"test:e2e": "playwright test"
```

y finalmente agrega en la raíz el archivo `playwright.config.js`

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4173', // Cambia según el puerto de tu servidor Vite
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
  ],
});
```

### Ejercicio 5: Escribe pruebas para la aplicación

- Sigue los pasos anteriores y asegurate de poder correr las pruebas e2e con el comando `npm run test:e2e`

- Implementa lo siguiente y analiza cada una de las funciones


```javascript
import { test, expect } from '@playwright/test';

test.describe('Event registration app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // URL donde corre tu app Vite
  });

  test('should show discount message on load', async ({ page }) => {
    const discountMessage = await page.locator('#discountMessage').textContent();
    expect(discountMessage).toMatch(/descuento/);
  });

  test('should allow user to fill and submit the form', async ({ page }) => {
    await page.fill('#name', 'Gonzalo');
    await page.fill('#email', 'gonzalo@example.com');

    // Escuchar alert
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Gracias');
      dialog.accept();
    });

    await page.click('button[type="submit"]');

    // Verificar que el form se haya reseteado
    expect(await page.inputValue('#name')).toBe('');
    expect(await page.inputValue('#email')).toBe('');
  });

  test('should display map container', async ({ page }) => {
    const map = page.locator('#map');
    await expect(map).toBeVisible();
  });
});
```

- Ejecuta las pruebas para más navegadores siguiendo las intrucciones descritas [en esta página](https://playwright.dev/docs/test-projects)


¡Éxito!
