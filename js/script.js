async function cargarTexto(archivo) {
    const contenido = document.getElementById('contenido');
    
    try {
        const respuesta = await fetch(`textos/${archivo}`);
        
        // Si el archivo no existe (404) o hay error de ruta
        if (!respuesta.ok) {
            contenido.innerHTML = `<p style="color: red; text-align: center;">
                Error: No se encontró el archivo "${archivo}".<br><br>
                Posibles causas:<br>
                • El nombre del archivo no coincide exactamente (mayúsculas, guiones, .txt).<br>
                • La carpeta se llama "Textos" en vez de "textos" (debe ser minúsculas).<br>
                • El archivo no está subido a GitHub.
            </p>`;
            console.error(`Error ${respuesta.status}: ${respuesta.statusText} - Archivo: textos/${archivo}`);
            return;
        }

        const texto = await respuesta.text();

        // Convertir saltos de línea en párrafos
        const parrafos = texto.split('\n\n').filter(p => p.trim() !== '');
        contenido.innerHTML = parrafos.map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`).join('');

        console.log(`Libro cargado correctamente: ${archivo}`);

    } catch (error) {
        // Error de red o conexión
        contenido.innerHTML = `<p style="color: red; text-align: center;">
            Error de conexión: No se pudo cargar el libro.<br>
            Revisa tu internet o intenta más tarde.
        </p>`;
        console.error('Error de red:', error);
    }
}

function cambiarModo() {
    document.body.classList.toggle('modo-oscuro');
    document.body.classList.toggle('modo-claro');
    document.getElementById('boton-modo').textContent = document.body.classList.contains('modo-oscuro') ? 'Modo claro' : 'Modo oscuro';
}
