# VMetrix QA Automation Challenge

Framework de automatización de pruebas desarrollado con Playwright y TypeScript, cubriendo pruebas UI y API.

## Tecnologías

- Playwright
- TypeScript
- Node.js

## Estructura del proyecto

ChallengeVmetrix/
├── api/                  # Clases de consumo de API
│   ├── ApiBase.ts
│   ├── ProductsApi.ts
│   ├── UsersApi.ts
│   ├── AuthApi.ts
│   └── CartsApi.ts
├── pages/                # Page Objects
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductDescriptionPage.ts
├── tests/
│   ├── ui/               # Tests de interfaz
│   └── api/              # Tests de API
├── .env                  # Variables de entorno (no incluido en el repo)
├── playwright.config.ts
└── README.md

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
npx playwright install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

BASE_URL_UI=your_ui_base_url
BASE_URL_API=your_api_base_url
SAUCEDEMO_USERNAME=your_username
SAUCEDEMO_PASSWORD=your_password
AUTH_USERNAME=your_auth_username
AUTH_PASSWORD=your_auth_password

## Ejecución de tests

Correr todos los tests:
```bash
npx playwright test
```

Correr solo tests UI:
```bash
npx playwright test tests/ui
```

Correr solo tests API:
```bash
npx playwright test tests/api
```

Correr en modo visual:
```bash
npx playwright test --headed
```

## Ver reporte

```bash
npx playwright show-report
```

## Aplicaciones bajo prueba

**UI:** https://www.saucedemo.com  
**API:** https://dummyjson.com

## Casos de prueba UI

| Test | Descripción |
|------|-------------|
| TestAddToCartAndCheckout | Agrega 3 productos al carrito y completa el checkout validando el total |
| TestRemoveFromCart | Agrega 3 productos y los elimina validando que el carrito quede vacío |
| TestCheckoutValidation | Valida que no se pueda avanzar en el checkout sin datos obligatorios |
| TestSortProducts | Valida el ordenamiento de productos por precio ascendente y descendente |
| TestProductDetail | Valida el detalle de un producto, imagen, descripción y funcionalidad de carrito |

## Casos de prueba API

| Test | Descripción |
|------|-------------|
| TestProducts | GET de productos con paginación validando limit, skip y total |
| TestProductsCRUD | Creación, actualización y eliminación de productos |
| TestAuth | Login exitoso y negativo con validación de token |
| TestUsers | Ordenamiento de usuarios ascendente y descendente por apellido |
| TestE2E | Flujo completo creando producto, usuario y carrito |