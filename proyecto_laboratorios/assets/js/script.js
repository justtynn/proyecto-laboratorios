// ============================================
// SCRIPT PRINCIPAL - LABORATORIOS INSUCO
// VERSIÓN CON GALERÍA DE IMÁGENES Y MODAL
// ============================================

// VARIABLES GLOBALES
let currentUser = null;
let labsData = [];
let imagenesActuales = [];
let indiceImagenActual = 0;

// ============================================
// AUTENTICACIÓN
// ============================================

function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            mostrarPanelAdmin();
            actualizarUI();
            console.log('✅ Usuario autenticado:', currentUser.email);
        })
        .catch((error) => {
            alert('❌ Error al iniciar sesión: ' + error.message);
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            currentUser = null;
            ocultarPanelAdmin();
            actualizarUI();
            console.log('✅ Sesión cerrada');
        })
        .catch((error) => {
            alert('❌ Error al cerrar sesión: ' + error.message);
        });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        mostrarPanelAdmin();
        actualizarUI();
        console.log('✅ Usuario ya autenticado:', user.email);
    } else {
        currentUser = null;
        ocultarPanelAdmin();
        actualizarUI();
        console.log('🔓 Usuario no autenticado');
    }
});

// ============================================
// PANEL DE ADMIN
// ============================================

function mostrarPanelAdmin() {
    const panel = document.getElementById('admin-panel');
    if (panel) panel.style.display = 'block';
}

function ocultarPanelAdmin() {
    const panel = document.getElementById('admin-panel');
    if (panel) panel.style.display = 'none';
}

function actualizarUI() {
    const userInfo = document.getElementById('user-info');
    if (userInfo && currentUser) {
        userInfo.textContent = `👤 ${currentUser.email}`;
    }
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
            let disponible = data.disponible;
            if (typeof disponible === 'string') {
                disponible = disponible === 'true' || disponible === 'True' || disponible === '1';
            }
            labsData.push({
                id: doc.id,
                nombre: data.nombre || 'Sin nombre',
                ubicacion: data.ubicacion || 'Sin ubicación',
                equipos: data.equipos || 0,
                so: data.so || 'No especificado',
                horario: data.horario || 'Sin horario',
                disponible: disponible,
                imagenes: data.imagenes || []
            });
        });
        console.log('📊 Datos obtenidos:', labsData);
        renderizarLaboratorios();
    } catch (error) {
        console.error('❌ Error al obtener datos:', error);
        labsData = obtenerDatosRespaldo();
        renderizarLaboratorios();
    }
}

// ============================================
// RENDERIZAR LABORATORIOS
// ============================================

