const accountButton = document.querySelector(".navbar__nav-account");

accountButton.addEventListener("click", event => {
    const signOutBlock = document.querySelector(".navigation__status");
    const signOutButton = document.querySelector(".navbar__account-signout")
    signOutBlock.classList.toggle("hidden");
    signOutButton.classList.toggle("hidden");
});
