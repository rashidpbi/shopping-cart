console.log("====================================");
console.log("Connected");
console.log("====================================");
document.addEventListener("DOMContentLoaded", async function () {
  const tabs = document.querySelectorAll(".tab");
  const cardContainer = document.querySelector(".card-container");

  // Default category is "Men"
  let selectedCategory = "Men";

  // Fetch data from API for the default category
  const apiUrl = `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
 
      renderCards(data.categories[0]);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
 
  
  tabs.forEach((tab) => {
    tab.addEventListener("click", async () => {
      const category = tab.getAttribute("data-category");
      selectedCategory = category; // Update selected category

      // Fetch data from API based on the clicked tab's category
      const apiUrl = `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`;

      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
         
          if (category == "Men") {
            renderCards(data.categories[0]);
          } else if (category == "Women") {
            renderCards(data.categories[1]);
          } else if (category == "Kids") {
            renderCards(data.categories[2]);
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
     
    });
  });

  function renderCards(Data) {
    cardContainer.innerHTML = "";

    // Parse the JSON data into an object
    let datas = Data.category_products;

    // Assuming data.category_products is an array
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach((data) => {
        
        const card = document.createElement("div");
        
        card.classList.add("card");

        card.innerHTML = `
        <div class="card">
          <div class="img-container">
            <img src="${data.image}" alt="Product Image" class="img">
            ${data.badge_text ? `<div class="badge">${data.badge_text}</div>` : ''}
          </div>
          <div class="main">
            <div class="title"><p>${truncateText(data.title)}</p></div>
            <div class="vendor"><p><li>${data.vendor}</li></p></div>

          </div>
          <div class="detail">
            <div class="price">Rs ${data.price}</div>
            <div class="compare">${data.compare_at_price}</div>
            <div class="off">${Math.round(((data.compare_at_price - data.price) / data.compare_at_price) * 100)}% off</div>
          </div>
          <div class='btn-container'>
            <button class="btn">Add to cart</div>
          </div>
        </div>
      `;
      
        cardContainer.appendChild(card);
      });
    } else {
      // Create a new card element for displaying a message
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<p>No products found for this category.</p>`;
    cardContainer.appendChild(card);
    }
  }
});

// Function to truncate text if it exceeds a certain length
function truncateText(text, maxLength = 10) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...'; // Truncate and add ellipsis
  }
  return text;
}
