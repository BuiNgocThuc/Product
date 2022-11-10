//category

function goToProInfo(img){
    var category = document.querySelector("#wrapper")
    var product_info = document.querySelector("#product-information")
    category.style.display = "none"
    product_info.style.display = "block"
    img_main = document.querySelector(".product-content-left-img > img")
    img_main.src = img.src
}
//product-info
function change_info(nth){
    var info_titles = document.querySelectorAll(".product-info-title > *")
    for(var i = 0; i < info_titles.length; i++)
        info_titles[i].style.border = "none"
    info_titles[nth].style.borderBottom = "3px solid #9F7150" 
    var infos = document.querySelectorAll(".product-info-content > *")
    for(var i = 0; i < infos.length; i++)
        infos[i].style.display = "none"
    infos[nth].style.display = "block"
}
function change_price(quantity){
    var price_label = document.querySelector(".product-price")
    var price = quantity.value * 390000
    var price_str = price.toLocaleString("en-US");
    price_label.innerHTML = `<p style="color: red;">${price_str} VND</p>`
}
function choose_size(nth){
    var sizes = document.querySelectorAll(".size > *")
    for (var i = 0; i < sizes.length; i++)
        sizes[i].style.border = "none"
    sizes[nth].style.border = "1px solid #000"
    document.querySelector(".choose_size").style.display = "none"
}

let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}