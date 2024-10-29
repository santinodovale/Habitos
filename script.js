document.getElementById('add-habit-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const habitName = document.getElementById('habit-name').value;
    const notificationType = document.querySelector('input[name="notification-type"]:checked').value;
    let notificationFrequencyHours = null;
    let specificTime = null;

    // Determinar qué opción ha seleccionado el usuario
    if (notificationType === "frecuencia-horas") {
        notificationFrequencyHours = document.getElementById('notification-frequency-hours').value;
    } else if (notificationType === "hora-especifica") {
        specificTime = document.getElementById('specific-time').value;
    }

    const newHabit = {
        name: habitName,
        notificationType: notificationType,
        notificationFrequencyHours: notificationFrequencyHours,
        specificTime: specificTime
    };

    // Guardar el nuevo hábito en la base de datos
    try {
        const response = await fetch('http://localhost:3000/api/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHabit)
        });

        if (!response.ok) {
            throw new Error('Error al agregar el hábito');
        }

        // Limpia el formulario después de agregar el hábito
        document.getElementById('add-habit-form').reset();
    } catch (error) {
        console.error(error);
    }
});
