const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('is-open');
    });
}

const links = document.querySelectorAll('.nav__list a');
links.forEach((link) => {
    link.addEventListener('click', () => {
        navList.classList.remove('is-open');
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.18,
    }
);

document.querySelectorAll('.section, .project-card, .insight-card, .about__card, .timeline__item').forEach((element) => {
    element.classList.add('fade-up');
    observer.observe(element);
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__list a');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove('active'));
                const active = document.querySelector(`.nav__list a[href="#${entry.target.id}"]`);
                if (active) {
                    active.classList.add('active');
                }
            }
        });
    },
    {
        threshold: 0.35,
    }
);

sections.forEach((section) => sectionObserver.observe(section));
