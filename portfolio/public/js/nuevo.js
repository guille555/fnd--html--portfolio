document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('createForm');
  const clearFormBtn = document.getElementById('clearFormBtn');
  const responseDialog = document.getElementById('responseDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogMessage = document.getElementById('dialogMessage');
  const closeDialogBtn = document.getElementById('closeDialogBtn');

  let isSuccessOperation = false;

  // Limpiar formulario
  clearFormBtn.addEventListener('click', () => {
    createForm.reset();
  });

  // Envío del formulario
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const repoUrl = document.getElementById('repoUrl').value;

    // Por defecto, a través de JS se agrega el campo "visibilidad"
    const payload = {
      nombre: title,
      descripcion: description,
      url: repoUrl,
      visibilidad: true
    };

    try {
      const response = await fetch('/api/proyectos/nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Error al registrar en el servidor');

      const result = await response.json();

      // Operación positiva
      isSuccessOperation = true;
      dialogTitle.textContent = "¡Operación Exitosa!";
      dialogMessage.textContent = result.message || "El proyecto fue creado satisfactoriamente.";
      responseDialog.showModal();

    } catch (error) {
      console.error('Error:', error);
      isSuccessOperation = false;
      dialogTitle.textContent = "Error";
      dialogMessage.textContent = "No se pudo completar la operación con el servidor.";
      responseDialog.showModal();
    }
  });

  // Cerrar diálogo modal y redirigir si fue exitoso
  closeDialogBtn.addEventListener('click', () => {
    responseDialog.close();
    if (isSuccessOperation) {
      window.location.href = 'lista.html';
    }
  });
});