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
      <button class="exit-button">EXIT</button>
      <div class="user-comment-display">
      ${creatUserDisplay(selectedPerson)}
      <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam  Lorem ipsum dolor, sit amet</p>
        </div>
      </div>
    </div>`;
      $(".post-section").append(newPost);
      numberRefrence--;
    }
    exitButton();
    interactionListener();
    interactComments();
    $("#img-display").slick();
  }
});
function interactComments() {
  $(".comments-page").click((e) => {
    const post = e.target;
    const parent = $(post).parent().parent()[0];
    const picker = $(parent).children(".show")[0];
    if ($(post).hasClass("comment")) {
      $(picker).toggleClass("hide");
    } else if ($(post).hasClass("post-button")) {
      const commentPage = $(post).parent()[0];
      const input = $(commentPage).children(".place-comment")[0];
      if (input.value) {
        $(picker).removeClass("hide");
        const pince = $(parent).children(".show-comments-section")[0];
        const newPost = `<div class="user-comment-display"><div class="post-heading"><div class="user-img"></div><span>User</span></div><p>${input.value}</p></div>`;
        pince.innerHTML += newPost;
        exitButton();
        input.value = "";
      }
      return;
    }
    return;
  });
}
function exitButton() {
  const exitButtonsArr = [...$(".exit-button")];
  exitButtonsArr.forEach((button) => {
    $(button).click((e) => {
      const parent = $(e.target).parent()[0];
      console.log(parent);
      $(parent).addClass("hide");
    });
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
<div class="like"></div><small class="like">like</small>
<div class="comment"></div><small>comment</small>
 <div class="share"></div><small class="share">share</small>
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
            $(action).siblings(".like").addClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number + 1;
          }
          break;
        case "like clicked":
          {
            $(action).removeClass("clicked");
            $(action).siblings(".like").removeClass("clicked");
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
            $(action).siblings(".share").addClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number + 1;
          }
          break;
        case "share clicked":
          {
            $(action).removeClass("clicked");
            $(action).siblings(".share").removeClass("clicked");
            const number = parseInt(stringNubmer.innerHTML);
            stringNubmer.innerHTML = number - 1;
          }
          break;
      }
    }
  });
}
