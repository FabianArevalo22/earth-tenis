/* =====================================================
   Home Slider
===================================================== */
const homeImages = ['assets/imgs/home-imgs/home-image-1.png', 'assets/imgs/home-imgs/home-image-2.png', 'assets/imgs/home-imgs/home-image-3.png'];
let imageIndex = 0;

//Arrow Fuction to swipe the images.
const swipeImg = () => {

   const slider = document.querySelector(".shoe-img img");
   slider.style.opacity = 0

   setTimeout(() => {
   imageIndex = (imageIndex + 1) % homeImages.length; 
   slider.src = homeImages[imageIndex];
   slider.style.opacity = 1; 
   }, 500); 
};

setInterval(swipeImg, 4500);


/* =====================================================
   Product modals, tabs and cards
===================================================== */

// Filter product cards according to product tabs.
   document.addEventListener("DOMContentLoaded", () => {
   const productTabs = document.querySelector(".products-tabs");
   const productTabBtns = productTabs.querySelectorAll(".tab-btn");
   const cardsWithModals = document.querySelectorAll(".products-container .card-with-modal");

   productTabBtns.forEach((tabBtn) =>{
      tabBtn.addEventListener("click", () =>{
         const filter = tabBtn.getAttribute("data-filter");

         cardsWithModals.forEach((cardWithModal) => {
            if(filter === "all" || cardWithModal.classList.contains(filter)){
               cardWithModal.classList.remove("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "1";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
            else {
               cardWithModal.classList.add("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "0";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
         });
         // Add active class to the clicked tab button.
         productTabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });
});

// Open/Close product modals.
   const productCardsWithModals = document.querySelectorAll(".products-container .card-with-modal");
   productCardsWithModals.forEach((productCardWithModal) => {
   const productCard = productCardWithModal.querySelector(".product-card");
   const productBackdrop = productCardWithModal.querySelector(".product-modal-backdrop");
   const modalCloseBtn = productCardWithModal.querySelector(".modal-close-btn");
   const productModal = productCardWithModal.querySelector(".product-modal");

   productCard.addEventListener("click", () => {
      productBackdrop.style.display = "flex";

      setTimeout(() => {
         productBackdrop.classList.add("active");
      }, 300);
      
      setTimeout(() => {
         productModal.classList.add("active");
      }, 300);
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
         productBackdrop.style.display = "none";
      }, 500);
      
      setTimeout(() => {
         productBackdrop.classList.remove("active");
         productModal.classList.remove("active");
      }, 100);
   });
});

// Product Swiper
var swiper = new Swiper(".product-img-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
         // Select the atual slide with the Index.
         var slide = document.querySelectorAll('.swiper-slide')[index];
         // Select the image under slide.
         var imgSrc = slide.querySelector('img').src;
         // Return a HTML with the found image
         return (
           '<span class="' +
           className +
           '"><img src="' +
           imgSrc +
           '" alt="Slide ' +
           (index + 1) +
           '" /></span>'
         );
      },
   },
 });

//Product Modal Size
document.addEventListener("DOMContentLoaded", () => {
const productSize = document.querySelector(".product-size");
const productSizeBtns = productSize.querySelectorAll(".size-btn");

productSizeBtns.forEach((sizeBtn) =>{
   sizeBtn.addEventListener("click", () =>{
      productSizeBtns.forEach((sizeBtn) => sizeBtn.classList.remove("active"));
      sizeBtn.classList.add("active");
   });
});
});

//Product Modal Quantity button
const decreaseBtn = document.querySelector(".decrease-btn");
const increaseBtn = document.querySelector(".increase-btn");
const quantityDisplay = document.querySelector(".quantity");

let quantity = quantityDisplay.textContent;

decreaseBtn.addEventListener("click", () => {
   if(quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
   };
});

increaseBtn.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
});

//Product Modal Comments
const comments = document.querySelectorAll(".comment");
const commentsDisplay = document.querySelector(".comments-display");
commentsDisplay.textContent = `${comments.length} ${comments.length === 1 ? 'Comentário' : 'Comentários'}`;

//Product Modal Stars

/* =====================================================
   Shrink the height of the header on scroll
===================================================== */
window.addEventListener("scroll", () => {
    const earthTenisHeader = document.querySelector(".earth-tenis-header");
 
    earthTenisHeader.classList.toggle("shrink", window.scrollY > 0);
 });


/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   // Change theme icon and theme on click theme button.
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");

   // Save theme icon and them on click theme button.
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

   localStorage.setItem("fabian-saved-icon", getCurrentIcon());
   localStorage.setItem("fabian-saved-theme", getCurrentTheme());
});

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("fabian-saved-icon");
const savedTheme = localStorage.getItem("fabian-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});