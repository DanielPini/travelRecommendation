fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Problem found with response: ");
      return;
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.countries);
  })
  .catch((error) => {
    console.error("Error", error);
  });
