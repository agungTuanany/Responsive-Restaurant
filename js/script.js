/* JQuery */
$(document).ready(function () {

  // ripples
  $('#header, .info').ripples({
    dropRadius: 1,
    perturbance:0.01,
  });

  //magnific popup

  $('.parent-container').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery:{
      enabled: true
    }
  });

});

/* Vanilla JS */

//getting the products
class Products{
  async getProducts(){
    try {
      let result = await fetch('./images/images.json')
      let data = await result.json();
      let products = data.items;
      //console.log(data)
      console.log(products)
      products = products.map(item =>{
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return{title, price, id, image};
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

const productsDOM = document.querySelector('.parent-container')

class UI{
  displayProducts(products){
    let result = '';
    products.forEach(product => {
      result +=`
      <!-- menu item -->
      <div class='col-10 mx-auto col-sm-6 col-lg-3 my-3'>
        <div class='item-container'>
          <img src=${product.image} alt='product' class='img-fluid img-thumbnail item-img'>
          <a href=${product.image}>
            <h1 class='text-uppercase text-center item-link px-3'>${product.title}</h1>
          </a>
        </div>
      </div>
      `;
    });
    productsDOM.innerHTML = result;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then(products => {
    ui.displayProducts(products);
  });
})
