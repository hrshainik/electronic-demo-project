document.addEventListener("DOMContentLoaded", () => {
  const lowerMenu = document.querySelector(".menu-items__lower");
  const dropdownToggles = document.querySelectorAll(".dropdown__toggle");
  const dropdownContents = document.querySelectorAll(".dropdown__content");
  const searchIcon = document.querySelector(".search-icon");
  const menuToggle = document.querySelector(".menu-icon");
  const menu = document.querySelector(".navbar__menu-items");
  const icons = document.querySelector(".navbar__icons");
  const menuToggleCheckobx = document.querySelector(".nav-checkbox");
  const navbar = document.querySelector(".navbar");

  function handleResponsiveInput() {
    if (window.innerWidth < 992 && inputField.parentElement !== lowerMenu) {
      // Show input field and hide search icon
      lowerMenu.appendChild(inputField);
    } else if (
      window.innerWidth < 992 &&
      inputField.parentElement === lowerMenu
    ) {
      if (inputField.querySelector(".advanced-search-btn")) {
        inputField.querySelector(".advanced-search-btn").style.display = "none";
      }

      if (inputField.querySelector(".close-icon")) {
        inputField.querySelector(".close-icon").style.display = "none";
      }

      const dropdownDivs = lowerMenu.querySelectorAll(":scope > div");
      for (const div of dropdownDivs) {
        div.style.display = "flex";
      }
      searchIcon.style.display = "none";
    } else if (
      inputField.parentElement === lowerMenu &&
      window.innerWidth >= 992
    ) {
      // Hide input field and show search icon
      inputField.remove();

      searchIcon.style.display = "block";
      menu.classList.remove("active");
      icons.classList.remove("active");
      menuToggleCheckobx.checked = false;
    }
  }

  dropdownToggles.forEach((toggle, index) => {
    toggle.addEventListener("click", () => {
      event.stopPropagation(); // Prevent the click from propagating to the document
      dropdownContents.forEach((content, contentIndex) => {
        if (index === contentIndex) {
          content.classList.toggle("appear");
          content.style.width = getComputedStyle(
            content.parentElement.parentElement,
          ).width;
        } else {
          content.classList.remove("appear");
        }
      });
    });
  });

  // Add a click event listener to the document to close content when clicking outside
  document.addEventListener("click", (event) => {
    dropdownContents.forEach((content) => {
      if (!content.contains(event.target)) {
        content.classList.remove("appear");
      }
    });
  });

  const inputField = document.createElement("div");
  inputField.classList.add("input-field");

  const input = document.createElement("input");
  const advancedSearchBtn = document.createElement("button");
  input.setAttribute("type", "text");
  input.setAttribute("class", "special-input");
  input.setAttribute("placeholder", "Minecraft, RPG, multiplayer...");
  advancedSearchBtn.innerText = "Advanced Search";
  advancedSearchBtn.setAttribute("class", "advanced-search-btn");
  inputField.appendChild(input);
  inputField.appendChild(advancedSearchBtn);

  let closeIcon = null;

  searchIcon.addEventListener("click", () => {
    const dropdownDivs = lowerMenu.querySelectorAll(":scope > div");
    if (window.innerWidth >= 992) {
      for (const div of dropdownDivs) {
        div.style.display = "none";
      }
    }

    searchIcon.style.display = "none";
    lowerMenu.appendChild(inputField);
    inputField.classList.add("input-animation");
    input.focus();

    if (inputField.querySelector(".advanced-search-btn")) {
      inputField.querySelector(".advanced-search-btn").style.display = "block";
    }

    if (!closeIcon) {
      closeIcon = document.createElement("span");
      closeIcon.classList.add("close-icon");
      closeIcon.innerHTML = "&#10006;";
      inputField.appendChild(closeIcon);
    } else {
      closeIcon.style.display = "block";
    }
  });

  lowerMenu.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-icon")) {
      inputField.remove();
      searchIcon.style.display = "block";

      const dropdownDivs = lowerMenu.querySelectorAll(":scope > div");
      for (const div of dropdownDivs) {
        div.style.display = "flex";
      }
    }
  });

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    icons.classList.toggle("active");

    if (menu.classList.contains("active")) {
      navbar.style.position = "fixed"; // Re-enable scrolling
    } else {
      navbar.style.position = "absolute"; // Disable scrolling
    }
    handleResponsiveInput();
  });

  window.addEventListener("resize", handleResponsiveInput);
  handleResponsiveInput(); // Call initially to set the correct state
});
