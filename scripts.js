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
  ${creatUserDisplay(selectedPerson)}
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam perspiciatis architecto neque deleniti </p>
    ${interactionBar()}
    <div class="comments-page">
        <input type="text" class="place-comment comment" placeholder="Post comment">
        <button class="post-button post">Post</button>
        <span class="comment">comments</span>
    </div>
      <div class="hide show show-comments-section">
        <div class="user-comment-display">
           ${creatUserDisplay(selectedPerson)}
          <button class="comment">EXIT</button>
        </div>
        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam</p>
      </div>
    </div>`;
      $(".post-section").append(newPost);
      numberRefrence--;
    }
    interactionListener();
    interactComments();
    $("#img-display").slick();
  }
});
function interactComments() {
  $(".comments-page").click((e) => {
    const post = e.target;
    if ($(post).hasClass("comment")) {
      const parent = $(post).parent().parent()[0];
      const picker = $(parent).children(".show")[0];
      $(picker).toggleClass("hide");
    }
  });
}
function creatUserDisplay(user) {
  return `<div class="post-heading">
      <img src=${user.picture.medium}></img>
      <span>
        ${user.name.first} ${user.name.last}
      </span>
    </div>`;
}
function randomNumber(limmitNum) {
  return Math.floor(Math.random() * limmitNum);
}

function interactionBar() {
  return `<div class="post-interactions"> <small class='likes'>${randomNumber(
    50
  )}</small> likes ~ <small class='shares'>${randomNumber(30)}</small> shares
<div class="interaction-bar">
<div class="like"></div><small>like</small>
<div class="comment"></div><small>comment</small>
 <div class="share"></div><small>share</small>
  </div>
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
