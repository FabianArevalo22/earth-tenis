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
   Shop
===================================================== */
const shopBtn = document.querySelector(".shop-btn");
const shopBackdrop = document.querySelector(".shop-backdrop");
const shop = document.querySelector(".shop");
const shopCloseBtn = document.querySelector(".shop-close-btn");

shopBtn.addEventListener("click", () => {
   shopBackdrop.style.display = "flex";
   setTimeout(() => {
      shopBackdrop.classList.add("active");
   }, 300);
   setTimeout(() => {
      shop.classList.add("active");
   }, 300);
});
shopCloseBtn.addEventListener("click", () => {
   setTimeout(() => {
      shopBackdrop.style.display = "none";
   }, 500);
   setTimeout(() => {
      shopBackdrop.classList.remove("active");
      shop.classList.remove("active");
   }, 100);
});

/* =====================================================
   Product modals, tabs and cards
===================================================== */

//Product Image Swiper
var swiper = new Swiper(".product-img-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
         var slide = document.querySelectorAll('.swiper-slide')[index];
         var imgSrc = slide.querySelector('img').src;
         return ('<span class="' + className + '"><img src="' + imgSrc + '" alt="Slide ' + (index + 1) + '" /></span>');
      },
   },
 });

//Filter product cards according to product tabs.
document.addEventListener("DOMContentLoaded", () => {
   const productTabs = document.querySelector(".products-tabs");
   const productTabBtns = productTabs.querySelectorAll(".tab-btn");
   const cardsWithModals = document.querySelectorAll(".products-container .card-with-modal");

   productTabBtns.forEach((tabBtn) =>{
      tabBtn.addEventListener("click", () => {
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
            };
         });
         // Add active class to the clicked tab button.
         productTabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });

   //Product Card Configurations
   const products = document.querySelectorAll(".products-container .card-with-modal");
   products.forEach(product => {

      //Comments Counter of the products
      const comments = product.querySelectorAll(".comment");
      const commentsDisplay = product.querySelector(".comments-display");
      commentsDisplay.textContent = `${comments.length} ${comments.length === 1 ? 'Comentário' : 'Comentários'}`;

      //Add Buttons Sizes according the info of the product
      const sizesText = product.querySelector('.product-options.info .option.info p span').textContent;
      const sizesCount = parseInt(sizesText, 10);
      const initialSize = 36;
      const productSizeContainer = product.querySelector('.product-size');
      productSizeContainer.innerHTML = '';
         
         for (let i = 0; i < sizesCount; i++) {
            const sizeValue = initialSize + i;
            const sizeBtn = document.createElement('a');
            sizeBtn.classList.add('size-btn'); 
            sizeBtn.textContent = sizeValue;
            productSizeContainer.appendChild(sizeBtn);
         };
         
      //Add Price according the info of the product
      const priceText = product.querySelector('.product-info .normal-price.info').textContent;  
      const priceDescountText = product.querySelector('.product-info .price-with-descount.info').textContent;
      const priceDisplay = product.querySelector('.product-description .price-display').textContent = priceText;
      const priceDescountDisplay = product.querySelector('.product-description .price-descount-display').textContent = priceDescountText; 
      
      //Quantity Button of the product
      const decreaseBtn = product.querySelector(".decrease-btn");
      const increaseBtn = product.querySelector(".increase-btn");
      const quantityDisplay = product.querySelector(".quantity");
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

      //Add active class to size buttom
      const productSize = product.querySelector(".product-size");
      const productSizeBtns = productSize.querySelectorAll(".size-btn");
      productSizeBtns.forEach((sizeBtn) =>{
         sizeBtn.addEventListener("click", () =>{
            productSizeBtns.forEach((sizeBtn) => sizeBtn.classList.remove("active"));
            sizeBtn.classList.add("active");
         });
      });
      
      //Open/Close product modals.
      const productCard = product.querySelector(".product-card");
      const productBackdrop = product.querySelector(".product-modal-backdrop");
      const modalCloseBtn = product.querySelector(".modal-close-btn");
      const productModal = product.querySelector(".product-modal");
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

      //Gets Stars of comments and create the average in the card info.
      const commentElements = product.querySelectorAll(".product-comments .comment");
      let totalRating = 0;

      commentElements.forEach(comment => {
         const starIcons = comment.querySelectorAll(".comment-stars li i");
         let ratingForComment = 0;
         starIcons.forEach(star => {
            if (star.classList.contains("ri-star-fill")) ratingForComment += 1;
            else if (star.classList.contains("ri-star-half-line")) ratingForComment += 0.5;
         });
         totalRating += ratingForComment;
         });

      let averageRating = totalRating / commentElements.length;
      averageRating = Math.round(averageRating * 2) / 2;
      
      const productStarsContainer = product.querySelector(".product-stars.info");
      productStarsContainer.innerHTML = "";   
      for (let i = 1; i <= 5; i++) {
         const starIcon = document.createElement("i");
         if (averageRating >= i) starIcon.className = "ri-star-fill";
         else if (averageRating >= i - 0.5) starIcon.className = "ri-star-half-line";
         else starIcon.className = "ri-star-line";
         productStarsContainer.appendChild(starIcon);
      };

      const addToCartBtn = product.querySelector(".add-to-cart-btn.border-btn");
      addToCartBtn.addEventListener("click", () => {
         
      });
   });
});


















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