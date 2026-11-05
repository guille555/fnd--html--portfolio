document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.getElementById('projectsGrid');
  const searchBtn = document.getElementById('searchBtn');
  const clearBtn = document.getElementById('clearBtn');
  const filterName = document.getElementById('filterName');
  const filterStatus = document.getElementById('filterStatus');

  const deleteDialog = document.getElementById('deleteDialog');
  const confirmDeleteYes = document.getElementById('confirmDeleteYes');
  const confirmDeleteNo = document.getElementById('confirmDeleteNo');

  let projectToDeleteId = null;
  let allProjects = [];

  // Función para obtener y renderizar proyectos desde el servidor
  async function fetchProjects() {
    try {
      const response = await fetch("/api/proyectos");
      if (!response.ok) throw new Error('Error al obtener los proyectos');
      allProjects = await response.json();
      renderProjects(allProjects);
    } catch (error) {
      projectsGrid.innerHTML = '<p>No se pudieron cargar los proyectos.</p>';
    }
  }

  function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    if (projects.length === 0) {
      projectsGrid.innerHTML = '<p>No se encontraron proyectos.</p>';
      return;
    }

    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      const statusClass = project.visibilidad ? 'badge-visible' : 'badge-inactivo';
      const statusText = project.visibilidad ? 'público' : "privado";

      card.innerHTML = `
        <div>
          <div class="project-card-header">
            <h3>${project.nombre}</h3>
            <div class="project-actions">
              <i class="fa-solid fa-edit" title="Editar" data-id="${project.id}"></i>
              <i class="fa-solid fa-trash-alt" title="Eliminar" data-id="${project.id}"></i>
            </div>
          </div>
          <span class="badge ${statusClass}">${statusText}</span>
          <p class="proyecto_descripcion">${project.descripcion}</p>
        </div>
        <a href="${project.url || '#'}" target="_blank" rel="noopener" class="proyecto_url">Ver Repositorio</a>
      `;
      projectsGrid.appendChild(card);
    });
    // Asignar eventos a los iconos de las tarjetas
    attachCardListeners();
  }

  // Eventos para Editar y Eliminar
  function attachCardListeners() {
    document.querySelectorAll('.fa-edit').forEach(icon => {
      icon.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        // Redirigir a la vista de edición pasando el ID por parámetro URL
        window.location.href = `modificar.html?id=${id}`;
      });
    });

    document.querySelectorAll('.fa-trash-alt').forEach(icon => {
      icon.addEventListener('click', (e) => {
        projectToDeleteId = e.target.getAttribute('data-id');
        deleteDialog.showModal(); // Abre el diálogo modal de confirmación
      });
    });
  }

  // Lógica del diálogo de eliminación ("Sí" / "No")
  confirmDeleteNo.addEventListener('click', () => {
    projectToDeleteId = null;
    deleteDialog.close();
  });

  confirmDeleteYes.addEventListener('click', async () => {
    if (!projectToDeleteId) return;

    try {
      let config = {
        method: "DELETE"
      }
      const response = await fetch(`/api/proyectos/eliminar/${projectToDeleteId}`, config);

      if (!response.ok) throw new Error('Error al eliminar el proyecto');

      deleteDialog.close();
      projectToDeleteId = null;
      fetchProjects(); // Recargar lista desde el servidor
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al eliminar el registro.');
    }
  });

  // Filtrado interactivo
  searchBtn.addEventListener('click', () => {
    const nameQuery = filterName.value.toLowerCase();
    const statusQuery = filterStatus.value === "true";

    const filtered = allProjects.filter(p => {
      const matchesName = p.nombre.toLowerCase().includes(nameQuery);
      return matchesName && (p.visibilidad === statusQuery);
    });

    renderProjects(filtered);
  });

  // Botón de limpiar filtros y recargar lista
  clearBtn.addEventListener('click', () => {
    filterName.value = '';
    filterStatus.value = '';
    renderProjects(allProjects);
  });

  // Inicializar carga de datos
  fetchProjects();
});
