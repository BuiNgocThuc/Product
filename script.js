//category

function goToProInfo(img) {
  var category = document.querySelector("#wrapper");
  var product_info = document.querySelector("#product-information");
  category.style.display = "none";
  product_info.style.display = "block";
  img_main = document.querySelector(".product-content-left-img > img");
  img_main.src = img.src;
}
//product-info
function change_info(nth) {
  var info_titles = document.querySelectorAll(".product-info-title > *");
  for (var i = 0; i < info_titles.length; i++)
    info_titles[i].style.border = "none";
  info_titles[nth].style.borderBottom = "3px solid #9F7150";
  var infos = document.querySelectorAll(".product-info-content > *");
  for (var i = 0; i < infos.length; i++) infos[i].style.display = "none";
  infos[nth].style.display = "block";
}
function change_price(quantity) {
  var price_label = document.querySelector(".product-price");
  var price = quantity.value * 390000;
  var price_str = price.toLocaleString("en-US");
  price_label.innerHTML = `<p style="color: red;">${price_str} VND</p>`;
}
function choose_size(nth) {
  var sizes = document.querySelectorAll(".size > *");
  for (var i = 0; i < sizes.length; i++) sizes[i].style.border = "none";
  sizes[nth].style.border = "1px solid #000";
  document.querySelector(".choose_size").style.display = "none";
}

let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

var currentPageProduct = 1;
var currentProductData = [];
function createList(category) {
  currentProductData = [];
  if (category == "ALL")
    for (var i = 0; i < productData.length; i++)
      currentProductData.push(productData[i]);
  else
    for (var i = 0; i < productData.length; i++)
      if (productData[i].category.toUpperCase() == category)
        currentProductData.push(productData[i]);
}
function loadPageCategory() {
  showSlides();
  createList("ALL");
  console.log(currentProductData);
  showCurrentProduct();
  showCurrentDot();
}

function showCurrentProduct() {
  var productContainer = document.querySelector(".category .products");
  productContainer.innerHTML = ``;
  var to;
  if (currentPageProduct * 8 > currentProductData.length)
    to = currentProductData.length;
  else to = currentPageProduct * 8;
  console.log((currentPageProduct - 1) * 8, to);
  for (var i = (currentPageProduct - 1) * 8; i < to; i++) {
    productContainer.innerHTML += `<li>
            <div class="product-item" onclick="goToProductInfo(${i})">
                <div class="product-top">
                    <div href="" class="product-thumb">
                        <img src="${currentProductData[i].url}"
                            alt="product">
                    </div>
                    <a href="" class="buy-now">Mua ngay</a>
                    <!-- Mua Ngay -->
                </div>
                <div class="product-info">
                    <a href="" class="product-cat">${
                      currentProductData[i].category
                    }</a>
                    <a href="" class="product-name">${
                      currentProductData[i].name
                    }</a>
                    <div class="product-price">${numberWithCommas(
                      currentProductData[i].price
                    )} VND</div>
                </div>
            </div>
        </li>`;
  }
}
function showCurrentDot() {
  if (currentProductData.length == 0) return;
  var nDot = Math.ceil(currentProductData.length / 8);
  var paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ``;
  paginationContainer.innerHTML += `<a onclick="leftPagination(this)">«</a>`;
  for (var i = 1; i <= nDot; i++)
    paginationContainer.innerHTML += `<a onclick="changePagination(this)">${i}</a>`;
  paginationContainer.innerHTML += `<a onclick="rightPagination(this)">»</a>`;
  var dots = document.querySelectorAll(".pagination > *");
  dots[currentPageProduct].classList.add("active");
  if (currentPageProduct == 1) dots[0].style.visibility = "hidden";
  if (currentPageProduct == nDot) dots[nDot + 1].style.visibility = "hidden";
}

function changePagination(currentDot) {
  currentPageProduct = parseInt(currentDot.innerHTML);
  showCurrentDot();
  showCurrentProduct();
}

function leftPagination() {
  if (currentPageProduct == 1) return;
  currentPageProduct -= 1;
  showCurrentDot();
  showCurrentProduct();
}
function rightPagination() {
  if (currentPageProduct == Math.ceil(currentProductData.length / 8)) return;
  currentPageProduct += 1;
  showCurrentDot();
  showCurrentProduct();
}

function filterByCategory() {
  clearPrice();
  currentPageProduct = 1;
  var categogy = document.querySelector(".filter .category").value;
  createList(categogy);
  console.log(currentProductData);
  showCurrentDot();
  showCurrentProduct();
}
function filterByPrice() {
  var categogy = document.querySelector(".filter .category").value;
  createList(categogy);
  currentPageProduct = 1;
  min = parseInt(document.querySelector(".price.min").value);
  max = parseInt(document.querySelector(".price.max").value);
  if (!isNaN(max)) {
    var tempProductData = [];
    for (var i = 0; i < currentProductData.length; i++)
      if (
        parseInt(currentProductData[i].price) >= min &&
        parseInt(currentProductData[i].price) <= max
      )
        tempProductData.push(currentProductData[i]);
    if (tempProductData.length != 0) currentProductData = tempProductData;
  }
  showCurrentProduct();
  showCurrentDot();
}
function clearPrice() {
  document.querySelector(".price.min").value = "";
  document.querySelector(".price.max").value = "";
}
function searchByName() {
  currentPageProduct = 1;
  clearPrice();
  createList("ALL");
  document.querySelector(".filter .category").value = "ALL";

  var name = document.querySelector(".search input").value;
  console.log(name);
  var tempProductData = [];
  console.log(currentProductData);
  for (var i = 0; i < currentProductData.length; i++) {
    if (currentProductData[i].name.search(name.toUpperCase()) != -1)
      tempProductData.push(currentProductData[i]);
  }
  console.log(tempProductData);
  if (tempProductData.length != 0) currentProductData = tempProductData;
  console.log(currentProductData);

  showCurrentProduct();
  showCurrentDot();
}
function goToProductInfo(idProduct) {
  console.log(idProduct);
  console.log(currentProductData[idProduct]);
  localStorage.setItem(
    "currentProduct",
    JSON.stringify(currentProductData[idProduct])
  );
  window.location.href = "product-info.html";
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function loadPageProductInfo() {
  var product = JSON.parse(localStorage.getItem("currentProduct"));
  console.log(product);
  document.querySelector(".product-content-left-img img").src = product.url;
  document.querySelector(".product-name h2").innerHTML = product.name;
  document.querySelector(".product-price p").innerHTML =
    numberWithCommas(product.price) + " VND";
}
//mouse-move
$(function () {
  var zoom = function (elm) {
    elm
      .on("mouseover", function () {
        $(this).children(".img").css({ transform: "scale(2)" });
      })
      .on("mouseout", function () {
        $(this).children(".img").css({ transform: "scale(1)" });
      })
      .on("mousemove", function (e) {
        $(this)
          .children(".img")
          .css({
            "transform-origin":
              ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
              "% " +
              ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
              "%",
          });
      });
  };

  $(".item").each(function () {
    $(this)
      .append('<div class="img"></div>')
      .children(".img")
      .css({ "background-image": "url(" + $(this).data("image") + ")" });
    zoom($(this));
  });
});
