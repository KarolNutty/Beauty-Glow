// Carrossel
let slideIndex = 0;
const slides = document.querySelectorAll(".banner .slides img");
const prevBtn = document.querySelector(".banner .prev");
const nextBtn = document.querySelector(".banner .next");

function showSlide(n) {
  slides.forEach((slide, i) => slide.classList.remove("active"));
  slides[n].classList.add("active");
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Event listeners para os botões do carrossel
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Inicializar carrossel
showSlide(slideIndex);
setInterval(nextSlide, 5000);

// Carrinho
let cartCount = 0;
let cartItems = [];

function addToCart(productName, price) {
  cartCount++;
  cartItems.push({name: productName, price: price});
  document.getElementById("cart-count").textContent = cartCount;
  
  // Animação visual no carrinho
  const cart = document.querySelector('.cart');
  cart.style.transform = 'scale(1.2)';
  setTimeout(() => {
    cart.style.transform = 'scale(1)';
  }, 200);
  
  // Mostrar notificação
  showNotification(`${productName} adicionado ao carrinho!`);
}

function toggleCart() {
  if(cartItems.length === 0) {
    showNotification("Seu carrinho está vazio!");
    return;
  }
  
  let cartContent = "🛒 Seus produtos:\n\n";
  let total = 0;
  
  cartItems.forEach((item, index) => {
    cartContent += `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    total += item.price;
  });
  
  cartContent += `\n💰 Total: R$ ${total.toFixed(2)}`;
  alert(cartContent);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.innerHTML = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #4CAF50, #45a049);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    font-weight: bold;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

// Scroll suave para os links de navegação
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Adicionar classe ativa ao link do menu baseado na seção visível
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// Event listener para scroll
window.addEventListener('scroll', updateActiveNavLink);

// Efeito de parallax no banner
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const bannerImages = document.querySelectorAll('.banner img');
  bannerImages.forEach(img => {
    img.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// Animação de entrada dos cards quando entram na viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.produto, .produto-novo, .produto-info, .depoimento');
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});

// Função para limpar carrinho
function clearCart() {
  cartCount = 0;
  cartItems = [];
  document.getElementById("cart-count").textContent = cartCount;
  showNotification("Carrinho limpo!");
}

// Função para remover item do carrinho
function removeFromCart(index) {
  if (index >= 0 && index < cartItems.length) {
    const removedItem = cartItems.splice(index, 1)[0];
    cartCount--;
    document.getElementById("cart-count").textContent = cartCount;
    showNotification(`${removedItem.name} removido do carrinho!`);
  }
}

// Adicionar eventos de teclado para navegação do carrossel
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    prevSlide();
  } else if (event.key === 'ArrowRight') {
    nextSlide();
  }
});

// Pausar carrossel quando hover
const banner = document.querySelector('.banner');
let carouselInterval = setInterval(nextSlide, 5000);

banner.addEventListener('mouseenter', function() {
  clearInterval(carouselInterval);
});

banner.addEventListener('mouseleave', function() {
  carouselInterval = setInterval(nextSlide, 5000);
});

// Loading effect para imagens
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    // Se a imagem já foi carregada
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    }
  });
});