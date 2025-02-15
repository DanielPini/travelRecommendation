const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submitBtn");
const beachRegExMatch = /beach/;
const templeRegExMatch = /temple/;
const countryRegExMatch = /countr/;
let searchData = "";

const clearBtn = document.getElementById("clearBtn");

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

clearBtn.addEventListener("click", () => {
  searchData = "";
  removeResultsContainer();
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
                  blurb.classList.add("blurb");
                  const localTime = document.createElement("p");
                  localTime.classList.add("localTime");
                  wordName.textContent = city.name;
                  image.src = city.imageUrl;
                  blurb.textContent = city.description;
                  resultsContainer.appendChild(result);
                  result.appendChild(image);
                  result.appendChild(wordName);
                  result.appendChild(blurb);
                  let words = "";
                  if (city.name.includes("Japan")) {
                    words = "japan";
                    const countryCity = words;
                    localTime.textContent = `The time in ${
                      city.name
                    } is ${displayLocalTime(countryCity)}`;
                  } else if (city.name.includes("Brazil")) {
                    words = "America/Fortaleza";
                    const countryCity = words;
                    localTime.textContent = `The time in ${
                      city.name
                    } is ${displayLocalTime(countryCity)}`;
                  } else {
                    words = city.name.split(", ");
                    const modifiedWords = words.map((word) =>
                      word.replace(/ /g, "_")
                    );
                    const countryCity =
                      modifiedWords[1] + "/" + modifiedWords[0];
                    localTime.textContent = `The time in ${
                      city.name
                    } is ${displayLocalTime(countryCity)}`;
                  }
                  result.appendChild(localTime);
                });
              });
            } else {
              items.forEach((item) => {
                const result = document.createElement("div");
                result.classList.add("result");
                const wordName = document.createElement("h3");
                wordName.classList.add("wordName");
                const image = document.createElement("img");
                image.classList.add("image");
                const blurb = document.createElement("p");
                blurb.classList.add("blurb");
                wordName.textContent = item.name;
                image.src = item.imageUrl;
                blurb.textContent = item.description;
                resultsContainer.appendChild(result);
                result.appendChild(image);
                result.appendChild(wordName);
                result.appendChild(blurb);
              });
            }
          }
        });
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function removeResultsContainer() {
  const existingContainer = document.querySelector(".results-container");
  if (!existingContainer) {
    return;
  } else {
    document.body.removeChild(existingContainer);
  }
}

function displayLocalTime(city) {
  const options = {
    timeZone: city,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const time = new Date().toLocaleTimeString("en-US", options);
  return time;
}
