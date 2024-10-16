document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('#navbar-principal');
        const scrollPosicion = window.scrollY;
        const viewportAltura = window.innerHeight;
        const navbarTitle = this.document.querySelector('#div-central');

        if (scrollPosicion >= viewportAltura *0.95) {
            navbar.style.backgroundColor = 'white';
            navbarTitle.style.visibility = 'visible';
            // navbarTitle.style.animationPlayState = 'running'; 
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbarTitle.style.visibility = 'hidden';
            // navbarTitle.style.animationPlayState = 'paused'; 
        }
    });
});
