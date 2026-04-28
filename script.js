/**
 * ========================================
 * Script Principal - Fábio Móveis
 * Funcionalidades:
 * 1. Sticky Header com mudança de cor ao rolar
 * 2. Filtro de Categorias (Rústico, Industrial, Escritório)
 * 3. Animações de Scroll (Intersection Observer)
 * 4. Animações da Hero Section
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todas as funcionalidades
    initStickyHeader();
    initFiltroCategorias();
    initSmoothScroll();
    initScrollAnimations();
    initHeroAnimations();
});

/**
 * ========================================
 * STICKY HEADER
 * Muda a cor de fundo ao rolar a página
 * ========================================
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;

    // Função que verifica a posição do scroll
    const verificarScroll = () => {
        const scrollY = window.scrollY;
        
        // Adiciona classe 'scrolled' quando scroll > 50px
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Escuta o evento de scroll
    window.addEventListener('scroll', verificarScroll, { passive: true });
    
    // Verifica posição inicial
    verificarScroll();
}

/**
 * ========================================
 * FILTRO DE CATEGORIAS
 * Filtra os produtos por categoria
 * Rústico, Industrial, Escritório
 * ========================================
 */
function initFiltroCategorias() {
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const produtos = document.querySelectorAll('.produto-card');

    if (!botoesFiltro.length || !produtos.length) return;

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove classe active de todos os botões
            botoesFiltro.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona classe active ao botão clicado
            botao.classList.add('active');

            // Obtém a categoria do botão
            const categoria = botao.getAttribute('data-categoria');

            // Filtra os produtos
            filtrarProdutos(categoria, produtos);
        });
    });
}

/**
 * Filtra os produtos baseado na categoria selecionada
 * @param {string} categoria - Categoria selecionada
 * @param {NodeList} produtos - Lista de elementos de produto
 */
function filtrarProdutos(categoria, produtos) {
    produtos.forEach(produto => {
        const produtoCategoria = produto.getAttribute('data-categoria');

        // Se for "todos" ou categoria correspondente, mostra o produto
        if (categoria === 'todos' || produtoCategoria === categoria) {
            produto.style.display = 'block';
            // Adiciona animação de entrada
            produto.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            produto.style.display = 'none';
        }
    });
}

/**
 * ========================================
 * SMOOTH SCROLL
 * Rolagem suave para links internos
 * ========================================
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignora links que são apenas "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ========================================
 * SCROLL ANIMATIONS (Intersection Observer)
 * Elementos surgem suavemente ao entrar na viewport
 * ========================================
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Animação começa 50px antes do elemento aparecer
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay escalonado para elementos em grupo
                const delay = entry.target.dataset.animationDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
                // Para de observar após a animação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos que serão animados ao scrollar
    const elementosAnimados = document.querySelectorAll(
        '.produto-card, .depoimento-card, .section-header, .filtro-categorias, .footer-section'
    );
    
    elementosAnimados.forEach((el, index) => {
        // Adiciona delay escalonado para criar efeito stagger
        el.dataset.animationDelay = index * 100;
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * ========================================
 * HERO SECTION ENTRANCE ANIMATIONS
 * Animação sequencial (staggered) na carga da página
 * ========================================
 */
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');

    // Aplica classes de animação com delays escalonados
    if (heroTitle) {
        heroTitle.classList.add('hero-animate', 'hero-title-animate');
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('hero-animate', 'hero-subtitle-animate');
        }, 300); // 300ms após o título
    }
    
    if (heroCta) {
        setTimeout(() => {
            heroCta.classList.add('hero-animate', 'hero-cta-animate');
        }, 600); // 600ms após o subtítulo
    }
}