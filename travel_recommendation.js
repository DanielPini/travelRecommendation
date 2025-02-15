const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submitBtn");
const beachRegExMatch = /beach/;
const templeRegExMatch = /temple/;
const countryRegExMatch = /countr/;
let searchData = "";

searchInput.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") {
    return;
  } else {
    searchData = testKeyword(searchInput.value.toLowerCase());
    generateSearchResults();
  }
});

submitBtn.addEventListener("click", () => {
  searchData = testKeyword(searchInput.value.toLowerCase());
  generateSearchResults();
});

function testKeyword(input) {
  let result = [];
  if (!input) {
    return;
  }
  if (
    !(
      input.match(beachRegExMatch) ||
      input.match(templeRegExMatch) ||
      input.match(countryRegExMatch)
    )
  ) {
    result = ["unknown"];
    return;
  }
  if (input.match(beachRegExMatch)) {
    result.push("beaches");
  }
  if (input.match(templeRegExMatch)) {
    result.push("temples");
  }
  if (input.match(countryRegExMatch)) {
    result.push("countries");
  }
  return result;
}

function generateSearchResults() {
  const resultsContainer = document.createElement("div");
  resultsContainer.classList.add("results-container");
  document.body.appendChild(resultsContainer);

  fetch("travel_recommendation_api.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(searchData);
      if (searchData == "unknown" || searchData == undefined) {
        const result = document.createElement("div");
        result.classList.add("result");
        const wordName = document.createElement("h3");
        wordName.classList.add("wordName");
        wordName.innerHTML = `
        Please enter a valid keyword: <br />
        ('Countries', 'Temples', 'Beaches').`;
        resultsContainer.appendChild(result);
        result.appendChild(wordName);
        return;
      }
      Object.entries(data).forEach(([category, items]) => {
        searchData.forEach((word) => {
          if (word == category) {
            if (word === "countries") {
              items.forEach((item) => {
                item.cities.forEach((city) => {
                  const result = document.createElement("div");
                  result.classList.add("result");
                  const wordName = document.createElement("h3");
                  wordName.classList.add("wordName");
                  const image = document.createElement("img");
                  image.classList.add("image");
                  const blurb = document.createElement("p");
                  blurb.classList.add("result");
                  wordName.textContent = city.name;
                  image.src = city.imageUrl;
                  blurb.textContent = city.description;
                  resultsContainer.appendChild(result);
                  result.appendChild(wordName);
                  result.appendChild(image);
                  result.appendChild(blurb);
                });
              });
            } else {
              console.log(word.toUpperCase());
              console.log(data[word]);
              items.forEach((item) => {
                const result = document.createElement("div");
                result.classList.add("result");
                const wordName = document.createElement("h3");
                wordName.classList.add("wordName");
                const image = document.createElement("img");
                image.classList.add("image");
                const blurb = document.createElement("p");
                blurb.classList.add("result");
                wordName.textContent = item.name;
                image.src = item.imageUrl;
                blurb.textContent = item.description;
                console.log(item.name);
                console.log(item.imageUrl);
                console.log(item.description);
                resultsContainer.appendChild(result);
                result.appendChild(wordName);
                result.appendChild(image);
                result.appendChild(blurb);
              });
            }
          }
        });
      });
    })
    .catch((error) => {
      // console.error("error", error);
    });
}

//   if (word !== "countries") {
//     wordName.textContent = data.word.name;
//     blurb.textContent = data[word].description;
//     console.log(`Found results for ${word}:`, data[word]);
//     resultsContainer.appendChild(result);
//     result.appendChild(wordName);
//     result.appendChild(blurb);
//   } else {
//   }
// } else {
//   console.log(`No results found for ${word}`);
// }
