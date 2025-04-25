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
const shopBuyBtn = document.querySelector(".shop-buy-btn.fill-btn")

shopBtn.addEventListener("click", () => {
   shopBackdrop.style.display = "flex";
   setTimeout(() => {
      shopBackdrop.classList.add("active");
      shop.classList.add("active");
      updateShopMessage();
   }, 100);
});

shopCloseBtn.addEventListener("click", () => {
   shopBackdrop.classList.remove("active");
   shop.classList.remove("active");
   setTimeout(() => {
      shopBackdrop.style.display = "none";      
   }, 100);
});

shopBuyBtn.addEventListener("click", () => {
   const alert = document.querySelector(".shop-alert");
   const progress = alert.querySelector(".progress");
   alert.style.display = "flex";
   shopBuyBtn.style.pointerEvents = "none";

   setTimeout(() => {
      alert.classList.add("active");
      progress.classList.add("active");
   }, 100);

    setTimeout(() => {
      alert.classList.remove("active");
   }, 2500);
   
   setTimeout(() => {
      progress.classList.remove("active");
      alert.style.display = "none";
      shopBuyBtn.style.pointerEvents = "auto";
   }, 2650);

});

const updateShopMessage = () => {
   const shopItems = document.querySelectorAll(".shop-item"); 
   const shopMessage = document.querySelector(".shop-message"); 
   shopMessage.classList.toggle("active", shopItems.length === 0);
   shopBtn.classList.toggle("active", shopItems.length > 0);
   const alert = shopBtn.querySelector(".alert");
   alert.classList.toggle("active", shopItems.length > 0);
};

const updateCartTotal = () => {
   const shopItems = document.querySelectorAll(".shop-item");
   let total = 0;
   shopItems.forEach(item => {
       const priceText = item.querySelector(".item-info p:nth-of-type(3) span").textContent; 
       const price = parseFloat(priceText.replace("R$", "").replace(",", ".")); 
       const quantity = parseInt(item.querySelector(".item-info p:nth-of-type(1) span").textContent, 10) || 1; 
       total += price * quantity;
   });

   const resumeInfo = document.querySelector(".resume-info h3");
   resumeInfo.style.transition = "opacity 0.5s ease, transform 0.5s ease"; 
   resumeInfo.style.opacity = "0";
   resumeInfo.style.transform = "translateY(-10px)";
   setTimeout(() => {
       resumeInfo.textContent = `R$ ${total.toFixed(2)}`;
       resumeInfo.style.opacity = "1";
       resumeInfo.style.transform = "translateY(0)";
   }, 500);
};
/* =====================================================
   Notices
===================================================== */
const notices = document.querySelectorAll(".notices-container .notice");
const toggleBtn = document.querySelector(".toggleNoticesBtn");

notices.forEach((notice, index) => {
   if (index > 2) {
      notice.classList.add("hidden");
   }
});

let showingAll = false;

toggleBtn.addEventListener("click", () => {
   showingAll = !showingAll;

   notices.forEach((notice, index) => {
      notice.classList.toggle("hidden", !showingAll && index > 2);
   });

   toggleBtn.textContent = showingAll ? "Ver menos" : "Ver mais";
});


/* =====================================================
   Popular  
===================================================== */
var swiper = new Swiper(".popular-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   autoplay: {
      delay: 5000,
      disableOnInteraction: false, 
   },
   speed: 1000,
   loop: true,
   pagination: {
     el: ".swiper-pagination",
     clickable: true,
   },
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".brandsSwiper", {
   slidesPerView: 5,
   spaceBetween: 15,
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

/* =====================================================
   Product modals, tabs and cards
===================================================== */

//Product Image Swiper
document.querySelectorAll(".product-img-swiper").forEach((swiperContainer) => {
   new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
         el: swiperContainer.querySelector(".swiper-pagination"), // Captura a paginação específica do produto
         clickable: true,
         renderBullet: function (bulletIndex, className) {
            var slide = swiperContainer.querySelectorAll(".swiper-slide")[bulletIndex];
            var imgSrc = slide.querySelector("img").src;
            return `<span class="${className}"><img src="${imgSrc}" alt="Slide ${bulletIndex + 1}" /></span>`;
         },
      },
   });
});

