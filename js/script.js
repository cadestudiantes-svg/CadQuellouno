async function cargarLibro(archivo) {
    try {
        const respuesta = await fetch(`textos/${archivo}`);
        const texto = await respuesta.text();

        const contenido = document.getElementById('contenido');
        // Convertir saltos de línea en párrafos para mejor lectura
        const parrafos = texto.split('\n\n').filter(p => p.trim() !== '');
        contenido.innerHTML = parrafos.map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`).join('');

    } catch (error) {
        document.getElementById('contenido').innerHTML = '<p>Error al cargar el libro.</p>';
        console.error(error);
    }
}

function cambiarModo() {
    document.body.classList.toggle('modo-oscuro');
    document.body.classList.toggle('modo-claro');
}