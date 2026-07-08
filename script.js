
/*==================================================
OCA ENGENHARIA - SCRIPT PRINCIPAL
==================================================*/



/*==================================================
MENU MOBILE
==================================================*/

const menuToggle = document.getElementById("menuToggle");

const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    nav.classList.toggle("active");

});

// Fechar menu ao clicar em um link

const navLinks = nav.querySelectorAll("a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        nav.classList.remove("active");

    });

});



/*==================================================
LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1200);

});



/*==================================================
HEADER SCROLL EFFECT
==================================================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/*==================================================
ANIMAÇÃO DOS PROJETOS AO SCROLL
==================================================*/

const projects = document.querySelectorAll(".project");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.35

});

projects.forEach(p => observer.observe(p));

// Ensure project content is visible on small screens where IntersectionObserver
// thresholds can fail (mobile). Force `show` class when viewport is narrow.
if(window.innerWidth <= 768){
    projects.forEach(p => p.classList.add('show'));
}



/*==================================================
MODAL DE PROJETOS
==================================================*/

const modal = document.getElementById("projectModal");

const closeModal = document.getElementById("closeModal");

const btns = document.querySelectorAll(".btn-project");

btns.forEach(btn => {

    btn.addEventListener("click", (e) => {

        e.preventDefault();

        // find the project article for this button
        const project = btn.closest('.project');

        // fallback: open modal without populating if project not found
        if(!project){
            modal.classList.add('active');
            return;
        }

        // Elements inside the project
        const projectImg = project.querySelector('img');
        const projectTitle = project.querySelector('.project-content h2')?.textContent.trim() || project.querySelector('h2')?.textContent.trim() || 'Nome do Projeto';
        const projectLocation = project.querySelector('.project-location')?.textContent.trim() || '';
        const projectCategory = project.querySelector('.project-content h3')?.textContent.trim() || '';
        const projectDesc = project.querySelector('.project-content p')?.textContent.trim() || '';

        // Modal elements
        const modalGallery = modal.querySelector('.modal-gallery');
        const modalLocation = modal.querySelector('.modal-location');
        const modalTitle = modal.querySelector('.modal-info h2');
        const modalDesc = modal.querySelector('.modal-info p');

        // Clear and populate gallery as a carousel
        modalGallery.innerHTML = '';
        let imgs = [];
        if(project.dataset.images){
            imgs = project.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
        } else if(projectImg){
            imgs = [projectImg.getAttribute('src')];
        }

        // Build carousel container
        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        const imgEl = document.createElement('img');
        imgEl.className = 'carousel-image';
        imgEl.alt = projectTitle;
        carousel.appendChild(imgEl);

        // controls
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-prev';
        prevBtn.setAttribute('aria-label','Anterior');
        prevBtn.textContent = '‹';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-next';
        nextBtn.setAttribute('aria-label','Próximo');
        nextBtn.textContent = '›';

        const counter = document.createElement('div');
        counter.className = 'carousel-counter';

        modalGallery.appendChild(prevBtn);
        modalGallery.appendChild(carousel);
        modalGallery.appendChild(nextBtn);
        modalGallery.appendChild(counter);

        let current = 0;
        function render(){
            if(!imgs || imgs.length === 0){
                imgEl.src = '';
                counter.textContent = '';
                return;
            }
            imgEl.src = imgs[current];
            counter.textContent = `${current+1} / ${imgs.length}`;
        }

        function prev(){
            current = (current - 1 + imgs.length) % imgs.length;
            render();
        }

        function next(){
            current = (current + 1) % imgs.length;
            render();
        }

        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);

        // keyboard navigation while modal open
        function keyHandler(e){
            if(e.key === 'ArrowLeft') prev();
            if(e.key === 'ArrowRight') next();
            if(e.key === 'Escape') modal.classList.remove('active');
        }

        // Attach key handler when modal opens, detach when closes
        document.addEventListener('keydown', keyHandler);
        // ensure removal when modal closes via close button/outside click
        const cleanup = () => {
            document.removeEventListener('keydown', keyHandler);
        };

        closeModal.addEventListener('click', cleanup, { once: true });
        modal.addEventListener('click', (e) => { if(e.target.classList.contains('modal-overlay')) cleanup(); }, { once: true });

        render();

        // Fill modal text fields
        if(modalLocation) modalLocation.textContent = projectLocation;
        if(modalTitle) modalTitle.textContent = projectTitle;
        if(modalDesc) modalDesc.textContent = projectDesc || 'Descrição indisponível.';

        // Fill project-data (Year, Category, Services, Local)
        const pdStrong = modal.querySelectorAll('.project-data div strong');
        const year = project.dataset.year || modal.querySelector('.project-data div:nth-child(1) strong')?.textContent || '2026';
        const category = project.dataset.category || projectCategory || modal.querySelector('.project-data div:nth-child(2) strong')?.textContent || '';
        const services = project.dataset.services || modal.querySelector('.project-data div:nth-child(3) strong')?.textContent || 'Execução Completa';
        const local = project.dataset.local || projectLocation || modal.querySelector('.project-data div:nth-child(4) strong')?.textContent || '';

        if(pdStrong.length >= 4){
            pdStrong[0].textContent = year;
            pdStrong[1].textContent = category;
            pdStrong[2].textContent = services;
            pdStrong[3].textContent = local;
        }

        // open modal
        modal.classList.add('active');

    });

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});



/*==================================================
FECHAR MODAL AO CLICAR FORA
==================================================*/

modal.addEventListener("click", (e) => {

    if(e.target.classList.contains("modal-overlay")){

        modal.classList.remove("active");

    }

});



/*==================================================
TEXTO DINÂMICO HOME
==================================================

const changingText = document.getElementById("changingText");

const texts = [

    "Construção Civil",

    "Combate a Incêndio",

    "Infraestrutura"

];  */

let index = 0;

setInterval(() => {

    index++;

    if(index >= texts.length) index = 0;

    changingText.style.opacity = 0;

    setTimeout(() => {

        changingText.textContent = texts[index];

        changingText.style.opacity = 1;

    }, 300);

}, 2500);



/*==================================================
PARALLAX SIMPLES (HOME)
==================================================*/

const homeBg = document.querySelector("#home .background");

window.addEventListener("scroll", () => {

    let value = window.scrollY;

    if(homeBg){

        homeBg.style.transform = `scale(${1 + value * 0.0003})`;

    }

});



/*==================================================
SMOOTH REVEAL CONTATO
==================================================*/

const contato = document.getElementById("contato");

const contactObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.4

});

if(contato){

    contactObserver.observe(contato);

}



/*==================================================
SCROLL SUAVE MANUAL (MENU)
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



/*==================================================
FECHAMENTO FINAL
==================================================*/

console.log("OCA Engenharia - Portfólio carregado com sucesso");
