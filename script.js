const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
  burger.classList.add("active");
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("lock");
}

function closeMenu() {
  burger.classList.remove("active");
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("lock");
}

burger.addEventListener("click", () => {
  if (mobileMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.querySelector("#name").value,
    contact: form.querySelector("#contact").value,
    message: form.querySelector("#message").value,
  };

  status.textContent = "Отправка...";
  status.className = "loading";

  try {
    const response = await fetch(
      "https://portfolio-server-z2kz.onrender.com/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (result.success) {
      status.textContent = "Заявка успешно отправлена ✔";
      status.className = "success";
      form.reset();
    } else {
      status.textContent = "Ошибка отправки ✖";
      status.className = "error";
    }
  } catch (error) {
    console.error(error);
    status.textContent = "Ошибка соединения с сервером";
    status.className = "error";
  }
});
