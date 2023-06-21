/* MAIN TITLE ANIMATION */

const title = document.querySelector(".title-intro");
const beforeCursor = document.querySelector(".cursor.before-passion");
const afterCursor = document.querySelector(".cursor.after-passion");
const passion = document.querySelector(".title-passion");

let start, prevTimeStamp;
let pauseStart;

let titleIntroDone = false;
let passionListIdx = 0;
let erasing = false;

const titleText = "For the passion of ";
const passionList = [
  "programming",
  "mathematics",
  "creating",
  "reading",
  "learning.",
];

let nextWaitTime;

function updateMainTitle(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
    nextWaitTime = 1500;
  }

  const elapsed = timeStamp - start;

  if (prevTimeStamp !== timeStamp && elapsed >= nextWaitTime) {
    nextWaitTime = 50;

    //write the intro part of the title
    if (!titleIntroDone) {
      beforeCursor.classList.remove("flickering");

      if (title.textContent.length === titleText.length) {
        titleIntroDone = true;
      } else {
        title.textContent = titleText.slice(0, title.textContent.length + 1);
      }
    } else {
      beforeCursor.classList.remove("active");
      afterCursor.classList.add("active");
      //write each passion one by one, leave the last one on the screen
      let passionText = passionList[passionListIdx];
      let passionLen = passionList[passionListIdx].length;
      let currentLen = passion.textContent.length;

      if (currentLen < passionLen) {
        if (!erasing) {
          passion.textContent = passionText.slice(
            0,
            passion.textContent.length + 1
          );
        } else {
          if (passion.textContent.length > 0) {
            passion.textContent = passionText.slice(
              0,
              passion.textContent.length - 1
            );
          } else {
            erasing = false;

            passionListIdx++;
          }
        }
      } else {
        //wrote the hole word, time to backtrack
        //unless it was the last passionList element, in which case return
        if (passionListIdx === passionList.length - 1) {
          afterCursor.classList.add("flickering");
          setTimeout(() => {
            afterCursor.style.display = "none";
          }, 3000);

          return;
        }

        if (!erasing) {
          erasing = true;
          afterCursor.classList.add("flickering");
          nextWaitTime = 2000;
        } else {
          passion.textContent = passionText.slice(
            0,
            passion.textContent.length - 1
          );
        }
      }
    }

    // cursor.classList.add("flickering");
    // setTimeout(() => {
    //   cursor.style.display = "none";
    // }, 2000);
    // return;

    start = timeStamp;
  }

  prevTimeStamp = timeStamp;

  requestAnimationFrame(updateMainTitle);
}

//this call is one off - so we need to call it again inside updateMainTitle
requestAnimationFrame(updateMainTitle);

/* ABOUT ME SCROLL */
let firstImg = document.querySelector(".about-me img:first-child");
let secondImg = document.querySelector(".about-me div + img");
let firstText = document.querySelector(".about-me img + div");
let secondText = document.querySelector(".about-me div:first-child");

document.addEventListener("scroll", () => {
  if (scrollY >= 300) {
    firstImg.style.opacity = 1;
  }
  if (scrollY >= 600) {
    secondImg.style.opacity = 1;
  }
});