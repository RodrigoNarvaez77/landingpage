function preloader(){
    window.addEventListener('load', function () {
        const preloader = document.getElementById('preloader');
        const mainContent = document.getElementById('main-content');

        // Mostrar contenido principal antes de ocultar el preloader
        setTimeout(() => {
            mainContent.style.visibility = 'visible'; // Hacer visible el contenido
            mainContent.style.opacity = '1'; // Aparecer suavemente
            preloader.style.opacity = '0'; // Desvanecer el preloader
            preloader.style.transition = 'opacity 0.5s ease'; // Transición de opacidad

            // Retirar completamente el preloader
            setTimeout(() => {
                preloader.style.display = 'none'; // Eliminar preloader del flujo
                document.body.style.overflow = 'auto'; // Reactivar scroll
            }, 500); // Tiempo de fadeOut
        }, 2000); // Mantener visible el preloader durante 2 segundos
    });
}

preloader()
