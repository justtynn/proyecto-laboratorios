
let labsData = [];
let marcadorSeleccionado = null;

// ============================================
// OBTENER COORDENADAS DE LOS LABORATORIOS
// ============================================

// Coordenadas porcentuales sobre el plano (%)
// Estas deben ajustarse según el plano real
const COORDENADAS_LABS = {
    'lab1': { x: 15, y: 30 },   // Laboratorio 1
    'lab2': { x: 35, y: 30 },   // Laboratorio 2
    'lab3': { x: 55, y: 30 },   // Laboratorio 3
    'lab4': { x: 75, y: 30 },   // Laboratorio 4
    'lab5': { x: 45, y: 65 }    // Laboratorio 5
};

// ============================================
// RENDERIZAR MARCADORES
// ============================================

function renderizarMarcadores() {
    const container = document.getElementById('marcadores-container');
    if (!container) return;

    container.innerHTML = '';

    labsData.forEach((lab) => {
        const coords = COORDENADAS_LABS[lab.id];
        if (!coords) return;

        const marcador = document.createElement('div');
        marcador.className = `marcador ${lab.disponible ? 'disponible' : 'ocupado'}`;
        marcador.dataset.id = lab.id;
        marcador.style.left = coords.x + '%';
        marcador.style.top = coords.y + '%';

        // Tooltip con nombre
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = lab.nombre;
        marcador.appendChild(tooltip);

        // Evento click
        marcador.addEventListener('click', () => {
            seleccionarLaboratorio(lab.id);
        });

        container.appendChild(marcador);
    });
}

// ============================================
// SELECCIONAR LABORATORIO
// ============================================

function seleccionarLaboratorio(labId) {
    // Eliminar selección anterior
    if (marcadorSeleccionado) {
        const anterior = document.querySelector(`.marcador[data-id="${marcadorSeleccionado}"]`);
        if (anterior) {
            anterior.classList.remove('seleccionado');
        }
    }

    // Marcar nuevo seleccionado
    const marcador = document.querySelector(`.marcador[data-id="${labId}"]`);
    if (marcador) {
        marcador.classList.add('seleccionado');
        marcadorSeleccionado = labId;
    }

    // Mostrar información en el panel
    const lab = labsData.find(l => l.id === labId);
    if (lab) {
        mostrarInformacion(lab);
    }
}

// ============================================
// MOSTRAR INFORMACIÓN EN EL PANEL
// ============================================

function mostrarInformacion(lab) {
    const container = document.getElementById('infoPanelContent');
    if (!container) return;

    const estadoClass = lab.disponible ? 'disponible' : 'ocupado';
    const estadoText = lab.disponible ? '✅ Disponible' : '⛔ Ocupado';

    container.innerHTML = `
        <div class="info-detalle">
            <h4>${lab.nombre}</h4>
            <p><strong>📍 Ubicación:</strong> ${lab.ubicacion}</p>
            <p><strong>💻 Equipos:</strong> ${lab.equipos}</p>
            <p><strong>🖥️ S.O.:</strong> ${lab.so}</p>
            <p><strong>🕐 Horario:</strong> ${lab.horario}</p>
            <p><strong>📊 Estado:</strong> <span class="estado ${estadoClass}">${estadoText}</span></p>
            <a href="laboratorios.html" class="btn-ver-detalles">Ver más detalles →</a>
        </div>
    `;
}

// ============================================
// OBTENER DATOS DE FIRESTORE
// ============================================

async function obtenerLaboratorios() {
    try {
        const snapshot = await db.collection('laboratorios').get();
        labsData = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            labsData.push({
                id: doc.id,
                nombre: data.nombre || 'Sin nombre',
                ubicacion: data.ubicacion || 'Sin ubicación',
                equipos: data.equipos || 0,
                so: data.so || 'No especificado',
                horario: data.horario || 'Sin horario',
                disponible: data.disponible === true
            });
        });
        renderizarMarcadores();
    } catch (error) {
        console.error('❌ Error al obtener datos:', error);
    }
}

// ============================================
// ESCUCHAR CAMBIOS EN TIEMPO REAL
// ============================================

function escucharCambios() {
    db.collection('laboratorios')
        .onSnapshot((snapshot) => {
            labsData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                labsData.push({
                    id: doc.id,
                    nombre: data.nombre || 'Sin nombre',
                    ubicacion: data.ubicacion || 'Sin ubicación',
                    equipos: data.equipos || 0,
                    so: data.so || 'No especificado',
                    horario: data.horario || 'Sin horario',
                    disponible: data.disponible === true
                });
            });
            renderizarMarcadores();
            // Si hay un laboratorio seleccionado, actualizar su información
            if (marcadorSeleccionado) {
                const lab = labsData.find(l => l.id === marcadorSeleccionado);
                if (lab) {
                    mostrarInformacion(lab);
                }
            }
        }, (error) => {
            console.error('❌ Error al escuchar cambios:', error);
        });
}

// ============================================
// CERRAR PANEL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const closePanel = document.getElementById('closePanel');
    if (closePanel) {
        closePanel.addEventListener('click', () => {
            if (marcadorSeleccionado) {
                const marcador = document.querySelector(`.marcador[data-id="${marcadorSeleccionado}"]`);
                if (marcador) {
                    marcador.classList.remove('seleccionado');
                }
                marcadorSeleccionado = null;
                document.getElementById('infoPanelContent').innerHTML = `
                    <p class="info-placeholder">Haz clic en un laboratorio para ver su información</p>
                `;
            }
        });
    }

    // Obtener datos
    obtenerLaboratorios();
    escucharCambios();
});