function renderizarLaboratorios() {
    const grid = document.getElementById('laboratorios-grid');
    if (!grid) return;

    if (labsData.length === 0) {
        grid.innerHTML = `
            <div class="no-labs">
                <p>No hay laboratorios disponibles</p>
                <button onclick="inicializarDatos()" class="btn">Inicializar datos</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    labsData.forEach((lab) => {
        const card = document.createElement('div');
        card.className = 'lab-card';
        
        const disponible = lab.disponible === true;
        const estadoClass = disponible ? 'disponible' : 'ocupado';
        const estadoText = disponible ? '✅ Disponible' : '⛔ Ocupado';

        // Galería de imágenes con referrerpolicy para evitar bloqueo de Imgur
        const galeriaHTML = (lab.imagenes && lab.imagenes.length > 0) ? `
            <div class="lab-galeria">
                <h4>📸 Fotos del laboratorio</h4>
                <div class="galeria-thumbnails">
                    ${lab.imagenes.map((img, index) => `
                        <img 
                            src="${img}" 
                            alt="${lab.nombre} - Foto ${index + 1}" 
                            class="thumbnail"
                            onclick="abrirModalImagen('${lab.id}', ${index})"
                            onerror="this.style.display='none'"
                            referrerpolicy="no-referrer"
                            loading="lazy"
                        >
                    `).join('')}
                </div>
            </div>
        ` : '';

        card.innerHTML = `
            <h3>${lab.nombre}</h3>
            <div class="lab-info">
                <p><span class="icon">📍</span> <strong>Ubicación:</strong> ${lab.ubicacion}</p>
                <p><span class="icon">💻</span> <strong>Equipos:</strong> ${lab.equipos} computadoras</p>
                <p><span class="icon">🖥️</span> <strong>S.O.:</strong> ${lab.so}</p>
                <p><span class="icon">🕐</span> <strong>Horario:</strong> ${lab.horario}</p>
                <p><span class="estado ${estadoClass}">${estadoText}</span></p>
                ${currentUser ? `
                    <button onclick="toggleDisponibilidad('${lab.id}')" class="btn-toggle">
                        Cambiar disponibilidad
                    </button>
                ` : ''}
                ${galeriaHTML}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============================================
// CAMBIAR DISPONIBILIDAD
// ============================================

async function toggleDisponibilidad(labId) {
    if (!currentUser) {
        alert('⚠️ Debes iniciar sesión para cambiar la disponibilidad');
        return;
    }

    try {
        console.log('🔄 Intentando cambiar disponibilidad del lab:', labId);
        
        const lab = labsData.find(l => l.id === labId);
        if (!lab) {
            console.error('❌ Laboratorio no encontrado:', labId);
            alert('❌ Laboratorio no encontrado. Recarga la página.');
            return;
        }

        const nuevoEstado = !lab.disponible;
        console.log(`🔄 Cambiando ${lab.nombre}: ${lab.disponible} → ${nuevoEstado}`);

        await db.collection('laboratorios').doc(labId).update({
            disponible: nuevoEstado
        });

        lab.disponible = nuevoEstado;
        renderizarLaboratorios();
        console.log(`✅ Disponibilidad de ${lab.nombre} actualizada`);
        
    } catch (error) {
        console.error('❌ Error al actualizar:', error);
        
        let mensajeError = 'Error al cambiar disponibilidad';
        if (error.code === 'permission-denied') {
            mensajeError = 'No tienes permisos para modificar la disponibilidad.';
        } else if (error.code === 'not-found') {
            mensajeError = 'El laboratorio no existe en la base de datos.';
        } else if (error.message) {
            mensajeError = error.message;
        }
        
        alert(`❌ ${mensajeError}`);
    }
}

// ============================================
// MODAL DE IMÁGENES (LIGHTBOX)
// ============================================

function abrirModalImagen(labId, indice) {
    const lab = labsData.find(l => l.id === labId);
    if (!lab || !lab.imagenes || lab.imagenes.length === 0) return;

    imagenesActuales = lab.imagenes;
    indiceImagenActual = indice;

    const modal = document.getElementById('image-modal');
    const img = document.getElementById('imageModalImg');
    
    if (!modal || !img) return;

    img.src = imagenesActuales[indiceImagenActual];
    img.setAttribute('referrerpolicy', 'no-referrer');
    modal.classList.add('active');
    actualizarContador();
    document.body.style.overflow = 'hidden';
}

function cerrarModalImagen() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function siguienteImagen() {
    if (imagenesActuales.length === 0) return;
    indiceImagenActual = (indiceImagenActual + 1) % imagenesActuales.length;
    document.getElementById('imageModalImg').src = imagenesActuales[indiceImagenActual];
    actualizarContador();
}

function anteriorImagen() {
    if (imagenesActuales.length === 0) return;
    indiceImagenActual = (indiceImagenActual - 1 + imagenesActuales.length) % imagenesActuales.length;
    document.getElementById('imageModalImg').src = imagenesActuales[indiceImagenActual];
    actualizarContador();
}

function actualizarContador() {
    const counter = document.getElementById('imageModalCounter');
    if (counter) {
        counter.textContent = `${indiceImagenActual + 1} / ${imagenesActuales.length}`;
    }
}

// ============================================
// DATOS DE RESPALDO
// ============================================

function obtenerDatosRespaldo() {
    return [
        {
            id: 'lab1', nombre: 'Laboratorio 1', ubicacion: 'Piso 2, Ala Sur',
            equipos: 30, so: 'Windows 11 / Linux Ubuntu', horario: '8:00 - 16:05',
            disponible: false, imagenes: []
        },
        {
            id: 'lab2', nombre: 'Laboratorio 2', ubicacion: 'Piso 2, Ala Sur',
            equipos: 25, so: 'Windows 11 / Linux Ubuntu', horario: '8:00 - 16:05',
            disponible: true, imagenes: []
        },
        {
            id: 'lab3', nombre: 'Laboratorio 3', ubicacion: 'Piso 3, Ala Este',
            equipos: 36, so: 'Windows 11 / Linux', horario: '8:00 - 17:00',
            disponible: true, imagenes: []
        },
        {
            id: 'lab4', nombre: 'Laboratorio 4', ubicacion: 'Piso 4, Ala Sur',
            equipos: 28, so: 'Windows 10', horario: '8:00 - 16:05',
            disponible: false, imagenes: []
        },
        {
            id: 'lab5', nombre: 'Laboratorio 5', ubicacion: 'Piso 3, Ala Este',
            equipos: 20, so: 'Ubuntu', horario: '8:00 - 17:00',
            disponible: true, imagenes: []
        }
    ];
}

// ============================================
// INICIALIZAR DATOS EN FIRESTORE
// ============================================

async function inicializarDatos() {
    try {
        console.log('🔄 Inicializando datos en Firestore...');
        const labs = obtenerDatosRespaldo();
        for (const lab of labs) {
            await db.collection('laboratorios').doc(lab.id).set(lab);
            console.log(`✅ ${lab.nombre} guardado`);
        }
        console.log('✅ Datos inicializados en Firestore');
        await obtenerLaboratorios();
        alert('✅ Datos inicializados correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar datos:', error);
        alert('❌ Error al inicializar datos: ' + error.message);
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
                let disponible = data.disponible;
                if (typeof disponible === 'string') {
                    disponible = disponible === 'true' || disponible === 'True' || disponible === '1';
                }
                labsData.push({
                    id: doc.id,
                    nombre: data.nombre || 'Sin nombre',
                    ubicacion: data.ubicacion || 'Sin ubicación',
                    equipos: data.equipos || 0,
                    so: data.so || 'No especificado',
                    horario: data.horario || 'Sin horario',
                    disponible: disponible,
                    imagenes: data.imagenes || []
                });
            });
            renderizarLaboratorios();
            console.log('🔄 Datos actualizados en tiempo real');
        }, (error) => {
            console.error('❌ Error al escuchar cambios:', error);
        });
}

// ============================================
// INICIALIZAR
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Modal de imágenes
    const modal = document.getElementById('image-modal');
    const closeBtn = document.getElementById('imageModalClose');
    const prevBtn = document.getElementById('imageModalPrev');
    const nextBtn = document.getElementById('imageModalNext');

    if (closeBtn) closeBtn.addEventListener('click', cerrarModalImagen);
    if (prevBtn) prevBtn.addEventListener('click', anteriorImagen);
    if (nextBtn) nextBtn.addEventListener('click', siguienteImagen);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalImagen();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') cerrarModalImagen();
        if (e.key === 'ArrowRight') siguienteImagen();
        if (e.key === 'ArrowLeft') anteriorImagen();
    });

    // Datos
    obtenerLaboratorios();
    escucharCambios();
});