/*
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

<div class="project-card">
  <h3>E-commerce Dashboard</h3>
  <p>Panel de administración moderno construido con componentes interactivos para la gestión de inventario y
    métricas de ventas.</p>
  <a href="https://github.com/usuario/ecommerce-dashboard" target="_blank" rel="noopener">Ver Repositorio</a>
</div>

*/

async function fetchProjects() {
  try {
    const response = await fetch("/api/proyectos");
    if (!response.ok) throw new Error('Error al obtener los proyectos');
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');

  // Funcionalidad básica para alternar el menú en dispositivos móviles
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  let lista = await fetchProjects();
  lista = lista.filter(item => item.visibilidad);

  let objetivo = document.querySelector(".projects-grid");
  let fragmento = document.createDocumentFragment();
  lista.forEach(p => {
    let cn = document.createElement("DIV");
    cn.classList.add("project-card");
    cn.innerHTML=`
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <a href=${p.url} target="_blank" rel="noopener">Ver Repositorio</a>
    `;
    fragmento.append(cn);
  });
  objetivo.append(fragmento);
});
