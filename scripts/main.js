/* requestanimationframe tells the browser that you want to perform
   an animation and requests that the browser calls a specific function
   to update an animation right before the next repaint */

const title = document.querySelector(".title-intro");
const cursor = document.querySelector(".cursor");
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
  "learning",
];

let nextWaitTime;

function updateMainTitle(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
    nextWaitTime = 2000;
  }

  const elapsed = timeStamp - start;

  if (prevTimeStamp !== timeStamp && elapsed >= nextWaitTime) {
    if (nextWaitTime > 60) nextWaitTime = 60;

    cursor.classList.remove("flickering");

    //write the intro part of the title
    if (!titleIntroDone) {
      if (title.textContent.length === titleText.length) {
        titleIntroDone = true;
      } else {
        title.textContent = titleText.slice(0, title.textContent.length + 1);
      }
    } else {
      //write each passion one by one, leave the last one on the screen
      console.log(passionListIdx);
      let passionText = passionList[passionListIdx];
      let passionLen = passionList[passionListIdx].length;
      let currentLen = passion.textContent.length;

      console.log(`currentLen: ${currentLen}, passionLen: ${passionLen}`);

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
            nextWaitTime = 500;
            erasing = false;
            cursor.classList.add("flickering");

            console.log("increasint idx...");
            passionListIdx++;
          }
        }
      } else {
        //wrote the hole word, time to backtrack
        //unless it was the last passionList element, in which case return
        if (passionListIdx === passionList.length - 1) {
          cursor.classList.add("flickering");
          setTimeout(() => {
            cursor.style.display = "none";
          }, 3000)

          return;
        }

        if (!erasing) {
          erasing = true;
          cursor.classList.add("flickering");
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
