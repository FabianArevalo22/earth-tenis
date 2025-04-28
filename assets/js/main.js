/* =====================================================
   Functionalities of the website
===================================================== */

//Alert message function
//This function creates an alert message with a specific type (success, error, warning) and message content.
const showAlert = (message = "Alerta!", type = "error") => {
   const alertTypes = {
      success: {
         icon: "ri-checkbox-circle-fill",
         title: "Adicionado!"
      },
      error: {
         icon: "ri-close-circle-fill",
         title: "Erro!"
      },
      warning: {
         icon: "ri-error-warning-fill",
         title: "Atenção!"
      }
   };
   const { icon, title } = alertTypes[type] || alertTypes.error;

   const alert = document.createElement("div");
   alert.className = "alert-message";
   alert.innerHTML = `
      <div class="alert-content">
         <i class="${icon} ${type}"></i>
         <div class="alert-text">
            <span class="text-1">${title}</span>
            <span class="text-2">${message}</span>
         </div>
      </div>
      <div class="progress"></div>
   `;
   const alertContainer = document.getElementById("alert-container") || document.body;
   alertContainer.appendChild(alert);
   alert.style.display = "flex";
   setTimeout(() => {
      alert.classList.add("active");
      alert.querySelector(".progress")?.classList.add("active");
   }, 100);
   setTimeout(() => {
      alert.classList.remove("active");
   }, 2500);
   setTimeout(() => {
      alert.querySelector(".progress")?.classList.remove("active");
      alert.remove();
   }, 2650);
}

//Disable button temporarily function
//This function disables a button for a specified duration (default is 2650ms) and then re-enables it.
const disableButtonTemporarily = (button, duration = 2650) => {
   button.style.pointerEvents = "none";
   button.style.opacity = "0.6";
   button.style.cursor = "not-allowed";
   setTimeout(() => {
      button.style.pointerEvents = "";
      button.style.opacity = "";
      button.style.cursor = "";
   }, duration);
}

//Add Active class to the buttons
//This function adds the active class of a button in a especific Event Listener of click
const setActiveButton = (buttons, activeButton) => {
   buttons.forEach((btn) => btn.classList.toggle("active", btn === activeButton));
};
/* =====================================================
   Home Slider
===================================================== */
const homeImages = ['assets/imgs/home-imgs/home-image-1.png', 'assets/imgs/home-imgs/home-image-2.png', 'assets/imgs/home-imgs/home-image-3.png'];
let imageIndex = 0;
//This function swipers the images of the home section (5s).
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
const shopBuyBtn = document.querySelector(".shop-buy-btn");

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
   disableButtonTemporarily(shopBuyBtn);
   const shopItems = document.querySelectorAll(".shop-item");
   if (shopItems.length === 0) {
      showAlert("Você precisa adicionar itens ao carrinho primeiro!", "warning");
      return;
   }
   showAlert("Funcionalidade indisponível no momento!", "warning");
});


//Functions to apply Coupons
//This Functions Calculates the conditions of a coupon and apply the discount to the total value of the cart.
const applyCouponBtn = document.querySelector(".apply-coupon-btn");
const couponInput = document.querySelector(".coupon-input");
const totalDisplay = document.querySelector(".total");
const subtotalDisplay = document.querySelector(".subtotal");

