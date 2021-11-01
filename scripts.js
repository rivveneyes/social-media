$(document).ready(function () {
  const address = "https://randomuser.me/api/?results=20";
  async function grabUsers(call) {
    const people = await fetch(call).then((res) => res.json());
    console.log(people);
    people.results.forEach((person) => {
      const newLi = `<li><img src=${person.picture.medium}><img></li> `;
      $("#img-display").append(newLi);
    });
  }

  $("#next-scoll").click(() => {
    alert("hit");
  });

  grabUsers(address);
});
