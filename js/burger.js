document.addEventListener('DOMContentLoaded', function() {
    const navCheck = document.getElementById('nav-check');
    const navLinks = document.querySelectorAll('header .nav-links a');
    const body = document.body;

    function toggleMenu() {
        if (navCheck.checked) {
        body.classList.add('no-scroll');
        } else {
        body.classList.remove('no-scroll');
        }
    }

    navCheck.addEventListener('change', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
        navCheck.checked = false;
        toggleMenu();
        });
    });

    toggleMenu();
});
