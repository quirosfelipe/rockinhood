import { backendUrl } from "./utils.js";
// import { handleErrors } from "./utils.js";

const handleErrors = async (err) => {
  if (err.status >= 400 && err.status < 600) {
    const errorJSON = await err.json();
    const errorsContainer = document.querySelector(".errors-container");
    let errorsHtml = [
      `
            <div class="alert alert-danger">
                Something went wrong. Please try again.
            </div>
            `,
    ];
    const { errors } = errorJSON;
    if (errors && Array.isArray(errors)) {
      errorsHtml = errors.map(
        (message) => `
                    <div class="alert alert-danger">
                        ${message}
                    </div>
                `
      );
    }
    errorsContainer.innerHTML = errorsHtml.join("");
  } else {
    alert(
      "Something went wrong. Please check your internet connection and try again!"
    );
  }
};

const logInForm = document.querySelector(".login__form");

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, password };
  try {
    const res = await fetch(`${backendUrl}/users/token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
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
    // redirect to portfolio page:
    window.location.href = "/portfolio";
  } catch (err) {
    handleErrors(err);
  }
});

const demoButton = document.querySelector(".login__form-demo-button");
demoButton.addEventListener("click", async (e) => {
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
