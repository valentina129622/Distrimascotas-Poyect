# 🐾 Distrimascotas – Sistema de Gestión Comercial

## Descripción del Proyecto
Distrimascotas es un sistema web desarrollado como prototipo funcional para la gestión comercial de una tienda de mascotas.  
El sistema permite administrar el **catálogo de productos**, **inventario**, **ventas**, **fidelización de clientes** y **reportes**, integrando los diferentes módulos de forma sincronizada.

El proyecto fue desarrollado como parte de una actividad académica, aplicando buenas prácticas de ingeniería de software, pruebas de calidad y despliegue público.

---

## Objetivo del Sistema
Desarrollar un prototipo funcional que permita:
- Gestionar productos y stock.
- Registrar ventas y clientes.
- Aplicar un sistema básico de fidelización.
- Visualizar reportes de ventas.
- Sincronizar los módulos mediante una única fuente de datos.

---

## Módulos del Sistema
El sistema está compuesto por los siguientes módulos:

- **Home (Catálogo):**
  - Visualización del catálogo general.
  - Sincronización automática con el inventario.
  - Búsqueda de productos.

- **Inventario:**
  - Registro, edición y eliminación de productos.
  - Control de stock.
  - Indicadores de estado (stock disponible / bajo).

- **Ventas y Fidelización:**
  - Registro de clientes.
  - Registro de ventas.
  - Cálculo de fidelización mediante puntos y estrellas.
  - Persistencia de datos entre módulos.

- **Reportes:**
  - Visualización de reportes de ventas.
  - Indicadores de desempeño.
  - Exportación conceptual a PDF y Excel.

---

## Arquitectura del Software
El sistema sigue una **arquitectura por capas**, organizada de la siguiente manera:

- **Capa de Presentación:** HTML5 y CSS3.
- **Capa de Lógica:** JavaScript.
- **Capa de Persistencia:** `localStorage` del navegador.

Esta arquitectura permite una correcta separación de responsabilidades y facilita el mantenimiento y escalabilidad del sistema.

---

## Patrones de Diseño Aplicados
- **Singleton:** Uso de `localStorage` como única fuente de verdad para inventario y clientes.
- **Observer (implícito):** El módulo Home se actualiza automáticamente al detectar cambios en el inventario.
- **Factory (conceptual):** Creación dinámica de tarjetas de productos mediante JavaScript.

---

## Pruebas de Software
Se realizaron pruebas de calidad a nivel de:

- Pruebas Unitarias.
- Pruebas de Integración.
- Pruebas de Sistema.
- Pruebas de Aceptación.
- Pruebas de Caja Blanca, Negra y Gris.
- Pruebas Funcionales y No Funcionales.

Los resultados de las pruebas se documentan en el informe final del proyecto.

---

## Despliegue
El sistema se encuentra desplegado públicamente utilizando en Vercel

## Repositorio
Este repositorio contiene todo el código fuente del proyecto, organizado en carpetas por tipo de recurso:

```text
css/        → Estilos del sistema
js/         → Lógica del sistema
imagenes/   → Recursos gráficos
