// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB3Aia_g9y_CpKXbNsLfdBmlocnmPRKhlI",
    authDomain: "app-habitos-32de7.firebaseapp.com",
    databaseURL: "https://app-habitos-32de7-default-rtdb.firebaseio.com/",
    projectId: "app-habitos-32de7",
    storageBucket: "app-habitos-32de7.appspot.com",
    messagingSenderId: "732855675001",
    appId: "1:732855675001:web:5f5ed31507495839488ca8",
    measurementId: "G-ESEFTEB89J"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Función para mostrar y ocultar secciones
function mostrarSeccion(idSeccion) {
    // Remover la clase 'activa' de todas las secciones
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('activa');
    });

    // Activar la sección seleccionada
    const seccionSeleccionada = document.getElementById(idSeccion);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('activa');
        
        // Cargar los hábitos cuando se muestra la sección
        if (idSeccion === 'seccion-ver-habitos') {
            mostrarHabitos();
        }
    } else {
        console.error(`Sección con id ${idSeccion} no encontrada.`);
    }

    // Actualizar la clase 'active' en los botones de navegación
    document.querySelectorAll('.pestañas button').forEach(button => {
        button.classList.remove('active');
    });
    const buttonSeleccionado = document.querySelector(`.pestañas button[onclick="mostrarSeccion('${idSeccion}')"]`);
    if (buttonSeleccionado) {
        buttonSeleccionado.classList.add('active');
    }
}

// Función para agregar un nuevo hábito
function agregarHabito(event) {
    event.preventDefault();
    const nombreHábito = document.getElementById('nombre-habito').value;
    
    if (nombreHábito) {
        const nuevoHabitoRef = db.ref('habitos').push();
        nuevoHabitoRef.set({
            nombre: nombreHábito,
            fecha: new Date().toISOString()
        });

        const mensaje = document.getElementById('mensaje-confirmacion');
        mensaje.classList.remove('oculto');
        document.getElementById('formulario-agregar-habito').reset();

        setTimeout(() => {
            mensaje.classList.add('oculto');
        }, 3000);
    }
}

// Función para mostrar los hábitos en la sección de "Ver Hábitos"
function mostrarHabitos() {
    const contenedorProgreso = document.getElementById('progreso-habitos');
    contenedorProgreso.innerHTML = ''; // Limpiar el contenido antes de mostrar los hábitos

    db.ref('habitos').on('value', (snapshot) => {
        contenedorProgreso.innerHTML = ''; // Limpiar el contenido antes de mostrar los hábitos

        snapshot.forEach((childSnapshot) => {
            const habito = childSnapshot.val();
            const habitoElemento = document.createElement('div');
            habitoElemento.classList.add('progreso-habito-item');
            habitoElemento.innerHTML = `
                <h3>${habito.nombre}</h3>
                <p>Fecha de creación: ${new Date(habito.fecha).toLocaleDateString()}</p>
                <canvas id="grafico-${childSnapshot.key}"></canvas>
            `;
            contenedorProgreso.appendChild(habitoElemento);

            // Aquí puedes agregar un gráfico para visualizar el progreso del hábito
            // Si usas Chart.js, puedes inicializar el gráfico con el canvas
            // const ctx = document.getElementById(`grafico-${childSnapshot.key}`).getContext('2d');
            // Aquí puedes definir tu gráfico
        });
    });
}

// Función para seleccionar todos los días cuando se activa "Notificación Diaria"
function seleccionarDias() {
    const notificacionDiaria = document.getElementById('notificacion-diaria').checked;
    const checkboxesDias = document.querySelectorAll('#dias-semana input[type="checkbox"]');
    
    checkboxesDias.forEach(checkbox => {
        checkbox.checked = notificacionDiaria;
    });
}

// Función para seleccionar el tipo de notificación
function seleccionarTipoNotificacion(tipo) {
    const frecuenciaHorasInput = document.getElementById('frecuencia-horas');
    const horaEspecificaInput = document.getElementById('hora-especifica');

    if (tipo === 'frecuencia-horas') {
        frecuenciaHorasInput.disabled = false;
        horaEspecificaInput.disabled = true;
    } else if (tipo === 'hora-especifica') {
        frecuenciaHorasInput.disabled = true;
        horaEspecificaInput.disabled = false;
    }
}
