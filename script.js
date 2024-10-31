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
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('activa');
    });
    
    const seccionSeleccionada = document.getElementById(idSeccion);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('activa');
    } else {
        console.error(`Sección con id ${idSeccion} no encontrada.`);
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
