"use strict";

window.addEventListener("DOMContentLoaded", init);

let selectedColor;

function init() {
  console.log("init");
  loadSVG();
}

async function loadSVG() {
  let response = await fetch("assets/kanye.svg");
  let mySvgData = await response.text();
  document.querySelector("section").innerHTML = mySvgData;

  document.querySelector("button").addEventListener("click", resetColor);
  document.querySelector("#Layer_2").addEventListener("click", changeColor);
  //   document.querySelector("button").addEventListener("click", startKanye);

  document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("click", e => {
      selectedColor = e.target.dataset.color;
      console.log(selectedColor);
      document.querySelector(".selectedcolor").style.backgroundColor = selectedColor;

      if (document.querySelector("#Neck").hasAttribute("fill")) {
        startKanye();
      }
    });
  });
}

function changeColor(e) {
  //   console.log("Har den fill", e.target.dataset.isItFilled);
  e.target.dataset.isItFilled = "true";
  e.target.style.fill = selectedColor;
  checkIfAllAreColored();
}

function resetColor() {
  document.querySelectorAll("#Layer_2 path").forEach(path => {
    path.style.fill = "white";
  });
}

function startKanye() {
  document.querySelector("g").classList.add("kanye");
  document.querySelector("g").addEventListener("animationend", kanyeReset);
}

function kanyeReset() {
  document.querySelector("g").classList.remove("kanye");
}

function checkIfAllAreColored() {
  var allAreTrue = true;
  document.querySelectorAll(".cls-1").forEach(elm => {
    // console.log("is it filled " + (elm.dataset.isItFilled == "true"));
    if (elm.dataset.isItFilled != "true") {
      allAreTrue = false;
      // console.log("Den er  false");
    }
  });
  if (allAreTrue === true) {
    startKanye();
  }
  //   console.log("Are all true", allAreTrue);
}
