const loadAllDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a') 
      .then(res => res.json())
      .then((data) => {
          displayProduct(data.drinks);
      })
      .catch(() => {
          console.log("There is a Problem");
      });
};


document.getElementById('searchbt').addEventListener("click", () => {
  let inputValue = document.getElementById("area").value;
  
  if (inputValue) {
      searchDrinks(inputValue);
  } else {
      loadAllDrinks(); 
  }
});


const searchDrinks = (q) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${q}`)
      .then(res => res.json())
      .then((data) => {
          displayProduct(data.drinks || []);
      })
      .catch(() => {
          console.log("There is a Problem");
      });
};


const displayProduct = (products) => {
  const productContainer = document.getElementById("items");
  productContainer.innerHTML = ""; 

  if (products.length == 0) {
      productContainer.innerHTML = "<h1>No drinks found</h1>";
      return;
  }

  products.forEach(product => {
      let modalId = product.idDrink;
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
          <img class="imaget" src="${product.strDrinkThumb}" alt="">
          <p class="heading">Name: ${product.strGlass}</p>
          <p class="fonts">Category: ${product.strCategory}</p>
          <p class="fonts">Instruction: ${product.strInstructions.slice(0, 15)}...</p>
          
          <button type="button" class="fonts extra" data-bs-toggle="modal" data-bs-target="#${modalId}">
              Details
          </button>

          <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h1 class="modal-title fs-5" id="${modalId}">${product.strGlass}</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <img class="imagemodal" src="${product.strDrinkThumb}" alt="">
                          <hr>
                          <h6 class="modaltext">Details</h6>
                          <p class="modaltext">Category: <span class="modalsmall">${product.strCategory}</span></p>
                          <p class="modaltext">Alcoholic: <span class="modalsmall">${product.strAlcoholic}</span></p>
                          <p class="modaltext">${product.strInstructions}</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                  </div>
              </div>
          </div>

          <button class="fonts extra" onclick="handleIT('${product.strDrinkThumb}', '${product.strGlass}')">
              Add To Cart
          </button>
      `;

      productContainer.appendChild(div);
  });
};


const handleIT = (name, price) => {
  const Allcount = document.getElementById("count").innerText;
  let counting = parseFloat(Allcount);
  counting += 1;

  if (counting <= 7) {     
      document.getElementById("count").innerText = counting;
      let cartContainer = document.getElementById("carts");
      const div = document.createElement("div");
      div.classList.add("cart");
      div.innerHTML = `
          <p class="heading">${counting}</p>
          <img class="it" src="${name}" alt="">
          <p class="heading">${price}</p>
      `;
      cartContainer.appendChild(div);
  } else {
      alert('You Cannot Add Item More than 7 Items');
  }
}


loadAllDrinks();
