const revealItems = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".scroll-progress");

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

const updateScrollProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });

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

const ventureData = {
  poultry: {
    image:
      "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Poultry operating platform",
    kicker: "Operating now",
    title: "Risha Poultry Platform",
    text:
      "The first venture sets the group standard: disciplined production, consistent handling, and a clean path from site operations to customer supply.",
    metricOne: "6-stage",
    metricTwo: "Traceable"
  },
  feed: {
    image:
      "https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Agricultural grain and feed inputs",
    kicker: "Expansion logic",
    title: "Feed & Input Control",
    text:
      "Feed quality determines reliability. A future input platform would help protect margins, nutrition standards, and supplier consistency.",
    metricOne: "Input-led",
    metricTwo: "Margin care"
  },
  distribution: {
    image:
      "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Logistics and distribution vehicle",
    kicker: "Future platform",
    title: "Distribution Reliability",
    text:
      "A stronger route-to-market layer would connect production with B2B customers through cleaner delivery windows and clearer accountability.",
    metricOne: "B2B-ready",
    metricTwo: "Route logic"
  }
};

const ventureTabs = document.querySelectorAll(".venture-tab");
const ventureImage = document.querySelector("#ventureImage");
const ventureKicker = document.querySelector("#ventureKicker");
const ventureTitle = document.querySelector("#ventureTitle");
const ventureText = document.querySelector("#ventureText");
const ventureMetricOne = document.querySelector("#ventureMetricOne");
const ventureMetricTwo = document.querySelector("#ventureMetricTwo");

ventureTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const next = ventureData[tab.dataset.venture];
    if (!next) return;

    ventureTabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });

    ventureImage.classList.add("is-switching");

    window.setTimeout(() => {
      ventureImage.src = next.image;
      ventureImage.alt = next.alt;
      ventureKicker.textContent = next.kicker;
      ventureTitle.textContent = next.title;
      ventureText.textContent = next.text;
      ventureMetricOne.textContent = next.metricOne;
      ventureMetricTwo.textContent = next.metricTwo;
      ventureImage.classList.remove("is-switching");
    }, 180);
  });
});

const form = document.querySelector("#partnerForm");
const formError = document.querySelector("#formError");
const formSuccess = document.querySelector("#formSuccess");

if (form) {
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
}
