$(document).ready(function () {
  const httpAddress = "https://randomuser.me/api/?results=25";
  async function grabUsers(call) {
    const people = await fetch(call).then((res) => res.json());
    people.results.forEach((person) => {
      const newLi = `<li><img src=${person.picture.medium}></li> `;
      $("#img-display").append(newLi);
      displayActiveUsers(person);
    });
    let numberRefrence = people.results.length;

    while (numberRefrence > 10) {
      let randomUser = randomNumber(numberRefrence);
      let selectedPerson = people.results[randomUser];
      const newPost = `
    <div class="single-post">
  ${creatUserDisplay(selectedPerson)}
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam perspiciatis architecto neque deleniti </p>
    ${interactionBar()}
  ${interactionSkeletion(creatUserDisplay(selectedPerson))}
  </div>`;
      $(".post-section").append(newPost);

      numberRefrence--;
    }

    $("#img-display").slick({
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 6.7,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 4.3,
            slidesToScroll: 3.7,
          },
        },
      ],
    });
    exitButton();
    postSection();
    PostUserComment();
    interactComments();
  }
  grabUsers(httpAddress);
});

function displayActiveUsers(user) {
  const activeUser = `<li><div class="active-position"><img src=${user.picture.medium}> <div class="active-dot"></div></div><p>${user.name.first} ${user.name.last}</p></li>`;
  $("#active-users-list").prepend(activeUser);
}
///--------html-skeletons----
function interactionSkeletion(person) {
  return `  <div class="comments-page">
  <input type="text" class="place-comment comment" placeholder="Post comment">
  <button class="post-button post">Post</button>
  <span class="comment">comments</span>
</div>
<div class="hide show show-comments-section">
<button class="exit-button">EXIT</button>
<div class="user-comment-display">
 ${person}
<p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aliquam  Lorem ipsum dolor, sit amet</p>
  </div>
</div>
</div>`;
}
///-----sample-dummy-users
function creatUserDisplay(user) {
  return `<div class="post-heading">
      <img src=${user.picture.medium}>
      <span>
        ${user.name.first} ${user.name.last}
      </span>
    </div>`;
}
///-----likes-comments-shares
function interactionBar() {
  return `<div class="post-interactions"> <small class='likes'>${randomNumber(
    50
  )}</small> likes ~ <small class='shares'>${randomNumber(30)}</small> shares
<div class="interaction-bar">
<div class="like"></div><small class="like">like</small>
<div class="comment"></div><small class="comment">comments</small>
 <div class="share"></div><small class="share">share</small>
  </div>
</div>`;
}
//user-post-skeleton
function PostUserComment() {
  $("#post-user-comment").click(() => {
    if ($("#user-input-text")[0].value !== "") {
      const user = ` 
      <div class="post-heading">
        <div class="user-img"></div>
        <span>User</span></div>`;
      const newUserPost = `
        <div class="single-post">
      ${user}
        <p>${$("#user-input-text")[0].value}</p>
        ${interactionBar()}
        ${interactionSkeletion(user)}
        </div>
        `;
      $(".post-section").prepend(newUserPost);
      $("#user-input-text")[0].value = "";
      exitButton();
    }
    commentsListener($(".comments-page")[0]);
  });
}
///--------Listeners----
function exitButton() {
  const exitButtonsArr = [...$(".exit-button")];
  exitButtonsArr.forEach((button) => {
    $(button).click((e) => {
      const parent = $(e.target).parent()[0];

      $(parent).addClass("hide");
    });
  });
}
///-----add-users-listiener-initalize---
function interactComments() {
  const comments = [...$(".comments-page")];
  comments.forEach((comment) => {
    commentsListener(comment);
  });
}
///---all-users-posts-section----
function postSection() {
  $("#posts").click((e) => {
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
    } else if ($(action).hasClass("comment")) {
      const parent = $(action).parent().parent().parent()[0];
      const target = $(parent).children(".show-comments-section")[0];
      $(target).toggleClass("hide");
    }
  });
}
///----add-listener-to-new-comment---
function commentsListener(target) {
  $(target).click((e) => {
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
//--------random number renerator---------
function randomNumber(limmitNum) {
  return Math.floor(Math.random() * limmitNum);
}
