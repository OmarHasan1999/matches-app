/*scroll section active link*/







/******sticky navbar*******//*
let header = document.querySelector('.header');

window.onscroll = () => {


header.classList.toggle('sticky',window.scrollY > 100);
}*/

/****** swiper *******/
/*var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });*/



  /******sticky navbar*******//*
  /*
  let header = document.querySelector('.header');
  let navLinks = document.querySelectorAll('header nav a');
  let sections = document.querySelectorAll('section');

  window.onscroll = () => {

      header.classList.toggle('sticky',window.scrollY > 100);
                  

     sections.forEach(sec => { 
    
   let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if( top >= offset && top < offset + height ){
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href *= ' + id + ']').classList.add('active');
      })

    }
  });

  
  }*/
  let menuIcon = document.querySelector('#menu-icon');
  //let navbar = document.querySelector('.navbar');
  let mainContainer = document.querySelector('.main-container');
  

  menuIcon.onclick = () => {
    mainContainer.classList.toggle('.main-container2');
    
  }
  
  /*****scroll reveal****/

 /* ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration:2000,
    delay:200
   });

   ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });*/
