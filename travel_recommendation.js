const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submitBtn");
const beachRegExMatch = /beach/;
const templeRegExMatch = /temple/;
const countryRegExMatch = /countr/;

searchInput.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") {
    return;
  } else {
    console.log(testKeyword(searchInput.value.toLowerCase()));
  }
});

submitBtn.addEventListener("click", () => {
  console.log(testKeyword(searchInput.value.toLowerCase()));
});

fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Problem found with response: ");
      return;
    }
    return response.json();
  })
  .then((data) => {
    Object.entries(data).forEach(([category, items]) => {
      console.log(category.toUpperCase());
      items.forEach((item) => {
        if (item.cities) {
          item.cities.forEach((city) => {
            console.log(city.name, city.imageUrl);
          });
        } else {
          console.log(item.name, item.imageUrl);
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

function testKeyword(input) {
  let result = "";
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
    return "Unknown";
  }
  if (input.match(beachRegExMatch)) {
    result += "Beaches ";
  }
  if (input.match(templeRegExMatch)) {
    result += "Temples ";
  }
  if (input.match(countryRegExMatch)) {
    result += "Countries ";
  }
  return result;
}
