# 🎯 Centro de Pausas Activas • CTE & Primaria

Plataforma web modular de pausas activas y dinamización diseñada tanto para **sesiones de Consejo Técnico Escolar (Docentes)** como para el **aula escolar (Alumnos de Primaria)**.

## 🚀 Demo en línea (GitHub Pages)

Accede directamente a la aplicación en:
👉 **[https://felipesalle.github.io/pausaactiva/](https://felipesalle.github.io/pausaactiva/)**

---

## 🌟 Características Principales

### 🔄 Selector de Audiencia en un Clic:
- **Modo CTE (Docentes):** Actividades de ergonomía laboral, descompresión cervical y lumbar, estiramiento, gimnasia cerebral y relajación frente al estrés de pantalla. Acompañado de música ambiente **Lo-Fi Instrumental**.
- **Modo Primaria (Alumnos):** Dinámicas lúdicas, desafíos motrices, juegos de reacción y pausas de respiración para canalizar energía y recuperar la concentración. Acompañado de ritmos **Upbeat / Funk alegre**.

---

## 🛠️ Las 6 Herramientas Interactivas

1. **🎡 Ruleta del Movimiento:**
   - Ruleta animada con Canvas HTML5 con física de desaceleración y sonido de giro.
   - 12 actividades adaptadas a cada modo (Ergonomía / Lúdicas).
   - Temporizador integrado con alertas sonoras y catálogo completo de posturas.

2. **➕ Cruz de Coordinación:**
   - Cuadrícula de 4 cuadrantes con señalización rítmica visual y auditiva.
   - Patrones de movimiento: cruzado, 1/4 de giro, 180°, 360°, zig-zag.
   - Selector de velocidad (BPM: 75, 100, 130).

3. **🚦 Semáforo de Reacción / Estatuas:**
   - Ciclo de colores con iluminación dinámica: Verde (Acción), Amarillo (Cámara lenta) y Rojo (Estatua).
   - Pausa automática de la música en rojo con efecto de sonido de silbato.
   - Modos automático y manual.

4. **🎈 Reto de Toques (Sin Dejar Caer):**
   - No dejes caer el globo o la pelota de papel.
   - Incluye minijuego interactivo con física gravitatoria en pantalla táctil/ratón y botón de conteo para dinámicas con globos reales en el aula.
   - Marcador de toques, récord histórico y cuenta regresiva.

5. **🪞 Duelo de Espejo / Gimnasia Cerebral:**
   - Generador de retos de coordinación cruzada y conexión interhemisférica.
   - Temporizador por ronda con aviso sonoro y visual de **"¡Cambio de roles!"** (Líder / Espejo).

6. **🫧 Vuelta a la Calma:**
   - Esfera visual que guia ciclos de respiración (Inhala, Sostén, Exhala, Pausa).
   - Métodos seleccionables: Respiración Cuadrada (4-4-4-4), 4-7-8 y Suave (4-6).
   - Guía de relajación progresiva por grupos musculares y sonido de cuenco tibetano.

---

## 🎵 Sistema de Audio Integrado (Web Audio API)
- Reproductor de audio flotante y persistente en toda la navegación.
- Dos estilos musicales procedurales e integrados (sin descargas ni dependencias externas): **Lo-Fi** (para CTE) y **Upbeat** (para Primaria).
- Efectos de sonido generados en tiempo real: clics de ruleta, silbato de árbitro, campana de victoria, pops de toques y cuencos tibetanos.
- Control de volumen (inicia por defecto al 35%) y botón de silencio.
- 100% funcional sin conexión a internet (Offline).

---

## 💻 Tecnologías
- **HTML5 Semántico + Canvas API**
- **CSS3 Moderno** (Variables CSS, Flexbox, CSS Grid, Glassmorphism, Responsive Design)
- **Vanilla JavaScript Modular** (`data.js`, `audio.js`, `app.js`)
- **Web Audio API** (Sonido sintético procedural y SFX)
