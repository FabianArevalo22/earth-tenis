/* =====================================================
   Functionalities of the website
===================================================== */

//Alert message function
//This function creates an alert message with a specific type (success, error, warning) and message content.
const showAlert = (message = "Alerta!", type = "error") => {
   const alertTypes = {
      success: {
         icon: "ri-checkbox-circle-fill",
         title: "Sucesso!"
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
   const shopItems = shopItemsSelector();
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
const subtotalDisplay = document.querySelector(".subtotal");
const totalDisplay = document.querySelector(".total");
const shopItemsSelector = () => document.querySelectorAll(".shop-item");

const isToday = (day, month) => {
   const today = new Date();
   return today.getDate() === day && today.getMonth() === month - 1;
}

const isBetweenDates = (startDate, endDate) => {
   const now = new Date();
   return now >= startDate && now <= endDate;
}


const couponList = {
   "COMBOEARTH": {
      type: "percentage",
      discount: 0.1,
      condition: (items, total) => items.length >= 2
   },
   "COLECAO25": {
      type: "percentage",
      discount: 0.25,
      condition: (items, total) => items.length >= 4
   },
   "EARTHDAY": {
      type: "percentage",
      discount: 0.2,
      condition: () => isToday(22, 4)
   },
   "STYLE200": {
      type: "fixed",
      discount: 200,
      condition: (items, total) => total >= 1000
   },
   "BIG350": {
      type: "fixed",
      discount: 350,
      condition: (items, total) => total >= 2000
   },
   "BLACKEARTH25": {
      type: "percentage",
      discount: 0.25,
      condition: () => {
         const year = new Date().getFullYear();
         const blackFriday = new Date(year, 10, 1); 
         while (blackFriday.getDay() !== 5) blackFriday.setDate(blackFriday.getDate() + 1);
         blackFriday.setDate(blackFriday.getDate() + 21); 
         const start = new Date(blackFriday);
         start.setDate(start.getDate() - 3);
         const end = new Date(blackFriday);
         end.setDate(end.getDate() + 3); 
         return isBetweenDates(start, end);
      }
   },
   "EARTHWEEK20": {
   type: "percentage",
   discount: 0.20,
   condition: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 4, 1); 
      const end = new Date(now.getFullYear(), 4, 7);
      return isBetweenDates(start, end);
      }
   },
   "NAMORO10": {
      type: "percentage",
      discount: 0.1,
      condition: () => isToday(12, 6)
   },
   "DEMAIS600": {
      type: "fixed",
      discount: 600,
      condition: (items, total) => total >= 5000
   }
};

let activeCoupon = null;

const getTotalValue = (items) => {
   return Array.from(items).reduce((total, item) => {
      const priceText = item.querySelector(".price").textContent;
      const price = parseFloat(priceText.replace("R$", "").replace(",", "."));
      const quantity = parseInt(item.querySelector(".quantity").textContent, 10) || 1;
      return total + (price * quantity);
   }, 0);
}

const applyCoupon = () => {
   const code = couponInput.value.trim().toUpperCase();
   const items = shopItemsSelector();
   const subtotal = getTotalValue(items);
   disableButtonTemporarily(applyCouponBtn);

   if (items.length === 0) {
      showAlert("Você precisa adicionar itens ao carrinho primeiro!", "warning");
      return;
   }
   if (activeCoupon) {
      showAlert("Você pode aplicar apenas um cupom por compra!", "warning");
      couponInput.value = "";
      return;
   }

   const coupon = couponList[code];
   if (!coupon) {
      showAlert("Cupom inválido ou expirado.", "warning");
      couponInput.value = "";
      return;
   }

   if (!coupon.condition(items, subtotal)) {
      showAlert(`O cupom ${code} não pode ser aplicado. Verifique as condições.`, "warning");
      couponInput.value = "";
      return;
   }

   activeCoupon = { code, ...coupon };
   showAlert(`Cupom ${code} aplicado!`, "success");
   couponInput.value = "";
   updateCartTotal();
}

const validateCoupon = () => {
   if (!activeCoupon) return;

   const items = shopItemsSelector();
   const subtotal = getTotalValue(items);

   const coupon = couponList[activeCoupon.code];
   if (!coupon.condition(items, subtotal)) {
      showAlert(`O cupom ${activeCoupon.code} não é mais válido. O valor do carrinho foi alterado.`, "warning");
      activeCoupon = null;
      updateCartTotal(); 
   }
}
applyCouponBtn.addEventListener("click", applyCoupon);

const animateTotalDisplay = (subtotal, total) => {
   [subtotalDisplay, totalDisplay].forEach(el => {
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";
   });

   setTimeout(() => {
      subtotalDisplay.textContent = `R$ ${subtotal.toFixed(2)}`;
      totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
      [subtotalDisplay, totalDisplay].forEach(el => {
         el.style.opacity = "1";
         el.style.transform = "translateY(0)";
      });
   }, 500);
}

const updateCartTotal = () => {
   const items = shopItemsSelector();
   const subtotal = getTotalValue(items);
   let total = subtotal;

   if (activeCoupon) {
      const { type, discount } = activeCoupon;
      total = type === "percentage" ? subtotal * (1 - discount) : subtotal - discount;
      if (total < 0) total = 0;
   }

   animateTotalDisplay(subtotal, total);
}

const updateShopMessage = () => {
   const shopItems = shopItemsSelector(); 
   const shopMessage = document.querySelector(".shop-message");
   const alert = shopBtn.querySelector(".alert"); 
   shopMessage.classList.toggle("active", shopItems.length === 0);
   shopBtn.classList.toggle("active", shopItems.length > 0);
   alert.classList.toggle("active", shopItems.length > 0);
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
         validateCoupon();
      }
   });
   increaseBtn.addEventListener("click", () => {
      quantity++;
      updateDisplay();
      validateCoupon();
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
   //Here are all the settings about the products and their modals
   const products = document.querySelectorAll(".products-container .card-with-modal");
   products.forEach(product => {

      //Product Image Swiper
      product.querySelectorAll(".product-img-swiper").forEach((swiperContainer) => {
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

      //Add Price according the info of the product
      const priceContent = product.querySelector('.product-info .normal-price.info').textContent;
      const priceValue = parseFloat(priceContent.replace("R$", "").replace(",", "."));
      const priceDiscount = `R$ ${(priceValue * 0.8).toFixed(2).replace(".", ",")}`;
      product.querySelector(".product-info .price-with-descount.info").textContent = priceDiscount;
      product.querySelector(".product-description .price-descount-display").textContent = priceDiscount;
      product.querySelector('.product-description .price-display').textContent = priceContent;

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
      
      //Add active class to size button
      const productSize = product.querySelector(".product-size");
      const productSizeBtns = productSize.querySelectorAll(".size-btn");
      productSizeBtns.forEach((sizeBtn) => {
         sizeBtn.addEventListener("click", () =>{
            setActiveButton(productSizeBtns, sizeBtn);
         });
      });

      //Quantity Button of the product
      setupQuantityControls(product);

      //Comments Counter of the products
      const comments = product.querySelectorAll(".comment");
      const commentsDisplay = product.querySelector(".comments-display");
      commentsDisplay.textContent = `${comments.length} ${comments.length === 1 ? 'Comentário' : 'Comentários'}`;
      
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
      
      //Open/Close product modals.
      const productCard = product.querySelector(".product-card");
      const productBackdrop = product.querySelector(".product-modal-backdrop");
      const modalCloseBtn = product.querySelector(".modal-close-btn");
      const productModal = product.querySelector(".product-modal");

      const ModalTriggerWithoutFilter = (selector) => {
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
      ModalTriggerWithoutFilter(".popular-swiper .swiper-slide .slide-info a");
      ModalTriggerWithoutFilter(".notices-container .notice .notice-btn");
      
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

      //Add Product to Shop Cart
      const addToCartBtn = product.querySelector(".add-to-cart-btn.border-btn");
      addToCartBtn.addEventListener("click", () => {

         disableButtonTemporarily(addToCartBtn);
         if(product.querySelector(".product-size .active") === null) {
            showAlert("Selecione um tamanho!", "warning");
            return;
         }
         showAlert("Produto adicionado ao carrinho!", "success");

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

            setupQuantityControls(existingItem, updateCartTotal);
            validateCoupon();
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
         validateCoupon();
         updateCartTotal();

         const removeBtn = shopItem.querySelector(".item-options .remove-item");
         removeBtn.addEventListener("click", () => {
            shopItem.style.transition = "all 0.5s ease";
            shopItem.style.opacity = "0";
            shopItem.style.transform = "translateX(-20px)";
            setTimeout(() => {
               shopItem.remove();
               updateShopMessage();
               validateCoupon();
               updateCartTotal();
            }, 500);
         });

      });

   });
});
/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function() {
   emailjs.init({
     publicKey: "YWvx8RBXQ2CWsEe2q",
   });
})();
const FormBtn = document.querySelector("form .submit-btn")
EarthContactForm = document.getElementById("earth-tenis-contact-form");
EarthContactForm.addEventListener('submit', function(event) {
   event.preventDefault();
   emailjs.sendForm('service_wz0vm5i', 'template_7dquq0h', '#earth-tenis-contact-form')
       .then(() => {
         disableButtonTemporarily(FormBtn);
         showAlert("O seu email foi enviado com sucesso!", "success");
         EarthContactForm.reset();
       }, () => {
         disableButtonTemporarily(FormBtn);
         showAlert("Houve um erro ao enviar o seu email!", "error");
       });
});
/* =====================================================
   Bottom navigation menu
===================================================== */
//Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.pageYOffset;

   navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop - 50;
      let id = navMenuSection.getAttribute("id");

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.remove("current");

      }
   });
});

//Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");
   bottomNav.classList.toggle("active", window.scrollY < 10);
});

//Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
   bottomNav.classList.add("active");
   menuShowBtn.classList.remove("active");

   if(window.scrollY < 10){
      menuHideBtn.classList.add("active");
      function scrollStopped(){
         bottomNav.classList.add("active");
      }
      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }

   if(window.scrollY > 10){
      menuHideBtn.classList.add("active");
      function scrollStopped(){
         bottomNav.classList.remove("active");
         menuShowBtn.classList.add("active");
      }
      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
   }
});
//Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});
//Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.add("active");
   menuShowBtn.classList.toggle("active");
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

   localStorage.setItem("earth-saved-icon", getCurrentIcon());
   localStorage.setItem("earth-saved-theme", getCurrentTheme());
});

// Get saved theme icon and theme on document loaded.
const savedIcon = localStorage.getItem("earth-saved-icon");
const savedTheme = localStorage.getItem("earth-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});