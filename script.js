/* script.js
  Lógica de la Malla Curricular
*/

// --- 1. Definición de Datos (Ramos y Prerrequisitos) ---
// IDs únicos (slugs) para conectar los requisitos.

const mallaData = [
    {
        semestre: 1,
        ramos: [
            { id: 'algebra', nombre: 'Álgebra', req: [] },
            { id: 'bio_genetica', nombre: 'Fundamentos de Biología y Genética Humana', req: [] },
            { id: 'quimica_gral', nombre: 'Química General y Técnicas de Lab.', req: [] },
            { id: 'intro_quimica', nombre: 'Introducción a la Química y Farmacia', req: [] },
            { id: 'identidad_1', nombre: 'Identidad Universitaria I', req: [] },
            { id: 'ingles_1', nombre: 'Inglés I', req: [] }
        ]
    },
    {
        semestre: 2,
        ramos: [
            { id: 'calculo', nombre: 'Cálculo', req: ['algebra'] },
            { id: 'fisiologia', nombre: 'Fisiología', req: ['bio_genetica'] },
            { id: 'quimica_org', nombre: 'Química Orgánica', req: ['quimica_gral'] },
            { id: 'fisica', nombre: 'Física General', req: [] },
            { id: 'identidad_2', nombre: 'Identidad Universitaria II', req: [] },
            { id: 'ingles_2', nombre: 'Inglés II', req: ['ingles_1'] }
        ]
    },
    {
        semestre: 3,
        ramos: [
            { id: 'farmacoquimica_1', nombre: 'Farmacoquímica I', req: ['quimica_org'] },
            { id: 'quimica_analitica', nombre: 'Química Analítica', req: ['quimica_gral'] },
            { id: 'fisiopatologia', nombre: 'Fisiopatología', req: ['fisiologia'] },
            { id: 'bioquimica', nombre: 'Bioquímica', req: ['bio_genetica'] },
            { id: 'etica', nombre: 'Formación Ética para el Desarrollo Sustentable', req: [] },
            { id: 'ingles_3', nombre: 'Inglés III', req: ['ingles_2'] }
        ]
    },
    {
        semestre: 4,
        ramos: [
            { id: 'fisicoquimica_1', nombre: 'Fisicoquímica I', req: ['calculo'] },
            { id: 'microbiologia', nombre: 'Microbiología y Agentes Infecciosos', req: ['bioquimica'] },
            { id: 'farmacologia_1', nombre: 'Farmacología I', req: ['fisiopatologia'] },
            { id: 'analisis_inst', nombre: 'Análisis Instrumental', req: ['quimica_analitica'] },
            { id: 'farmacoquimica_2', nombre: 'Farmacoquímica II', req: ['farmacoquimica_1'] },
            { id: 'rsu', nombre: 'Responsabilidad Social Universitaria', req: ['etica'] },
            { id: 'ingles_4', nombre: 'Inglés IV', req: ['ingles_3'] }
        ]
    },
    {
        semestre: 5,
        ramos: [
            { id: 'bioestadistica', nombre: 'Bioestadística', req: ['calculo'] },
            { id: 'inmunologia', nombre: 'Inmunología y Genética Humana', req: ['bio_genetica'] },
            { id: 'farmacologia_2', nombre: 'Farmacología II', req: ['farmacologia_1'] },
            { id: 'proc_industriales', nombre: 'Procesos Industriales', req: ['fisicoquimica_1'] },
            { id: 'economia', nombre: 'Economía, Contabilidad y Costos', req: [] },
            { id: 'practica_int', nombre: 'Práctica Integrada', req: ['farmacologia_1'] }
        ]
    },
    {
        semestre: 6,
        ramos: [
            { id: 'salud_publica', nombre: 'Salud Pública y Epidemiología', req: ['bioestadistica'] },
            { id: 'gestion_calidad', nombre: 'Sistema de Gestión y Calidad Farmacéutica', req: [] },
            { id: 'tecnologia_f1', nombre: 'Tecnología Farmacéutica I', req: ['proc_industriales'] },
            { id: 'farm_clinica_poli', nombre: 'Farmacología Clínica y Polifarmacia', req: ['farmacologia_2'] },
            { id: 'marketing', nombre: 'Marketing y Gestión del Talento Humano', req: ['economia'] },
            { id: 'botana', nombre: 'Botánica y Farmacognosia', req: ['farmacoquimica_2'] }
        ]
    },
    {
        semestre: 7,
        ramos: [
            { id: 'farm_asistencial', nombre: 'Farmacia Asistencial y Farmacovigilancia', req: ['salud_publica'] },
            { id: 'toxicologia', nombre: 'Toxicología', req: ['inmunologia'] },
            { id: 'biofarmacia', nombre: 'Biofarmacia y Farmacocinética', req: ['bioestadistica'] },
            { id: 'bioquimica_clinica', nombre: 'Bioquímica Clínica', req: ['farm_clinica_poli'] },
            { id: 'electivo_fg1', nombre: 'Electivo de Formación General I', req: [] }
        ]
    },
    {
        semestre: 8,
        ramos: [
            { id: 'farmacia_clinica', nombre: 'Farmacia Clínica', req: ['farm_asistencial'] },
            { id: 'metodologia', nombre: 'Metodología de la Investigación', req: ['salud_publica'] },
            { id: 'tecnologia_f2', nombre: 'Tecnología Farmacéutica II', req: ['tecnologia_f1'] },
            { id: 'nutricion', nombre: 'Nutrición y Bromatología', req: ['bioquimica_clinica'] },
            { id: 'legislacion', nombre: 'Legislación Farmacéutica', req: [] },
            { id: 'electivo_fg2', nombre: 'Electivo de Formación General II', req: [] }
        ]
    },
    {
        semestre: 9,
        ramos: [
            { id: 'ingles_tecnico', nombre: 'Inglés Técnico', req: ['farm_asistencial'] },
            // reqSpecial: 8 indica que requiere todo aprobado hasta el semestre 8
            { id: 'practica_f1', nombre: 'Práctica Farmacéutica I', req: [], reqSpecial: 8 }, 
            { id: 'practica_f2', nombre: 'Práctica Farmacéutica II', req: [], reqSpecial: 8 }
        ]
    },
    {
        semestre: 10,
        ramos: [
            // reqSpecial: 9 indica que requiere todo aprobado hasta el semestre 9
            { id: 'titulacion', nombre: 'Actividad de Titulación', req: [], reqSpecial: 9 },
            { id: 'optativo_esp1', nombre: 'Optativo de Especialización I', req: [], reqSpecial: 9 },
            { id: 'optativo_esp2', nombre: 'Optativo de Especialización II', req: [], reqSpecial: 9 }
        ]
    }
];

