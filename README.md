# 🏫 Laboratorios INSUCO

## 📌 Descripción del proyecto

**Laboratorios INSUCO** es un sitio web informativo desarrollado para el **Liceo INSUCO de Valparaíso**, con el propósito de centralizar y facilitar el acceso a la información de los laboratorios de computación del establecimiento.

El proyecto nace a partir de la necesidad de contar con un espacio donde estudiantes y profesores puedan consultar de manera rápida información como la **ubicación de cada laboratorio, cantidad de computadores, sistemas operativos, horarios y disponibilidad**.

Además de entregar información general, el sitio incorpora funcionalidades interactivas que permiten mantener actualizada la disponibilidad de los laboratorios mediante una conexión con **Firebase**, permitiendo que los usuarios autorizados puedan modificar su estado.

El sitio se encuentra publicado en Internet mediante **Netlify** y su código fuente está almacenado en **GitHub**.

🌐 **Sitio web:**
https://laboratorios-insuco.netlify.app/

---

## 🎯 Objetivo del proyecto

El objetivo principal es desarrollar una plataforma web que permita **organizar y entregar información sobre los laboratorios de computación del Liceo INSUCO de manera clara, rápida y accesible**.

La plataforma busca mejorar el acceso a esta información y facilitar la gestión de la disponibilidad de los laboratorios para la comunidad educativa.

### Objetivos específicos

* Centralizar la información de los laboratorios.
* Mostrar la ubicación de cada laboratorio dentro del establecimiento.
* Informar la cantidad de computadores disponibles en cada laboratorio.
* Mostrar los sistemas operativos utilizados.
* Informar los horarios de funcionamiento.
* Mostrar si un laboratorio se encuentra disponible u ocupado.
* Permitir que profesores autorizados actualicen la disponibilidad.
* Incorporar un mapa interactivo para facilitar la ubicación de los laboratorios.
* Proporcionar un medio de contacto para los usuarios.
* Crear una plataforma accesible desde computadores y dispositivos móviles.

---

## 💡 ¿En qué consiste el proyecto?

El proyecto consiste en una **página web informativa e interactiva sobre los laboratorios del establecimiento**.

Al ingresar al sitio, el usuario puede navegar por diferentes secciones donde se presenta la información de los laboratorios y del proyecto.

La idea principal es que, en vez de tener la información dispersa o depender de consultas presenciales, los usuarios puedan encontrarla directamente desde una plataforma web.

Por ejemplo, un estudiante o profesor puede ingresar al sitio y consultar:

```text
¿Qué laboratorios existen?
        ↓
¿Dónde están ubicados?
        ↓
¿Cuántos computadores tienen?
        ↓
¿Qué sistema operativo utilizan?
        ↓
¿Cuál es su horario?
        ↓
¿Está disponible actualmente?
```

De esta manera, el sitio funciona como un **punto central de información para los laboratorios del liceo**.

---

# 🧩 Principales secciones del sitio

## 🏠 Inicio

La página principal presenta el proyecto y explica brevemente su finalidad.

Desde esta sección el usuario puede acceder directamente a la información de los laboratorios mediante el botón **“Explorar Laboratorios”**.

También contiene enlaces hacia las principales secciones del sitio.

---

## 💻 Laboratorios

Esta es la sección principal del proyecto.

En ella se muestran los laboratorios registrados en el sistema y la información correspondiente a cada uno.

Actualmente se trabajan **5 laboratorios**.

Para cada laboratorio se muestra información como:

* Nombre del laboratorio.
* Ubicación dentro del liceo.
* Cantidad de computadores.
* Sistema operativo.
* Horario.
* Estado de disponibilidad.
* Fotografías, cuando existen.

El estado del laboratorio se representa visualmente como:

🟢 **Disponible**

🔴 **Ocupado**

---

## 🔐 Sistema de acceso para profesores

El proyecto incorpora un sistema de autenticación utilizando **Firebase Authentication**.

Los profesores autorizados pueden iniciar sesión mediante correo electrónico y contraseña.

Una vez iniciada la sesión, aparece un panel administrativo que permite acceder a funciones adicionales.

Entre ellas se encuentra la posibilidad de **cambiar la disponibilidad de los laboratorios**.

Esto permite que la información mostrada por el sitio pueda mantenerse actualizada.

---

## 🔄 Actualización de disponibilidad

Una de las características principales del proyecto es la actualización de la disponibilidad mediante **Firebase Firestore**.

