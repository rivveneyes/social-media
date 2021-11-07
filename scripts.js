$(document).ready(function () {
  const address = "https://randomuser.me/api/?results=12";
  grabUsers(address);

  $("#next-scoll").click(() => {
    alert("hit");
  });

  async function grabUsers(call) {
    const people = await fetch(call).then((res) => res.json());
    people.results.forEach((person) => {
      const newLi = `<li><img src=${person.picture.medium}><img></li> `;
      $("#img-display").append(newLi);
    });
    let numberRefrence = people.results.length;

    //do while numbref>0 produce a
    //post with user-img text and comments util section
    // Math.floor(Math.random() * numberRefrence);
    while (numberRefrence > 0) {
      let randomUser = randomNumber(numberRefrence);
      let selectedPerson = people.results[randomUser];

      const newPost = `
    <div class="single-post">
      <div class="post-heading">
        <img src=${selectedPerson.picture.medium}></img>
        <span>${selectedPerson.name.first} ${selectedPerson.name.last}</span>
      </div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam perspiciatis architecto neque deleniti </p>
    ${interactionBar()}
    <input type="text" id="lname" name="lname" placeholder="THIS IS THE SPOT">
    </div>`;
      $(".post-section").append(newPost);
      numberRefrence--;
    }
    interactionListener();
    $("#img-display").slick();
  }
});
function randomNumber(limmitNum) {
  return Math.floor(Math.random() * limmitNum);
}

function interactionBar() {
  return `<div class="post-interactions"> <small class='likes'>${randomNumber(
    50
  )}</small> likes ~ <small class='shares'>${randomNumber(30)}</small> shares
<ol class="interaction-bar">
 <li class="like"></li>
 <li class="comment"></li>
 <li class="share"></li>
  </ol>
</div>`;
}
function interactionListener() {
  $(".interaction-bar").click((e) => {
    let action = e.target;

    if ($(action).hasClass("like")) {
      const hasClicked = action.className;
      let stringNubmer = $(action).parent().parent().children(".likes")[0];
      switch (hasClicked) {
        case "like":
          {
            $(action).addClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number + 1;
          }
          break;
        case "like clicked":
          {
            $(action).removeClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number - 1;
          }
          break;
      }
    } else if ($(action).hasClass("share")) {
      const hasClicked = action.className;
      let stringNubmer = $(action).parent().parent().children(".shares")[0];

      switch (hasClicked) {
        case "share":
          {
            $(action).addClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number + 1;
          }
          break;
        case "share clicked":
          {
            $(action).removeClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number - 1;
          }
          break;
      }
    }
  });
}