//Coupons List
const couponList = {
   "COMBOEARTH": {
      type: "percentage",
      discount: 0.1, 
      description: "COMBOEARTH", /*Leve 2 pares e ganhe 10% de desconto no total!*/
      condition: (shopItems) => shopItems.length >= 2 
   },
   "EARTHDAY": {
      type: "percentage",
      discount: 0.2,
      description: "EARTHDAY", /*No Dia Internacional da Terra, ganhe 20% de desconto no total!*/
      condition: (shopItems) => true 
   },
   "STYLE200": {
      type: "fixed",
      discount: 200, 
      description: "STYLE200", /*Em compras acima de R$1000,00 ganhe R$200,00 de desconto!*/
      condition: (shopItems) => getTotalValue(shopItems) >= 1000 
   },
   "BIG350": {
      type: "fixed",
      discount: 350, 
      description: "BIG350", /*Em compras acima de R$2000,00 ganhe R$350,00 de desconto!*/
      condition: (shopItems) => getTotalValue(shopItems) >= 2000
   },
   "BLACKEARTH25": {
      type: "percentage",
      discount: 0.25, 
      description: "BLACKEARTH25", /*Na Semana da Black Friday, ganhe 25% de desconto no total!*/
      condition: (shopItems) => true 
   },
   "NAMORO10": {
      type: "percentage",
      discount: 0.1, 
      description: "NAMORO10", /*No Dia dos Namorados, ganhe 10% de desconto no total!*/
      condition: (shopItems) => true 
   },
   "DEMAIS600": {
      type: "fixed",
      discount: 600,
      description: "DEMAIS600", /*Em compras acima de R$5000,00 ganhe R$6000 de desconto no total!*/
      condition: (shopItems) => getTotalValue(shopItems) >= 5000
   }
};

const getTotalValue = (shopItems) => {
   let total = 0;
   shopItems.forEach(item => {
      const priceText = item.querySelector(".item-info .item-price .price").textContent;
      const price = parseFloat(priceText.replace("R$", "").replace(",", "."));
      let quantity = parseInt(item.querySelector(".item-options .item-quantity .quantity").textContent, 10) || 1;
      total += price * quantity;
   });
   return total;
};

let activeCoupon = null;
const applyCoupon = () => {
   const couponCode = couponInput.value.trim().toUpperCase(); 
   const coupon = couponList[couponCode]; 
   const shopItems = document.querySelectorAll(".shop-item");
   
   disableButtonTemporarily(applyCouponBtn); 

   if (shopItems.length === 0) {
      showAlert("Você precisa adicionar itens ao carrinho primeiro!", "warning");
      return;
   }
   if (activeCoupon) {
      showAlert("Você pode aplicar apenas um cupom por compra!", "warning");
      couponInput.value = ""; 
      return;
   }

   if (coupon) {
      if (coupon.condition(shopItems)) {
         showAlert(`Cupom ${coupon.description} aplicado!`, "success");
         couponInput.value = ""; 
         activeCoupon = coupon;
         updateCartTotal(); 
      } else {
         showAlert(`O cupom ${coupon.description} não pode ser aplicado. Verifique as condições.`, "warning");
         couponInput.value = "";
         activeCoupon = null; 
      }
   } else {
      showAlert("Cupom inválido ou expirado.", "warning");
      couponInput.value = ""; 
      activeCoupon = null;
   }
};
applyCouponBtn.addEventListener("click", applyCoupon);

//Function to calculate Cart total Value
//This Function calculates the total and subtotal of the products in the cart
const updateCartTotal = () => {
   const shopItems = document.querySelectorAll(".shop-item");
   let subtotal = getTotalValue(shopItems);
   let total = subtotal;
   
   if (activeCoupon) {
      if (activeCoupon.type === "percentage") {
         total = subtotal * (1 - activeCoupon.discount);
      } else if (activeCoupon.type === "fixed") {
         total = subtotal - activeCoupon.discount;
      }
      if (total < 0) total = 0; 
   }

   const subtotalDisplay = document.querySelector(".subtotal");
   const totalDisplay = document.querySelector(".total");

   [subtotalDisplay, totalDisplay].forEach(display => {
      display.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      display.style.opacity = "0";
      display.style.transform = "translateY(-10px)";
   });

   setTimeout(() => {
      subtotalDisplay.textContent = `R$ ${subtotal.toFixed(2)}`;
      totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
      [subtotalDisplay, totalDisplay].forEach(display => {
         display.style.opacity = "1";
         display.style.transform = "translateY(0)";
      });
   }, 500);
};


const updateShopMessage = () => {
   const shopItems = document.querySelectorAll(".shop-item"); 
   const shopMessage = document.querySelector(".shop-message"); 
   shopMessage.classList.toggle("active", shopItems.length === 0);
   shopBtn.classList.toggle("active", shopItems.length > 0);
   const alert = shopBtn.querySelector(".alert");
   alert.classList.toggle("active", shopItems.length > 0);
   updateCartTotal();
};

