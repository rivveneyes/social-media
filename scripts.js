$(document).ready(function () {
  const address = "https://randomuser.me/api/?results=20";
  async function grabUsers(call) {
    const people = await fetch(call).then((res) => res.json());
    people.results.forEach((person) => {
      const newLi = `<li><img src=${person.picture.medium}><img></li> `;
      $("#img-display").append(newLi);
    });
    let numberRefrence = people.results.length;
    console.log(people.results);
    //do while numbref>0 produce a
    //post with user-img text and comments util section
    // Math.floor(Math.random() * numberRefrence);
    while (numberRefrence > 0) {
      console.log("create");
      let randomUser = randomNumber(numberRefrence);
      let selectedPerson = people.results[randomUser];
      const newPost = `
      <div id="single-post">
        <div class="post-heading">
          <img src=${selectedPerson.picture.medium}></img>
          <span>${selectedPerson.name.first} ${selectedPerson.name.last}</span>
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam perspiciatis architecto neque deleniti </p>
        <div id=post-interactions> ${randomNumber(50)} likes ~ ${randomNumber(
        30
      )} shares<div>
      </div>`;
      $(".post-section").append(newPost);
      numberRefrence--;
    }
  }

  $("#next-scoll").click(() => {
    alert("hit");
  });

  grabUsers(address);
});
function randomNumber(limmitNum) {
  return Math.floor(Math.random() * limmitNum);
}
