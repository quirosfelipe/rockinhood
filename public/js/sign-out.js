const accountButton = document.querySelector(".navbar__nav-account");

accountButton.addEventListener("click", (event) => {
  const signOutBlock = document.querySelector(".navigation__status");
  const signOutButton = document.querySelector(".navbar__account-signout");
  signOutBlock.classList.toggle("hidden");
  signOutButton.classList.toggle("hidden");
});

const signOutButton = document.querySelector(".navbar__account-signout");
signOutButton.addEventListener("click", (event) => {
  localStorage.removeItem("ROCKINHOOD_ACCESS_TOKEN");
  localStorage.removeItem("ROCKINHOOD_CURRENT_USER_ID");
  localStorage.removeItem("ROCKINHOOD_CURRENT_CASH_BALANCE");
  window.location.href = "/";
});