Los datos de los laboratorios se almacenan en una base de datos y el sitio los consulta para mostrar la información.

Cuando un usuario autorizado cambia el estado de un laboratorio, la información se actualiza y puede reflejarse en el sitio.

El funcionamiento general es:

```text
Profesor inicia sesión
        ↓
Selecciona un laboratorio
        ↓
Cambia su disponibilidad
        ↓
Se actualiza Firebase
        ↓
La información se refleja en el sitio
```

Además, el proyecto utiliza escucha de cambios en tiempo real para mantener actualizada la información mostrada.

---

## 🗺️ Mapa interactivo

El proyecto también incorpora una sección de **Mapa Interactivo del Liceo**.

En esta sección se utiliza un plano del establecimiento sobre el cual se ubican marcadores correspondientes a los laboratorios.

El usuario puede seleccionar un marcador para obtener información del laboratorio seleccionado.

La información mostrada incluye:

* Nombre.
* Ubicación.
* Cantidad de equipos.
* Sistema operativo.
* Horario.
* Disponibilidad.

El sistema también utiliza distintos colores para representar los estados:

🟢 Disponible
🔴 Ocupado
🟡 Seleccionado

Esto permite identificar visualmente la ubicación y el estado de cada laboratorio.

---

## 📸 Galería de imágenes

Los laboratorios pueden incorporar fotografías.

Estas imágenes se muestran como miniaturas y pueden abrirse en una vista ampliada.

La galería incluye controles para:

* Ver una imagen.
* Avanzar a la siguiente.
* Volver a la anterior.
* Cerrar la vista.
* Mostrar el número de imagen actual.

También se incorporó carga diferida de imágenes para evitar cargar innecesariamente todos los recursos al mismo tiempo.

---

## 📞 Contacto

La sección de contacto entrega información relacionada con el establecimiento y permite encontrar diferentes formas de comunicación.

Se incluyen:

* Dirección.
* Teléfonos.
* Correos electrónicos.
* Redes sociales.
* Horarios de atención.

Además, se implementó un formulario donde el usuario puede ingresar:

* Nombre.
* Correo electrónico.
* Teléfono.
* Asunto.
* Mensaje.

El formulario valida los campos obligatorios y muestra un mensaje de confirmación después del envío.

---

## 👥 Sobre el proyecto

La sección **“Sobre Nosotros”** explica el origen y propósito del proyecto.

En ella se presentan:

* Descripción del proyecto.
* Objetivos.
* Misión.
* Información de los laboratorios.
* Información general del desarrollo.
* Posibles funcionalidades futuras.

El proyecto fue desarrollado como una iniciativa estudiantil por **Justyn Cortes y Bruno Fernandez**, estudiantes del Liceo INSUCO de Valparaíso.

---

# 🛠️ Tecnologías utilizadas

Para desarrollar el proyecto se utilizaron principalmente tecnologías de desarrollo web:

### HTML5

Utilizado para construir la estructura de las diferentes páginas del sitio.

### CSS3

Utilizado para diseñar la interfaz, colores, distribución de elementos, tarjetas, botones, animaciones y adaptación a distintos tamaños de pantalla.

### JavaScript

Utilizado para implementar la lógica y las funcionalidades interactivas del proyecto.

Entre ellas:

* Inicio y cierre de sesión.
* Consulta de laboratorios.
* Actualización de disponibilidad.
* Mapa interactivo.
* Galería de imágenes.
* Formulario de contacto.

### Firebase

Se utiliza como servicio backend para algunas funcionalidades del proyecto.

Se implementan:

**Firebase Authentication**
Para gestionar el inicio de sesión de usuarios autorizados.

**Firebase Firestore**
Para almacenar la información de los laboratorios y actualizar su disponibilidad.

### Netlify

Utilizado para publicar el sitio web y permitir su acceso mediante Internet.

### GitHub

Utilizado para almacenar y gestionar el código fuente del proyecto mediante control de versiones.

---

# 📁 Organización del proyecto

El proyecto se encuentra organizado separando la estructura, estilos, scripts y recursos.

```text
proyecto_laboratorios/
│
├── index.html
│
├── pages/
│   ├── laboratorios.html
│   ├── contacto.html
│   ├── mapa.html
│   ├── login.html
│   └── sobre-mi.html
│
├── assets/
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   ├── laboratorios.css
│   │   ├── contacto.css
│   │   ├── mapa.css
│   │   └── sobre-mi.css
│   │
│   ├── js/
│   │   ├── script.js
│   │   ├── mapa.js
│   │   ├── contacto.js
│   │   ├── login.js
│   │   └── firebase-config.js
│   │
│   └── imagenes/
│       ├── Logo-insuco.png
│       └── mapa-liceo.png
│
└── .vscode/
```

