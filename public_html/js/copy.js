const span = document.querySelector("span.copy");

span.onclick = function() {
  document.execCommand("copy");
}

span.addEventListener("copy", (event) => {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", span.textContent);

    const alert = document.querySelector("#copy-alert");
    alert.classList.remove("hidden");

    setTimeout(() => {
      alert.classList.add("hidden");
    }, 1500);
  }
});
