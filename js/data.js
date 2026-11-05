/**
 * Centro de Pausas Activas - Archivo de Datos (data.js)
 * Contiene todas las configuraciones, textos, rutinas y parámetros
 * para los modos "cte" (Docentes) y "primaria" (Alumnos).
 */

const PAUSA_DATA = {
  // Configuración general de cada modo
  modes: {
    cte: {
      id: "cte",
      name: "Modo Docente (CTE)",
      badge: "Consejo Técnico Escolar",
      description: "Pausas ergonómicas, relajación y recarga cognitiva para adultos",
      themeColor: "#4f46e5", // Indigo vibrante
      themeSecondary: "#06b6d4",
      bgGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      musicStyle: "lofi",
      musicLabel: "Lo-Fi Instrumental Relajante"
    },
    primaria: {
      id: "primaria",
      name: "Modo Primaria (Alumnos)",
      badge: "Dinámicas Escolares",
      description: "Juegos motrices, activación energética y diversión para niñas y niños",
      themeColor: "#059669", // Esmeralda / divertido
      themeSecondary: "#f59e0b",
      bgGradient: "linear-gradient(135deg, #042f2e 0%, #064e3b 50%, #0f172a 100%)",
      musicStyle: "upbeat",
      musicLabel: "Ritmo Energético y Divertido"
    }
  },

  // 1. RULETA DEL MOVIMIENTO
  ruleta: {
    cte: [
      {
        id: "c1",
        name: "Descompresión Cervical",
        category: "Ergonomía y Postura",
        emoji: "🧘",
        color: "#6366f1",
        tagline: "Libera la tensión acumulada en cuello y hombros",
        instructions: "Sentado erguido, lleva suavemente la oreja derecha hacia tu hombro derecho sin forzar. Sostén 10 segundos respirando hondo. Luego repite suavemente hacia el lado izquierdo.",
        benefits: "Reduce la rigidez del cuello provocada por el trabajo en computadora y revisión de documentos.",
        tips: "Mantén los hombros relajados hacia abajo, no los subas a las orejas.",
        defaultTime: 25
      },
      {
        id: "c2",
        name: "Apertura Pectoral y Tórax",
        category: "Postura y Respiración",
        emoji: "👐",
        color: "#0284c7",
        tagline: "Contrarresta la postura encorvada al escribir",
        instructions: "De pie o sentado, entrelaza las manos detrás de la espalda baja. Estira los brazos suavemente hacia atrás y hacia abajo mientras abres el pecho y miras ligeramente hacia arriba.",
        benefits: "Alinea la columna dorsal y amplía la capacidad pulmonar.",
        tips: "Inhala profundamente mientras expandes la caja torácica.",
        defaultTime: 20
      },
      {
        id: "c3",
        name: "Torsión Suave en Silla",
        category: "Movilidad Vertebral",
        emoji: "🔄",
        color: "#0d9488",
        tagline: "Despierta la flexibilidad de tu columna",
        instructions: "Siéntate con la espalda recta. Gira el torso hacia la derecha colocando la mano izquierda en la rodilla derecha y la mano derecha en el respaldo. Mantén 10s y cambia al otro lado.",
        benefits: "Desbloquea la zona lumbar y mejora la circulación en la espalda media.",
        tips: "No fuerces el giro, gira desde el abdomen y exhala durante la torsión.",
        defaultTime: 25
      },
      {
        id: "c4",
        name: "Alivio de Muñecas y Dedos",
        category: "Salud Ocupacional",
        emoji: "✋",
        color: "#10b981",
        tagline: "Previene fatiga y síndrome del túnel carpiano",
        instructions: "Extiende un brazo hacia adelante con la palma hacia el frente (como haciendo un 'alto'). Con la otra mano, jala suavemente los dedos hacia ti por 10s. Luego apunta hacia abajo y repite.",
        benefits: "Disminuye la sobrecarga de tendones por escribir en teclado y calificar trabajos.",
        tips: "Mantén el codo estirado sin bloquear la articulación.",
        defaultTime: 20
      },
      {
        id: "c5",
        name: "Descanso Visual 20-20-20",
        category: "Higiene Visual",
        emoji: "👀",
        color: "#8b5cf6",
        tagline: "Descansa los ojos de la luz de pantallas y textos",
        instructions: "Retira la mirada de las pantallas o papeles. Enfoca un punto a más de 6 metros de distancia durante 20 segundos. Pestañea varias veces suavemente y luego cierra los ojos 5 segundos.",
        benefits: "Reduce la fatiga ocular, resequedad y dolor de cabeza por esfuerzo de acomodación.",
        tips: "Puedes frotar las palmas de tus manos para generar calor y apoyarlas sobre los ojos cerrados.",
        defaultTime: 25
      },
      {
        id: "c6",
        name: "Sentadilla Controlada en Silla",
        category: "Fuerza y Activación",
        emoji: "🪑",
        color: "#f59e0b",
        tagline: "Reanima la circulación de tus piernas",
        instructions: "Párate frente a tu silla. Separa los pies al ancho de cadera. Flexiona las rodillas como si te fueras a sentar, roza apenas el asiento con los glúteos y vuelve a subir. Realiza 8 a 10 repeticiones.",
        benefits: "Estimula el flujo sanguíneo de piernas y activa glúteos y cuádriceps tras horas sentado.",
        tips: "Mantén la espalda recta y el peso en los talones.",
        defaultTime: 30
      },
      {
        id: "c7",
        name: "Bombeo de Gemelos y Tobillos",
        category: "Circulación Venosa",
        emoji: "🦶",
        color: "#ef4444",
        tagline: "Favorece el retorno venoso hacia el corazón",
        instructions: "De pie apoyándote en la mesa o respaldo, elévate sobre la punta de los pies lo más alto posible, sostén 2 segundos y baja apoyando talones y levantando las puntas. Repite 15 veces.",
        benefits: "Previene pesadez e hinchazón en piernas y estimula el bombeo circulatorio.",
        tips: "Hazlo a un ritmo constante y controlado.",
        defaultTime: 25
      },
      {
        id: "c8",
        name: "Abrazo Escapular y Descompresión",
        category: "Espalda Alta",
        emoji: "🫂",
        color: "#ec4899",
        tagline: "Suelta la carga de la espalda alta",
        instructions: "Cruza ambos brazos sobre el pecho abrazándote los hombros. Lleva la barbilla suavemente hacia el pecho mientras inhalas y exhala expandiendo la zona interescapular.",
        benefits: "Disminuye la tensión en trapecios y romboides, zona típica de acumulación de estrés.",
        tips: "Siente cómo se separan tus omóplatos con cada respiración profunda.",
        defaultTime: 20
      },
      {
        id: "c9",
        name: "Estiramiento Isquiotibial de Pie",
        category: "Flexibilidad de Piernas",
        emoji: "🦵",
        color: "#3b82f6",
        tagline: "Libera la tensión en la parte posterior de los muslos",
        instructions: "De pie, da un paso corto al frente con la pierna derecha, apoya solo el talón y flexiona la rodilla izquierda. Inclina el torso hacia adelante con la espalda recta hasta sentir el estiramiento.",
        benefits: "Alivia la tensión lumbar que se origina por el acortamiento de isquiotibiales.",
        tips: "12 segundos con cada pierna, manteniendo la espalda recta.",
        defaultTime: 25
      },
      {
        id: "c10",
        name: "Respiración Diafragmática Rápida",
        category: "Anti-Estrés y Calma",
        emoji: "🌬️",
        color: "#14b8a6",
        tagline: "Oxigena tu cerebro y calma el sistema nervioso",
        instructions: "Mano derecha al pecho y mano izquierda al abdomen. Inhala en 4 segundos sintiendo cómo se expande el abdomen, retén 2 segundos y exhala suave por la boca en 6 segundos. Repite 3 veces.",
        benefits: "Disminuye el cortisol y favorece la claridad mental para seguir trabajando.",
        tips: "Concéntrate en que el pecho casi no se mueva, solo el vientre.",
        defaultTime: 30
      },
      {
        id: "c11",
        name: "Movilidad de Muñecas en Ocho",
        category: "Articulaciones",
        emoji: "♾️",
        color: "#84cc16",
        tagline: "Suelta la rigidez de manos y antebrazos",
        instructions: "Entrelaza los dedos de ambas manos y dibuja en el aire figuras de ocho de forma fluida. Haz 10 vueltas en un sentido y luego cambia la dirección del movimiento.",
        benefits: "Lubrica las articulaciones de la muñeca y dedos, aliviando molestias de escritura.",
        tips: "Movimiento suave, sin dolor ni tirones.",
        defaultTime: 20
      },
      {
        id: "c12",
        name: "Marcha Ligera en el Lugar",
        category: "Activación Metabólica",
        emoji: "🚶‍♂️",
        color: "#f97316",
        tagline: "Reinicio energético en 30 segundos",
        instructions: "De pie junto a tu asiento, marcha en tu lugar levantando moderadamente las rodillas y balanceando los brazos suavemente. Aumenta ligeramente el ritmo los últimos 10 segundos.",
        benefits: "Eleva las pulsaciones levemente, disipa la somnolencia y mejora la atención.",
        tips: "Aterriza con suavidad sobre la parte delantera de la planta del pie.",
        defaultTime: 30
      }
    ],

    primaria: [
      {
        id: "p1",
        name: "El Paso del Oso",
        category: "Fuerza y Coordinación",
        emoji: "🐻",
        color: "#9333ea",
        tagline: "¡A 4 patas con fuerza y diversión!",
        instructions: "Apoya manos y pies en el suelo con la cadera alta y las rodillas despegadas. Da 4 pasos hacia adelante y 4 hacia atrás imitando a un gran oso salvaje.",
        benefits: "Despierta todo el cuerpo, tonifica brazos y abdomen.",
        tips: "¡No dejes que las rodillas toquen el suelo!",
        defaultTime: 20
      },
      {
        id: "p2",
        name: "El Cohete Espacial",
        category: "Flexibilidad y Altura",
        emoji: "🚀",
        color: "#f59e0b",
        tagline: "¡Estírate hasta las estrellas!",
        instructions: "De pie bien derechitos, junta las manos apuntando al cielo. Levántate en puntas de pie y estírate lo más alto que puedas como un cohete despegando.",
        benefits: "Descomprime la espalda y alarga toda la columna vertebral.",
        tips: "Cuenta hasta 5 en la cima antes de bajar los talones.",
        defaultTime: 20
      },
      {
        id: "p3",
        name: "Toca tus Pies Mágicos",
        category: "Flexibilidad Divertida",
        emoji: "👣",
        color: "#3b82f6",
        tagline: "¡A ver quién llega más abajo sin doblar rodillas!",
        instructions: "De pie con pies juntos, inhala brazos arriba y al soltar el aire baja a tocarte la punta de los tenis o los tobillos sin doblar las rodillas. ¡Quédate ahí 5 segundos!",
        benefits: "Estira la parte posterior de las piernas y relaja la espalda.",
        tips: "No rebotes, solo déjate caer como un muñeco de trapo.",
        defaultTime: 20
      },
      {
        id: "p4",
        name: "La Postura del Árbol Sabio",
        category: "Equilibrio y Foco",
        emoji: "🌳",
        color: "#10b981",
        tagline: "¡Equilibrio firme como un roble gigante!",
        instructions: "Apóyate sobre una sola pierna. Coloca el otro pie en la pantorrilla. Junta las palmas al pecho o elévalas como ramas al viento. ¡Aguanta 10 segundos sin caerte y cambia!",
        benefits: "Fomenta la concentración, la propiocepción y el equilibrio.",
        tips: "Mira un punto fijo al frente para no perder el balance.",
        defaultTime: 25
      },
      {
        id: "p5",
        name: "El Salto del Conejo",
        category: "Energía y Alegría",
        emoji: "🐰",
        color: "#ec4899",
        tagline: "¡Saltitos ágiles en el bosque!",
        instructions: "Pon las manos frente al pecho como manitas de conejo. Da saltitos continuos sobre las puntas de los pies hacia los lados y al frente en tu lugar.",
        benefits: "Eleva la energía, mejora la agilidad y activa la respiración.",
        tips: "Aterriza con los pies flexionados como si tuvieras resortes.",
        defaultTime: 20
      },
      {
        id: "p6",
        name: "Gigantes y Duendes",
        category: "Agilidad y Reflejos",
        emoji: "🧙‍♂️",
        color: "#8b5cf6",
        tagline: "¡Cambio de tamaño a toda velocidad!",
        instructions: "Cuando digan '¡Gigante!' ponte de pie de puntillas con brazos extendidos. Cuando digan '¡Duende!' agáchate en cuclillas haciéndote una bolita. Haz 6 cambios rápidos.",
        benefits: "Excelente ejercicio neuromuscular y de atención rápida.",
        tips: "Cuidado con los compañeros de al lado al estirarte.",
        defaultTime: 25
      },
      {
        id: "p7",
        name: "Aspas del Molino",
        category: "Movilidad y Ritmo",
        emoji: "💨",
        color: "#06b6d4",
        tagline: "¡Gira tus brazos con el viento!",
        instructions: "Separa los pies al ancho de hombros. Haz giros amplios con los dos brazos hacia adelante 5 veces y luego hacia atrás 5 veces, como las aspas de un molino veloz.",
        benefits: "Moviliza la articulación del hombro y libera tensión escapular.",
        tips: "Mantén el abdomen firme para no tambalearte.",
        defaultTime: 20
      },
      {
        id: "p8",
        name: "Caminata del Pingüino",
        category: "Equilibrio y Talones",
        emoji: "🐧",
        color: "#64748b",
        tagline: "¡Marcha divertida sobre los hielos!",
        instructions: "Levanta las puntas de los pies y quédate apoyado solo en los talones. Brazos pegados al cuerpo con manos abiertas hacia afuera. Da pasitos cortos en tu lugar.",
        benefits: "Fortalece los músculos tibiales y mejora la estabilidad del tobillo.",
        tips: "Siente cómo trabajan las espinillas sin perder el equilibrio.",
        defaultTime: 20
      },
      {
        id: "p9",
        name: "El Globo Gigante",
        category: "Respiración y Calma",
        emoji: "🎈",
        color: "#f43f5e",
        tagline: "¡Infla tu pancita como un globo de helio!",
        instructions: "Coloca tus manos sobre el estómago. Toma aire por la nariz inflando el globo enorme, mantén 3 segundos y desínflalo soltando el aire con un silbido largo 'sssssss'.",
        benefits: "Regula las emociones y ayuda a calmar la hiperactividad.",
        tips: "Repítelo tres veces con los ojos semicerrados.",
        defaultTime: 25
      },
      {
        id: "p10",
        name: "La Estatua de Piedra",
        category: "Autocontrol y Reacción",
        emoji: "🗿",
        color: "#d97706",
        tagline: "¡Muévete con música y congélalo al silencio!",
        instructions: "Baila o sacude todo el cuerpo libremente. Al sonar la campana o la señal de alto, quédate 100% inmóvil en una pose divertida durante 5 segundos sin parpadear.",
        benefits: "Entrena el control inhibitorio y la conciencia corporal.",
        tips: "¡No se vale reírse ni moverse un solo milímetro!",
        defaultTime: 25
      },
      {
        id: "p11",
        name: "Carrera Flash en tu Lugar",
        category: "Cardio Exprés",
        emoji: "⚡",
        color: "#eab308",
        tagline: "¡Siente la velocidad de un superhéroe!",
        instructions: "Corre en tu sitio a toda velocidad levantando rodillas y braceando durante 10 segundos continuos. Luego desacelera y camina 10 segundos para recuperar el aliento.",
        benefits: "Descarga de energía acumulada y aumento del flujo de oxígeno al cerebro.",
        tips: "Corre sin hacer ruido con los pies para mayor control.",
        defaultTime: 25
      },
      {
        id: "p12",
        name: "El Flamenco Rosa",
        category: "Equilibrio Divertido",
        emoji: "🦩",
        color: "#ec4899",
        tagline: "¡Una sola pata y alas abiertas!",
        instructions: "Párate en una pata, toma tu otra rodilla con ambas manos y llévala hacia tu pecho. Mantén la espalda recta como un elegante flamenco. ¡Cambia de pata!",
        benefits: "Estira glúteos, mejora el equilibrio y la fuerza de pies.",
        tips: "Sonríe para no perder la concentración.",
        defaultTime: 25
      }
    ]
  },

  // 2. CRUZ DE COORDINACIÓN
  cruz: {
    sectors: [
      { id: 1, name: "Cuadrante 1", label: "Frontal Izq.", short: "1", color: "#3b82f6" },
      { id: 2, name: "Cuadrante 2", label: "Frontal Der.", short: "2", color: "#10b981" },
      { id: 3, name: "Cuadrante 3", label: "Trasero Izq.", short: "3", color: "#f59e0b" },
      { id: 4, name: "Cuadrante 4", label: "Trasero Der.", short: "4", color: "#ef4444" }
    ],
    tempos: [
      { label: "Suave", bpm: 75 },
      { label: "Medio", bpm: 100 },
      { label: "Rápido", bpm: 130 }
    ],
    cte: {
      title: "Cruz de Coordinación Motriz",
      subtitle: "Patrones rítmicos de pasos para sincronización hemisférica",
      instructions: "Ubícate en el centro de tu espacio imaginario. Sigue el ritmo marcado por el metrónomo y da un paso o salto hacia el cuadrante iluminado.",
      patterns: [
        { name: "Patrón Cruzado Básico", sequence: [1, 4, 2, 3], desc: "Paso cruzado alternando diagonal 1-4 y 2-3." },
        { name: "Giro de 90° (Cuarto de Vuelta)", sequence: [1, 2, 4, 3], desc: "Pisa en sentido horario: 1 -> 2 -> 4 -> 3." },
        { name: "Medio Giro (180°)", sequence: [1, 4, 1, 4, 2, 3, 2, 3], desc: "Salto o paso con giro de media vuelta en diagonal." },
        { name: "Ida y Vuelta Lateral", sequence: [1, 2, 1, 2, 3, 4, 3, 4], desc: "Desplazamiento lateral rápido de bajo impacto." },
        { name: "Giro Completo 360°", sequence: [1, 2, 4, 3, 1], desc: "Secuencia completa de orientación espacial circular." }
      ]
    },
    primaria: {
      title: "Cruz Saltarina Rítmica",
      subtitle: "¡Sigue la luz y no te equivoques de cuadrante!",
      instructions: "Párate en medio. Mira la pantalla y salta con ambos pies juntos (o en una pata) hacia el número que se encienda al ritmo de la música.",
      patterns: [
        { name: "El Baile del Reloj", sequence: [1, 2, 4, 3], desc: "¡Gira como las manecillas del reloj! 1, 2, 4, 3." },
        { name: "Salto en X Ninja", sequence: [1, 4, 2, 3], desc: "¡Cruza de una esquina a la contraria en diagonal!" },
        { name: "Adelante y Atrás", sequence: [1, 2, 1, 2, 3, 4, 3, 4], desc: "¡Dos pasos al frente y dos pasos atrás!" },
        { name: "El Remolino Loco", sequence: [1, 3, 2, 4], desc: "¡Zig-zag supersónico sin pisar las líneas!" },
        { name: "Doble Salto", sequence: [1, 1, 2, 2, 4, 4, 3, 3], desc: "¡Doble salto en cada número!" }
      ]
    }
  },

  // 3. SEMÁFORO DE REACCIÓN
  semaforo: {
    cte: {
      title: "Semáforo Ergonómico & Atención",
      subtitle: "Alternancia de ritmo para activar el cuerpo y reducir estrés mental",
      rules: {
        verde: { text: "ACTIVACIÓN", desc: "Movilidad articular amplia: camina por tu espacio o haz círculos con los hombros.", color: "#10b981", sound: "beat" },
        amarillo: { text: "CÁMARA LENTA", desc: "Movimientos lentos y conscientes: estira los brazos y el cuello despacio.", color: "#f59e0b", sound: "warn" },
        rojo: { text: "PAUSA TOTAL / ESTATUA", desc: "¡Detente! Cierra los ojos y toma 3 respiraciones profundas sin moverte.", color: "#ef4444", sound: "whistle" }
      },
      durations: {
        verde: [8, 14],
        amarillo: [3, 5],
        rojo: [5, 8]
      }
    },
    primaria: {
      title: "Semáforo de las Estatuas Musicales",
      subtitle: "¡Baila, muévete en cámara lenta y quédate congelado!",
      rules: {
        verde: { text: "¡A MOVERSE!", desc: "¡Baila, salta o trota libremente con toda tu energía!", color: "#10b981", sound: "beat" },
        amarillo: { text: "¡CÁMARA LENTA!", desc: "¡Muévete como si estuvieras en la luna o debajo del agua!", color: "#f59e0b", sound: "warn" },
        rojo: { text: "¡CONGELADOS!", desc: "¡Nadie se mueve! Ni un pelo, ni pestañear. ¡Estatua total!", color: "#ef4444", sound: "whistle" }
      },
      durations: {
        verde: [6, 12],
        amarillo: [2, 4],
        rojo: [4, 7]
      }
    }
  },

  // 4. RETO DE TOQUES (SIN DEJAR CAER)
  toques: {
    cte: {
      title: "Reto Sin Dejar Caer (Coordinación)",
      subtitle: "Usa un globo, pelota de papel o juega en la pantalla interactiva",
      description: "Objetivo: Mantener el objeto en el aire el mayor tiempo posible y sumar el máximo de toques.",
      modes: [
        { id: "manual", name: "Modo Físico (Globo/Pelota)", desc: "Jueguen en vivo con un globo o pelotita de papel y lleven el conteo con el pulsador." },
        { id: "digital", name: "Minijuego en Pantalla", desc: "Toca el globo en pantalla antes de que caiga al suelo. ¡Cuidado con el viento!" }
      ],
      challenges: [
        "Toques alternando mano izquierda y derecha.",
        "Prohibido usar las manos: solo cabeza, hombros y pies.",
        "En parejas: un toque cada persona sin repetir.",
        "Toque con la mano no dominante exclusivamente.",
        "Dar un aplauso entre cada toque antes de volver a golpear."
      ],
      targetTimes: [30, 60, 90]
    },
    primaria: {
      title: "¡No Dejes Caer el Globo!",
      subtitle: "Reto de reflejos y toques récord en clase",
      description: "Golpea el globo para mantenerlo flotando. ¡Alcanza el récord de toques sin que toque el piso!",
      modes: [
        { id: "manual", name: "Globo Real en el Salón", desc: "El maestro o alumnos usan un globo de verdad y suman puntos con el botón de toque." },
        { id: "digital", name: "Globo Virtual en Pantalla", desc: "¡Toca la pantalla o haz clic para rebotar el globo y que no caiga!" }
      ],
      challenges: [
        "¡Solo con la rodilla y el pie!",
        "¡Toca con un dedo diferente cada vez!",
        "¡Toca y da media vuelta antes del siguiente!",
        "¡Trabajo en equipo: pasa el globo a tu compañero con la cabeza!",
        "¡Agachados en el suelo impulsando el globo hacia arriba!"
      ],
      targetTimes: [30, 45, 60]
    }
  },

  // 5. DUELO DE ESPEJO / GIMNASIA CEREBRAL
  duelo: {
    roundTime: 20,
    cte: {
      title: "Gimnasia Cerebral & Duelo de Espejo",
      subtitle: "Desafíos de integración hemisférica y atención ejecutiva",
      instructions: "Colóquense en parejas frente a frente. Uno será el Líder y otro el Espejo. Al sonar la campana de cambio de roles, inviertan los papeles.",
      cards: [
        {
          title: "Nariz y Oreja Cruzada",
          emoji: "👃👂",
          desc: "Toca con tu mano derecha tu oreja izquierda, y con tu mano izquierda tu nariz. Al aplauso, invierte la posición de ambas manos inmediatamente.",
          focus: "Conexión interhemisférica y disociación motriz."
        },
        {
          title: "Pulgar y Meñique Invertidos",
          emoji: "👍🤙",
          desc: "Mano derecha muestra pulgar arriba; mano izquierda muestra el meñique. A la cuenta de tres, cambia: izquierda muestra pulgar y derecha meñique.",
          focus: "Control inhibitorio y motricidad fina."
        },
        {
          title: "Círculo y Triángulo Simultáneos",
          emoji: "⭕🔺",
          desc: "Con el dedo índice de una mano dibuja en el aire un círculo continuo. Al mismo tiempo, con la otra mano dibuja un triángulo.",
          focus: "División de la atención y coordinación bilateral."
        },
        {
          title: "Ocho Perezoso en el Aire",
          emoji: "♾️👀",
          desc: "Dibuja un 8 horizontal (signo de infinito) con el pulgar extendido a la altura de los ojos, siguiendo el movimiento con la vista sin mover la cabeza.",
          focus: "Relajación ocular y estimulación cerebral."
        },
        {
          title: "Gancho de Cook",
          emoji: "🧘‍♂️✨",
          desc: "Cruza el tobillo izquierdo sobre el derecho. Entrelaza las manos al frente, gíralas hacia el pecho y respira profundo con la lengua en el paladar.",
          focus: "Centramiento, reducción de ansiedad y calma mental."
        },
        {
          title: "Marcha Cruzada",
          emoji: "🚶‍♀️🧠",
          desc: "Lleva el codo derecho a la rodilla izquierda levantada, luego el codo izquierdo a la rodilla derecha. Mantén un ritmo fluido por 20 segundos.",
          focus: "Integración de ambos hemisferios cerebrales."
        },
        {
          title: "Dedo Indice y Pistola",
          emoji: "👉👆",
          desc: "Una mano hace la señal de 'dos' (paz) y la otra una 'pistola'. Alterna de forma simultánea a la señal sin confundir los dedos.",
          focus: "Agilidad mental y coordinación de patrones."
        },
        {
          title: "Líder y Espejo Corporal",
          emoji: "🪞👥",
          desc: "El líder realiza movimientos lentos de brazos, cabeza y expresiones faciales; la pareja debe reflejarlos con total exactitud e inmediatez.",
          focus: "Empatía motriz, neuronas espejo y atención concentrada."
        }
      ]
    },
    primaria: {
      title: "Duelo de Espejos y Juegos Mentales",
      subtitle: "¡Retos divertidos para activar las neuronas!",
      instructions: "En parejas de pie, miren fijamente a su compañero. Uno hace de espejo del otro. ¡Cuidado cuando suene la alarma de CAMBIO!",
      cards: [
        {
          title: "El Truco de la Nariz y Oreja",
          emoji: "👃👂",
          desc: "¡Mano derecha en tu oreja izquierda y mano izquierda en la nariz! Da un aplauso... ¡y cambia rapidísimo!",
          focus: "¡Para despertar el cerebro al 100%!"
        },
        {
          title: "Pulgar Arriba, Meñique Afuera",
          emoji: "👍🤙",
          desc: "Mano derecha pulgar arriba (como 'bien'), mano izquierda estira el meñique. ¡Cambia las dos manos al mismo tiempo!",
          focus: "Coordinación de superhéroe."
        },
        {
          title: "Piedra, Papel o Tijera... ¡Al Revés!",
          emoji: "✂️🪨",
          desc: "Juegan piedra, papel o tijera clásico, pero ahora la regla es: ¡GANA EL QUE SACA LA OPCIÓN PERDEDORA!",
          focus: "Atención rápida y risas aseguradas."
        },
        {
          title: "El Robot y el Espejo",
          emoji: "🤖🪞",
          desc: "El primer jugador se mueve como un robot haciendo ruidos; el segundo debe copiar exactamente cada movimiento.",
          focus: "Creatividad corporal y concentración."
        },
        {
          title: "Toca tu Cabeza, Frota tu Panza",
          emoji: "🙆‍♂️肚",
          desc: "Con una mano dale palmaditas suaves a tu cabeza, y con la otra frótate la panza en círculos. ¡Ahora cambia de mano!",
          focus: "Doble tarea motriz divertida."
        },
        {
          title: "Caminata de Cruzados",
          emoji: "🕺🎶",
          desc: "Codo derecho toca rodilla izquierda, codo izquierdo toca rodilla derecha. ¡A ritmo de la música!",
          focus: "Equilibrio y ritmo."
        },
        {
          title: "Simón Dice Inverso",
          emoji: "🗣️⚡",
          desc: "Si el líder dice 'Simón dice brazos arriba', tienes que ponerlos abajo. Si dice 'siéntate', debes quedarte parado.",
          focus: "Escucha atenta y reflejos."
        },
        {
          title: "La Cara Graciosa",
          emoji: "🤪🎭",
          desc: "El líder pone caras raras y divertidas; el espejo debe poner la misma cara exacta sin reírse.",
          focus: "Expresión facial y risoterapia."
        }
      ]
    }
  },

  // 6. VUELTA A LA CALMA
  calma: {
    techniques: [
      { id: "box", name: "Respiración Cuadrada (4-4-4-4)", inhale: 4, hold: 4, exhale: 4, rest: 4, desc: "Usada por deportistas y astronautas para calmar la mente y regular el pulso." },
      { id: "relax", name: "Respiración 4-7-8 (Sueño & Paz)", inhale: 4, hold: 7, exhale: 8, rest: 1, desc: "Potente técnica para desacelerar el ritmo cardíaco y calmar la ansiedad." },
      { id: "smooth", name: "Respiración Suave (4-6)", inhale: 4, hold: 0, exhale: 6, rest: 2, desc: "Ritmo natural relajante para volver a la calma sin retención de aire." }
    ],
    cte: {
      title: "Vuelta a la Calma y Mindfulness",
      subtitle: "Relajación guiada para disminuir la carga mental y corporal",
      steps: [
        { phase: "Foco", text: "Siéntate cómodo, espalda recta, apoya ambos pies en el piso y suelta las manos sobre los muslos." },
        { phase: "Mandíbula y Rostro", text: "Suelta la mandíbula, separa suavemente los labios y relaja la frente y el ceño fruncido." },
        { phase: "Hombros y Pecho", text: "Deja caer los hombros lejos de las orejas. Siente cómo se aligera la espalda alta." },
        { phase: "Respiración Profunda", text: "Sigue el compás de la esfera: siente el aire entrar fresco por la nariz y salir tibio y relajante." },
        { phase: "Gratitud y Mente Despejada", text: "Reconoce tu esfuerzo en esta sesión. Regresa a tus actividades con renovada energía y tranquilidad." }
      ]
    },
    primaria: {
      title: "El Círculo Mágico de la Calma",
      subtitle: "¡Respira con la esfera que late y relaja tu cuerpo!",
      steps: [
        { phase: "Posición Cómoda", text: "Siéntate derecho o quédate de pie bien tranquilo, con las manos sobre tu pancita." },
        { phase: "Inhala Magia", text: "Cuando el círculo crezca, toma aire suave por la nariz como oliendo una flor." },
        { phase: "Sopla Suave", text: "Cuando el círculo se haga chiquito, sopla despacito como apagando una vela sin apagarla de golpe." },
        { phase: "Cuerpo Suave", text: "Imagina que tus brazos y piernas son fideos cocidos, suaves y sin tensión." },
        { phase: "¡Listos y Felices!", text: "Abre los ojos despacio, estira una gran sonrisa y ¡estamos listos para seguir aprendiendo!" }
      ]
    }
  }
};