Esta organización permite separar cada tipo de recurso y facilita el mantenimiento del proyecto.

---

# 📊 Información de los laboratorios

La información utilizada actualmente contempla 5 laboratorios.

| Laboratorio   | Ubicación        | Computadores | Sistema Operativo         |
| ------------- | ---------------- | -----------: | ------------------------- |
| Laboratorio 1 | Piso 2, Ala Sur  |           30 | Windows 11 / Linux Ubuntu |
| Laboratorio 2 | Piso 2, Ala Sur  |           25 | Windows 11 / Linux Ubuntu |
| Laboratorio 3 | Piso 3, Ala Este |           36 | Windows 11 / Linux        |
| Laboratorio 4 | Piso 4, Ala Sur  |           28 | Windows 10                |
| Laboratorio 5 | Piso 3, Ala Este |           20 | Ubuntu                    |

En total, los datos actuales consideran **139 computadores** distribuidos entre los cinco laboratorios.

---

# 📱 Diseño adaptable

El sitio fue desarrollado considerando distintos tamaños de pantalla.

Para esto se utilizaron reglas responsive mediante CSS, permitiendo adaptar elementos como:

* Menú de navegación.
* Tamaño de títulos.
* Distribución de laboratorios.
* Tarjetas de información.
* Formularios.
* Mapa.
* Contenido general.

De esta manera, la página puede ser utilizada tanto en computadores como en dispositivos móviles.

---

# 🔄 Funcionamiento general del sistema

El funcionamiento del proyecto puede resumirse de la siguiente manera:

```text
                 USUARIO
                    │
                    ▼
              SITIO WEB
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   Laboratorios   Mapa       Contacto
        │           │
        └───────┬───┘
                ▼
          Firebase
        ┌───────┴────────┐
        ▼                ▼
 Authentication      Firestore
        │                │
        ▼                ▼
   Acceso profesor   Datos de laboratorios
                          │
                          ▼
                    Disponibilidad
```

---

# 🎓 Importancia del proyecto

Este proyecto busca aplicar los conocimientos adquiridos durante la formación técnica en programación en una situación relacionada directamente con el entorno educativo.

A través del desarrollo se trabajan conceptos como:

* Desarrollo web.
* Estructuración de páginas.
* Diseño responsive.
* Programación con JavaScript.
* Manipulación del DOM.
* Formularios.
* Autenticación de usuarios.
* Bases de datos.
* Actualización de información.
* Organización de proyectos.
* Control de versiones.
* Publicación de aplicaciones web.

De esta manera, el proyecto no solamente funciona como una página informativa, sino también como una aplicación práctica de diferentes conocimientos de programación.

---

# 🚀 Mejoras futuras

El proyecto está planteado como una base que puede continuar desarrollándose.

Entre las funcionalidades que podrían incorporarse posteriormente se encuentran:

* Sistema de reserva de laboratorios.
* Panel administrativo más completo.
* Gestión de información de los laboratorios.
* Notificaciones sobre cambios de disponibilidad.
* Integración con horarios de clases.
* Mejoras en el mapa interactivo.
* Mayor cantidad de información e imágenes.
* Sistema de búsqueda y filtros.

---

# 📌 Estado actual

**Versión:** 1.0
**Tipo de proyecto:** Sitio web informativo e interactivo
**Estado:** En desarrollo continuo
**Año:** 2026

🌐 **Sitio publicado:**
https://laboratorios-insuco.netlify.app/

---

# 👨‍💻 Autores

**Justyn Cortes**
**Bruno Fernandez**

Estudiantes del **Liceo INSUCO de Valparaíso**.

---

## 📄 Conclusión

**Laboratorios INSUCO** es una plataforma web creada para facilitar el acceso a la información de los laboratorios de computación del establecimiento.

El proyecto combina una interfaz informativa con funcionalidades interactivas y servicios externos, permitiendo consultar los laboratorios, visualizar su ubicación, conocer sus características y mantener actualizada su disponibilidad mediante un sistema de autenticación y base de datos.

El desarrollo representa una aplicación práctica de conocimientos de programación web y busca solucionar una necesidad concreta dentro del entorno educativo.
