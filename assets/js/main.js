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
      updateShopMessage();
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

function updateShopMessage() {
   const shopItems = document.querySelectorAll(".shop-item"); 
   const shopMessage = document.querySelector(".shop-message"); 
   shopMessage.classList.toggle("active", shopItems.length === 0);
   shopBtn.classList.toggle("active", shopItems.length > 0);
   const alert = shopBtn.querySelector(".alert");
   alert.classList.toggle("active", shopItems.length > 0);
};

function updateCartTotal() {
   const shopItems = document.querySelectorAll(".shop-item");
   let total = 0;
   shopItems.forEach(item => {
       const priceText = item.querySelector(".item-info p:nth-of-type(3) span").textContent; // Captura o preço do item
       const price = parseFloat(priceText.replace("R$", "").replace(",", ".")); // Converte para número
       const quantity = parseInt(item.querySelector(".item-info p:nth-of-type(1) span").textContent, 10) || 1; // Captura a quantidade
       total += price * quantity; // Soma o total
   });

   const resumeInfo = document.querySelector(".resume-info h3");
   resumeInfo.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Adiciona transição
   resumeInfo.style.opacity = "0";
   resumeInfo.style.transform = "translateY(-10px)";
   setTimeout(() => {
       resumeInfo.textContent = `R$ ${total.toFixed(2)}`; // Atualiza o total no carrinho
       resumeInfo.style.opacity = "1";
       resumeInfo.style.transform = "translateY(0)";
   }, 500);
};

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

      //Add Product to Shop Cart
      const addToCartBtn = product.querySelector(".add-to-cart-btn.border-btn");
      addToCartBtn.addEventListener("click", () => {

         const alert = product.querySelector(".product-alert");
         const progress = product.querySelector(".check");
         let timer1, timer2;
         
         alert.classList.add("active");
         progress.classList.add("active");

         timer1 = setTimeout(() => {
           alert.classList.remove("active");
         }, 5000);
         timer2 = setTimeout(() => {
           progress.classList.remove("active");
         }, 5300);

         const productImage = product.querySelector(".product-img img").src;
         const productName = product.querySelector(".product-description h3").textContent;
         const productPrice = product.querySelector(".price-with-descount.info").textContent;
         const productSize = product.querySelector(".product-size .active") ? product.querySelector(".product-size .active").textContent : "N/A";
         const productQuantity = product.querySelector(".quantity") ? product.querySelector(".quantity").textContent : "1";

         const shop = document.querySelector(".shop");
         const shopItem = document.createElement("div");
         shopItem.classList.add("shop-item");
         shopItem.innerHTML = `
         <a class="remove-item"><i class="ri-delete-bin-fill"></i></a>
         <div class="item-img"><img src="${productImage}" alt=""></div>
         <div class="item-info">
            <h5>${productName}</h5>
            <p>Quantidade: <span>${productQuantity}</span></p>
            <p>Tamanho: ${productSize}</p>
            <p>Preço: <span>${productPrice}</span></p>
         </div>
         `;
         shop.insertBefore(shopItem, document.querySelector(".shop-resume"));
         updateShopMessage();
         updateCartTotal();

         const removeBtn = shopItem.querySelector(".remove-item");
         removeBtn.addEventListener("click", () => {
            shopItem.style.position = "relative";
            shopItem.style.transition = "all 0.5s ease";
            shopItem.style.opacity = "0";
            shopItem.style.transform = "translateX(-20px)";
            setTimeout(() => {
               shopItem.remove();
               updateShopMessage();
               updateCartTotal();
            }, 500);
         });
      });
   });
});

/* =====================================================
   Another Features
===================================================== */





// const button = document.querySelector("button"),
//   toast = document.querySelector(".toast");
// (closeIcon = document.querySelector(".close")),
//   (progress = document.querySelector(".progress"));

// let timer1, timer2;

// button.addEventListener("click", () => {
//   toast.classList.add("active");
//   progress.classList.add("active");

//   timer1 = setTimeout(() => {
//     toast.classList.remove("active");
//   }, 5000); //1s = 1000 milliseconds

//   timer2 = setTimeout(() => {
//     progress.classList.remove("active");
//   }, 5300);
// });












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