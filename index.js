// TOGGLE MENU FOR SMALL SCREENS
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}


 // Background color change effect on button click
 document.getElementById('random-btn').addEventListener('click', function() {
  document.getElementById('hero').style.background = 'linear-gradient(to bottom, #e3649c, white)';
});



document.getElementById("quiz-btn").addEventListener("click", function() {
  document.querySelector(".cocktail-container").scrollIntoView({ behavior: "smooth" }); // Scrolls to Find Your Cocktail
});



// TOGGLE MENU FOR SMALL SCREENS
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('show');
}
// Background color change effect on button click
document.getElementById('random-btn').addEventListener('click', function() {
  document.getElementById('hero').style.background = 'linear-gradient(to bottom, #e3649c, white)';
  document.getElementById("preference-section").scrollIntoView({ behavior: "smooth" }); // Scrolls to Preferences
});

document.getElementById('quiz-btn').addEventListener('click', function() {
  document.querySelector(".cocktail-container").scrollIntoView({ behavior: "smooth" }); // Scrolls to Find Your Cocktail
});









// Function for searching cocktails by name
document.getElementById("searchBtn").addEventListener("click", searchCocktails);

async function searchCocktails() {
  const query = document.getElementById("searchInput").value.trim();
  if (query === "") {
      alert("Please enter a cocktail name!");
      return;
  }

  const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  
  try {
      const response = await fetch(apiURL);
      const data = await response.json();
      displaySearchResults(data.drinks);
  } catch (error) {
      console.error("Error fetching cocktails:", error);
  }
}

function displaySearchResults(cocktails) {
  const grid = document.getElementById("cocktailGrid");
  grid.innerHTML = "";

  if (!cocktails) {
      grid.innerHTML = "<p>No cocktails found!</p>";
      return;
  }

  cocktails.forEach(drink => {
      const card = document.createElement("div");
      card.classList.add("cocktail-card");

      // Extract ingredients
      let ingredients = "";
      for (let i = 1; i <= 15; i++) {
          let ingredient = drink[`strIngredient${i}`];
          let measure = drink[`strMeasure${i}`];
          if (ingredient) {
              ingredients += `<li>${measure ? measure : ""} ${ingredient}</li>`;
          }
      }

      card.innerHTML = `
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
          <h3>${drink.strDrink}</h3>
          <ul class="ingredients">${ingredients}</ul>
          <p class="instructions">${drink.strInstructions}</p>
      `;

      grid.appendChild(card);
  });
}





// Function for finding cocktails based on preferences
document.getElementById("find-btn").addEventListener("click", filterCocktails);

async function filterCocktails() {
  const alcoholType = document.getElementById("alcohol-type").value;
  
  const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcoholType}`;
  
  try {
      const response = await fetch(apiURL);
      const data = await response.json();
      
      if (!data.drinks) {
          document.getElementById("cocktail-container").innerHTML = "<p>No cocktails found!</p>";
          return;
      }

      // Fetch detailed info for each cocktail
      let detailedCocktails = [];
      for (let drink of data.drinks.slice(0, 5)) { // Limit to 5 drinks for performance
          let detailsResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
          let detailsData = await detailsResponse.json();
          detailedCocktails.push(detailsData.drinks[0]);
      }

      displayFilteredResults(detailedCocktails);
  } catch (error) {
      console.error("Error fetching cocktails:", error);
  }
}

function displayFilteredResults(cocktails) {
  const grid = document.getElementById("cocktail-container");
  grid.innerHTML = "";

  if (!cocktails) {
      grid.innerHTML = "<p>No cocktails found!</p>";
      return;
  }

  cocktails.forEach(drink => {
      const card = document.createElement("div");
      card.classList.add("cocktail-card");

      // Extract ingredients
      let ingredients = "";
      for (let i = 1; i <= 15; i++) {
          let ingredient = drink[`strIngredient${i}`];
          let measure = drink[`strMeasure${i}`];
          if (ingredient) {
              ingredients += `<li>${measure ? measure : ""} ${ingredient}</li>`;
          }
      }

      card.innerHTML = `
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
          <h3>${drink.strDrink}</h3>
          <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
          <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
          <ul><strong>Ingredients:</strong> ${ingredients}</ul>
      `;

      grid.appendChild(card);
  });
}



// about section


  // Fade-in animation
  document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("show");
        }, index * 300);
    });
});

// CTA Alert
document.querySelector(".cta").addEventListener("click", function() {
    alert("Let’s talk business! Contact us now.");
});


  // Fade-in effect on load
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".fade-in").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    });
});