// --- 2. Estado y LocalStorage ---

// Cargar estado guardado o iniciar vacío
let aprobados = JSON.parse(localStorage.getItem('malla_aprobados')) || [];

// --- 3. Funciones de Lógica ---

// Función para guardar en el navegador
function guardarEstado() {
    localStorage.setItem('malla_aprobados', JSON.stringify(aprobados));
    calcularProgreso();
}

// Verifica si un ramo específico está aprobado
function estaAprobado(id) {
    return aprobados.includes(id);
}

// Verifica si TODOS los ramos hasta cierto semestre están aprobados
function verificarTodoAprobadoHasta(semestreLimite) {
    for (let i = 0; i < semestreLimite; i++) { // Recorre semestres 0 a semestreLimite-1 (indices array)
        let semestre = mallaData[i];
        for (let ramo of semestre.ramos) {
            if (!estaAprobado(ramo.id)) {
                return false;
            }
        }
    }
    return true;
}

// Verifica si los requisitos de un ramo están cumplidos
function verificarRequisitos(ramo, semIndex) {
    // 1. Chequeo de requisitos directos (lista de IDs)
    const directosCumplidos = ramo.req.every(reqId => estaAprobado(reqId));
    
    // 2. Chequeo especial (todo aprobado hasta semestre X)
    let especialCumplido = true;
    if (ramo.reqSpecial) {
        especialCumplido = verificarTodoAprobadoHasta(ramo.reqSpecial);
    }

    return directosCumplidos && especialCumplido;
}

// Obtener nombres de los requisitos faltantes para mostrar en alerta
function obtenerFaltantes(ramo) {
    let nombresFaltantes = [];
    
    // Requisitos directos
    ramo.req.forEach(reqId => {
        if (!estaAprobado(reqId)) {
            // Buscar el nombre del ID
            mallaData.forEach(sem => {
                sem.ramos.forEach(r => {
                    if (r.id === reqId) nombresFaltantes.push(r.nombre);
                });
            });
        }
    });

    // Requisito especial
    if (ramo.reqSpecial) {
        if (!verificarTodoAprobadoHasta(ramo.reqSpecial)) {
            nombresFaltantes.push(`Todas las asignaturas hasta el ${ramo.reqSpecial}° semestre`);
        }
    }

    return nombresFaltantes;
}

// Acción al hacer clic en un ramo
function toggleRamo(ramo, elementoHTML, semIndex) {
    if (estaAprobado(ramo.id)) {
        // Si ya está aprobado, lo desmarcamos
        aprobados = aprobados.filter(id => id !== ramo.id);
        renderMalla(); // Re-renderizar para actualizar bloqueos de otros ramos
    } else {
        // Intentar aprobar
        if (verificarRequisitos(ramo, semIndex)) {
            aprobados.push(ramo.id);
            renderMalla();
        } else {
            // Mostrar error si está bloqueado
            const faltan = obtenerFaltantes(ramo);
            alert(`🚫 ¡Ramo Bloqueado!\n\nDebes aprobar primero:\n- ${faltan.join('\n- ')}`);
        }
    }
    guardarEstado();
}

function calcularProgreso() {
    let totalRamos = 0;
    mallaData.forEach(sem => totalRamos += sem.ramos.length);
    let porcentaje = Math.round((aprobados.length / totalRamos) * 100);
    document.getElementById('progress-percentage').innerText = porcentaje + '%';
}

function resetMalla() {
    if(confirm("¿Estás seguro de que quieres reiniciar toda la malla?")) {
        aprobados = [];
        guardarEstado();
        renderMalla();
    }
}

// --- 4. Renderizado (Dibujar en pantalla) ---

function renderMalla() {
    const container = document.getElementById('malla-container');
    container.innerHTML = ''; // Limpiar contenido previo

    mallaData.forEach((semestreData, index) => {
        // Crear columna de semestre
        const col = document.createElement('div');
        col.className = 'semester-column';

        // Título del semestre
        const title = document.createElement('div');
        title.className = 'semester-title';
        title.innerText = `Semestre ${semestreData.semestre}`;
        col.appendChild(title);

        // Crear tarjetas de ramos
        semestreData.ramos.forEach(ramo => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerText = ramo.nombre;

            // Verificar estados
            const isAprobado = estaAprobado(ramo.id);
            const requisitosOk = verificarRequisitos(ramo, index);

            if (isAprobado) {
                card.classList.add('approved');
            } else if (!requisitosOk) {
                card.classList.add('blocked');
                card.title = "Requisitos pendientes";
            }

            // Evento Click
            card.onclick = () => toggleRamo(ramo, card, index);

            col.appendChild(card);
        });

        container.appendChild(col);
    });
    
    calcularProgreso();
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderMalla();
});
