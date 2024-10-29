// Definimos la función showSection de manera global
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Mostrar solo la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add('active');
    } else {
      console.error(`Sección con id ${sectionId} no encontrada.`);
    }
  }
  
  // Esperamos a que el DOM esté cargado antes de mostrar la sección inicial
  document.addEventListener("DOMContentLoaded", () => {
    showSection('add-habit-section'); // Muestra "Agregar Hábito" por defecto al cargar la página
  });
  