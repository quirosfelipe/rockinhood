import { backendUrl } from "./utils.js";

const demoButton1 = document.querySelector(".section3__button");
demoButton1.addEventListener("click", async (e) => {
  try {
    const res = await fetch(`${backendUrl}/users/guest`, {
      method: "POST",
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id, cashBalance },
    } = await res.json();
    // storage access_token in localStorage:
    localStorage.setItem("ROCKINHOOD_ACCESS_TOKEN", token);
    localStorage.setItem("ROCKINHOOD_CURRENT_USER_ID", id);
    localStorage.setItem("ROCKINHOOD_CURRENT_CASH_BALANCE", cashBalance);
    // redirect to home page to see all tweets:
    window.location.href = "/portfolio";
  } catch (err) {
    handleErrors(err);
  }
});

const demoButton2 = document.querySelector(".section5__nav--button");
demoButton2.addEventListener("click", async (e) => {
  try {
    const res = await fetch(`${backendUrl}/users/guest`, {
      method: "POST",
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id, cashBalance },
    } = await res.json();
    // storage access_token in localStorage:
    localStorage.setItem("ROCKINHOOD_ACCESS_TOKEN", token);
    localStorage.setItem("ROCKINHOOD_CURRENT_USER_ID", id);
    localStorage.setItem("ROCKINHOOD_CURRENT_CASH_BALANCE", cashBalance);
    // redirect to home page to see all tweets:
    window.location.href = "/portfolio";
  } catch (err) {
    handleErrors(err);
  }
});
