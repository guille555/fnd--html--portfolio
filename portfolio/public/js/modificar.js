document.addEventListener('DOMContentLoaded', async () => {
  const editForm = document.getElementById('editForm');
  const projectIdInput = document.getElementById('projectId');
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const repoUrlInput = document.getElementById('repoUrl');
  const visibilidadSelect = document.getElementById('visibilidad');
  const clearEditBtn = document.getElementById('clearEditBtn');

  const responseDialog = document.getElementById('responseDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogMessage = document.getElementById('dialogMessage');
  const closeDialogBtn = document.getElementById('closeDialogBtn');

  let isSuccessOperation = false;

  // Obtener el ID del proyecto desde los parámetros de la URL (ej. ?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId) {
    alert('No se especificó un ID de proyecto válido.');
    window.location.href = 'lista.html';
    return;
  }

  // Cargar la información actual del proyecto al ingresar a la vista
  try {
    const response = await fetch(`/api/proyectos/${projectId}`);
    if (!response.ok) throw new Error('No se pudo obtener la información del proyecto');

    const { datos } = await response.json();
    console.log(datos);

    // Rellenar el formulario con los datos existentes
    projectIdInput.value = datos.id;
    titleInput.value = datos.nombre;
    descriptionInput.value = datos.descripcion;
    repoUrlInput.value = datos.url || '';
    visibilidadSelect.value = datos.visibilidad;

  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar los datos del proyecto.');
    window.location.href = 'lista.html';
  }

  clearEditBtn.addEventListener('click', () => {
    editForm.reset();
  });

  // Envío de la modificación al servidor
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // El ID se obtiene del objeto que se va a enviar para modificar
    const updatedProject = {
      id: projectIdInput.value,
      nombre: titleInput.value,
      descripcion: descriptionInput.value,
      url: repoUrlInput.value,
      visibilidad: visibilidadSelect.value === "true"
    };

    try {
      const response = await fetch(`/api/proyectos/actualizar`, {
        method: 'PUT', // o PATCH según prefiera el backend
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProject)
      });

      if (!response.ok) throw new Error('Error al actualizar el registro');

      isSuccessOperation = true;
      dialogTitle.textContent = "¡Actualizado!";
      dialogMessage.textContent = "El proyecto se ha modificado con éxito.";
      responseDialog.showModal();

    } catch (error) {
      console.error('Error:', error);
      isSuccessOperation = false;
      dialogTitle.textContent = "Error";
      dialogMessage.textContent = "Hubo un problema al guardar los cambios.";
      responseDialog.showModal();
    }
  });

  closeDialogBtn.addEventListener('click', () => {
    responseDialog.close();
    if (isSuccessOperation) {
      window.location.href = 'lista.html';
    }
  });
});
