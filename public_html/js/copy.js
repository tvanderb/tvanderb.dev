const span = document.querySelector("span.copy");
const alert = document.querySelector("#copy-alert");

span.onclick = function() {
  document.execCommand("copy");
}

span.addEventListener("copy", function(event) {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", span.textContent);
    alert.classList.remove("hidden");

    setTimeout(() => {
      alert.classList.add("hidden");
    }, 1500);
  }
});
