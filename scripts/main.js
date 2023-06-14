/* requestanimationframe tells the browser that you want to perform
   an animation and requests that the browser calls a specific function
   to update an animation right before the next repaint */

const title = document.querySelector(".main-title h1");
const cursor = document.querySelector(".cursor");

let start, prevTimeStamp;
let pauseStart;

let titleText = "For the passion of programming.";

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

    title.textContent = titleText.slice(0, title.textContent.length + 1);

    //stop condition
    if (title.textContent.length === titleText.length) {
      cursor.classList.add("flickering");
      setTimeout(() => {
        cursor.style.display = "none";
      }, 2000);
      return;
    }

    start = timeStamp;
  }

  prevTimeStamp = timeStamp;

  requestAnimationFrame(updateMainTitle);
}

//this call is one off - so we need to call it again inside updateMainTitle
requestAnimationFrame(updateMainTitle);
