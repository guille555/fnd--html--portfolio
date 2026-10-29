async function cargarPryectos() {
  try {
    let respuesta = await fetch("/api/proyectos");
    if (!respuesta.ok) throw new Error("error");

    let resultado = await respuesta.json();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');

  // Funcionalidad básica para alternar el menú en dispositivos móviles
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  cargarPryectos();
});