const setupQuantityControls = (container, onQuantityChange = null) => {
   const decreaseBtn = container.querySelector(".decrease-btn");
   const increaseBtn = container.querySelector(".increase-btn");
   const quantityDisplay = container.querySelector(".quantity");

   let quantity = parseInt(quantityDisplay.textContent, 10) || 1;

   const updateDisplay = () => {
      quantityDisplay.textContent = quantity;
      if (onQuantityChange) onQuantityChange(quantity);
   };

   decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
         quantity--;
         updateDisplay();
      }
   });
   increaseBtn.addEventListener("click", () => {
      quantity++;
      updateDisplay();
   });
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
         setActiveButton(productTabBtns, tabBtn);
      });
   });

   brandSlides.forEach((slide) => {
      slide.addEventListener("click", () => {
         const filter = slide.getAttribute("data-filter");
         filterProducts(filter);
         productTabs.scrollIntoView({ behavior: "smooth" });

         const matchingTab = Array.from(productTabBtns).find(tabBtn => 
            tabBtn.getAttribute("data-filter") === filter
         );
         if (matchingTab) {
            setActiveButton(productTabBtns, matchingTab);
         }

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
      setupQuantityControls(product);

      //Add active class to size button
      const productSize = product.querySelector(".product-size");
      const productSizeBtns = productSize.querySelectorAll(".size-btn");
      productSizeBtns.forEach((sizeBtn) => {
         sizeBtn.addEventListener("click", () =>{
            setActiveButton(productSizeBtns, sizeBtn);
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

      //Gets Stars of comments and create the average in the product card.
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

         disableButtonTemporarily(addToCartBtn);
         if(product.querySelector(".product-size .active") === null) {
            showAlert("Selecione um tamanho!", "warning");
            return;
         }
         showAlert("Produto adicionado ao carrinho com sucesso!", "success");

         const productImage = product.querySelector(".product-img img").src;
         const productName = product.querySelector(".product-description h3").textContent;
         const productNormalPrice = product.querySelector(".normal-price.info").textContent;
         const productPrice = product.querySelector(".price-with-descount.info").textContent;
         const productSize = product.querySelector(".product-size .active").textContent;
         const productQuantity = parseInt(product.querySelector(".quantity").textContent, 10);
         const shop = document.querySelector(".shop");

         const existingItem = Array.from(document.querySelectorAll(".shop-item")).find(item => {
         const name = item.querySelector("h5").textContent;
         const sizeText = item.querySelector(".item-info p").textContent;
         return name === productName && sizeText.includes(productSize);
         });

         if (existingItem) {
            const quantitySpan = existingItem.querySelector(".item-options .quantity");
            const currentQuantity = parseInt(quantitySpan.textContent, 10);
            quantitySpan.textContent = currentQuantity + productQuantity;
            updateCartTotal();
            return;
         }

         const shopItem = document.createElement("div");
         shopItem.classList.add("shop-item");
         shopItem.innerHTML = `
         <div class="item-img"><img src="${productImage}"></div>
         <div class="item-info">
            <h5>${productName}</h5>
            <p>Tamanho: ${productSize}</p>
            <p class="item-price">Preço: <span class="price">${productPrice}</span><span>  <s class="normal-price">${productNormalPrice}</s></span></p>
         </div>
         <div class="item-options">
            <div class="item-quantity"><button class="decrease-btn">-</button><span class="quantity">${productQuantity}</span><button class="increase-btn">+</button></div>
            <i class="ri-delete-bin-fill remove-item"></i>
         </div>
         `;
         shop.insertBefore(shopItem, document.querySelector(".shop-resume"));
         setupQuantityControls(shopItem, updateCartTotal);
         updateShopMessage();
         updateCartTotal();
         shopItem.classList.add("listeners-attached");

         const removeBtn = shopItem.querySelector(".item-options .remove-item");
         removeBtn.addEventListener("click", () => {
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