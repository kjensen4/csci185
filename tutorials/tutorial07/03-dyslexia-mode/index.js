/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

if (window.localStorage.getItem("dyslexia") === "true"){
  body = document.querySelector("body").className = "dyslexia"
}

function dyslexiaToggle() {
  let body = document.querySelector("body");
  if (body.className == "dyslexia") {
    body.className = ""
    window.localStorage.setItem("dyslexia", "false");
    return
  }
  body.className = "dyslexia"
  window.localStorage.setItem("dyslexia", "true");
  return
}