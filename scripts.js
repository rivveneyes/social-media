$(document).ready(function () {
  const address = "https://randomuser.me/api/?results=20";
  let fetchedPeople;
  async function grabUsers(call) {
    fetch(call)
      .then((res) => res.json())
      .then((data) => (fetchedPeople = data.results));
  }
  grabUsers(address);
});
