const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const bounds = button.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

const form = document.querySelector("#partnerForm");
const formError = document.querySelector("#formError");
const formSuccess = document.querySelector("#formSuccess");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";
  formSuccess.textContent = "";

  const data = new FormData(form);
  const requiredFields = ["name", "email", "interest", "message"];
  const missingField = requiredFields.find((field) => !String(data.get(field) || "").trim());

  if (missingField) {
    formError.textContent = "Please complete every field before sending your note.";
    return;
  }

  const email = String(data.get("email"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formError.textContent = "Enter a valid email address so the Risha team can respond.";
    return;
  }

  form.reset();
  formSuccess.textContent =
    "Thank you. Your partnership note is ready for routing when connected to a backend.";
});
