# 🃏 PokéDex TCG Interactiva

Una aplicación web interactiva desarrollada con **HTML5, CSS3 y JavaScript vanilla** que consume la [PokéAPI](https://pokeapi.co/) para explorar información detallada de Pokémon y guardarlos en una colección personalizada utilizando `localStorage`.

---

## Características Principales

* **Búsqueda Dinámica:** Consulta cualquier Pokémon por su nombre o número con manejo de errores asíncronos.
* **Estilo TCG (Trading Card Game):** Tarjeta principal diseñada para emular una carta coleccionable oficial con estadísticas de PS (HP), tipos y diseño metálico.
* **Gestión de Favoritos (`localStorage`):** Guarda tus Pokémon preferidos en un panel inferior persistente.
* **Validación de Duplicados:** Evita que un mismo Pokémon sea agregado múltiples veces a la colección.
* **Eliminación Individual:** Permite retirar Pokémon guardados de forma rápida desde la barra inferior.
* **Diseño Responsivo:** Adaptado completamente para computadoras, tabletas y dispositivos móviles mediante Media Queries.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5** (Estructura semántica)
* **CSS3** (Flexbox, efectos visuales modernos, diseño TCG y adaptabilidad responsive)
* **JavaScript (ES6+)** (Consumo de APIs con `async/await`, manipulación del DOM y eventos)
* **PokéAPI** (Fuente de datos oficial de Pokémon)
* **LocalStorage API** (Persistencia local de datos en el navegador)

---

## Estructura del Proyecto

```text
pokedex/
│
├── index.html          # Estructura principal de la interfaz
├── css/
│   └── style.css       # Estilos personalizados y diseño TCG responsive
├── js/
│   └── app.js          # Lógica de la aplicación, consumo de API y favoritos
└── img/
    └── International_Pokémon_logo.svg # Logotipo oficial
