document.getElementById('myForm1').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obteniendo los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const email = document.getElementById('email').value;
    const imagen = document.getElementById('imagen').value;

    // Creando un objeto con los valores del formulario
    const formData = {
        nombre,
        apellido,
        edad,
        email,
        imagen
    };

    // Convirtiendo el objeto a formato JSON
    const jsonData = JSON.stringify(formData);

    // Guardando el JSON como archivo (en este ejemplo, se muestra cómo descargarlo)
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'formulario.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Lógica para deserializar el JSON desde un archivo y generar un archivo de texto
document.getElementById('myForm2').addEventListener('click', function (event) {
    event.preventDefault();
    
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const jsonData = event.target.result;
            const formData = JSON.parse(jsonData);

            // Crear un contenido de texto con los datos deserializados
            const content = `Nombre: ${formData.nombre || ''}
Apellido: ${formData.apellido || ''}
Edad: ${formData.edad || ''}
Email: ${formData.email || ''}`;

            // Crear un blob con el contenido de texto
            const blob = new Blob([content], { type: 'text/plain' });

            // Crear un enlace de descarga para el archivo de texto
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'datos_deserializados.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        reader.readAsText(file);
    };

    input.click();
});
