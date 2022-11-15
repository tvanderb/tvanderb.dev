function hookCopyEvents() {
  const copy_tags = document.getElementsByClassName("copy");

  for (const tag in copy_tags) {
    if (Object.hasOwnProperty.call(copy_tags, tag)) {
      const span = copy_tags[tag];

      span.onclick = () => {
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
    }
  }

}