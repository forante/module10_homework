const URL = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector(".input");
const btnOpen = document.querySelector(".open-btn");
const btnSend = document.querySelector(".send-btn");
const btnClose = document.querySelector(".close-btn");
const out = document.querySelector(".chat-field");
const chat = document.querySelector(".chat");
const btnGeo = document.querySelector(".geo-btn");

let websocket;

btnOpen.addEventListener("click", () => {
  websocket = new WebSocket("wss://echo-ws-service.herokuapp.com/");
  websocket.addEventListener("open", () => {
    openClose(btnOpen);
  });
});

btnClose.addEventListener("click", () => {
  openClose(btnClose);
});

btnSend.addEventListener("click", () => {
  if (input.value) {
    postMessage(input.value, "my-message");
    websocket.send(input.value);
    websocket.onmessage = (e) => {
      postMessage(e.data);
    };
    input.value = "";
  }
});

btnGeo.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      console.log(coords.latitude, coords.longitude);
      let link = document.createElement("a");
      link.textContent = "Гео-локация";
      link.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
      link.classList.add("my-message");
      out.append(link);
    });
  }
});

function postMessage(sms, smsClass = "server-message") {
  let block = document.createElement("p");
  block.textContent = sms;
  block.classList.add(smsClass);
  return out.append(block);
}

function openClose(btn) {
  chat.classList.toggle("active");
  btn.setAttribute("disabled", "true");
  if (btn === btnOpen) {
    btnClose.removeAttribute("disabled");
  } else {
    btnOpen.removeAttribute("disabled");
    websocket.close();
    websocket = null;
  }
}