//Filter product cards according to product tabs and slides swiper.
document.addEventListener("DOMContentLoaded", () => {
   const productTabs = document.querySelector(".products-tabs");
   const productTabBtns = productTabs.querySelectorAll(".tab-btn");
   const cardsWithModals = document.querySelectorAll(".products-container .card-with-modal");
   const brandSlides = document.querySelectorAll(".brandsSwiper .swiper-slide.avaliable");

   productTabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
         const filter = tabBtn.getAttribute("data-filter");
         filterProducts(filter);
         productTabBtns.forEach((btn) => btn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });

   brandSlides.forEach((slide) => {
      slide.addEventListener("click", () => {
         const filter = slide.getAttribute("data-filter");
         filterProducts(filter);
         productTabs.scrollIntoView({ behavior: "smooth" });
         productTabBtns.forEach((tabBtn) => {
            if (tabBtn.getAttribute("data-filter") === filter) {
               tabBtn.classList.add("active");
            } else {
               tabBtn.classList.remove("active");
            }
         });
      });
   });

   const filterProducts = (filter) => {
      cardsWithModals.forEach((card) => {
         if (filter === "all" || card.classList.contains(filter)) {
            card.classList.remove("hidden");
            setTimeout(() => {
               card.style.opacity = "1";
               card.style.transition = ".5s ease";
            }, 1);
         } else {
            card.classList.add("hidden");
            setTimeout(() => {
               card.style.opacity = "0";
               card.style.transition = ".5s ease";
            }, 1);
         }
      });
   }

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
      const priceContent = product.querySelector('.product-info .normal-price.info').textContent;
      const priceValue = parseFloat(priceContent.replace("R$", "").replace(",", "."));
      const priceDiscount = `R$ ${(priceValue * 0.8).toFixed(2).replace(".", ",")}`;
          
      product.querySelector(".product-info .price-with-descount.info").textContent = priceDiscount;
      product.querySelector(".product-description .price-descount-display").textContent = priceDiscount;
      product.querySelector('.product-description .price-display').textContent = priceContent;
      
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

      const setupModalTrigger = (selector) => {
         const buttons = document.querySelectorAll(selector);
         buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
               const filter = btn.getAttribute("data-filter");
               if (productCard.getAttribute("data-filter") === filter) {
                  product.classList.remove("hidden");
                  product.style.opacity = "1";
                  product.style.transition = ".5s ease";
                  productBackdrop.style.display = "flex";
      
                  setTimeout(() => {
                     productBackdrop.classList.add("active");
                     productModal.classList.add("active");
                  }, 300);
      
                  modalCloseBtn.addEventListener("click", () => {
                     setTimeout(() => {
                        productBackdrop.classList.remove("active");
                        productModal.classList.remove("active");
                     }, 100);
                     setTimeout(() => {
                        productBackdrop.style.display = "none";
                        product.classList.add("hidden");
                        product.style.opacity = "0";
                     }, 200);
                  });
               }
            });
         });
      }
      setupModalTrigger(".popular-swiper .swiper-slide .slide-info a");
      setupModalTrigger(".notices-container .notice .notice-btn");
      
      productCard.addEventListener("click", () => {
         productBackdrop.style.display = "flex";
         setTimeout(() => {
            productBackdrop.classList.add("active");
            productModal.classList.add("active");
         }, 300);
      });
      modalCloseBtn.addEventListener("click", () => {
         setTimeout(() => {
            productBackdrop.classList.remove("active");
            productModal.classList.remove("active");
         }, 100);
         setTimeout(() => {
            productBackdrop.style.display = "none";
         }, 200);
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
         const progress = product.querySelector(".progress");
         alert.style.display = "flex";
         addToCartBtn.style.pointerEvents = "none";
          
         setTimeout(() => {
            alert.classList.add("active");
            progress.classList.add("active");
          }, 100);

         setTimeout(() => {
            alert.classList.remove("active");
          }, 2500);

         setTimeout(() => {
            progress.classList.remove("active");
            alert.style.display = "none";
            addToCartBtn.style.pointerEvents = "auto";
          }, 2650);
        
         const productImage = product.querySelector(".product-img img").src;
         const productName = product.querySelector(".product-description h3").textContent;
         const productNormalPrice = product.querySelector(".normal-price.info").textContent;
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
            <p>Preço: <span>${productPrice}</span><span>  <s class="normal-price">${productNormalPrice}</s></span></p>
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