// Manejar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario-contacto');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validar campos (puedes agregar más validaciones aquí)
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }
            
            // Simular envío (aquí podrías conectar con un servidor real)
            console.log('Datos del formulario:', {
                nombre,
                email,
                telefono,
                asunto,
                mensaje
            });
            
            // Mostrar mensaje de éxito
            mensajeExito.style.display = 'block';
            
            // Limpiar formulario
            form.reset();
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(function() {
                mensajeExito.style.display = 'none';
            }, 5000);
        });
    }
});