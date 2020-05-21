import { handleErrors } from "./utils.js";

const signUpForm = document.querySelector(".signup__form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const fullName = `${firstName} ${lastName}`;
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { firstName, lastName, email, password };
    try {
        const res = await fetch("http://localhost:8080/users", {
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
            user: { id },
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("ROCKINHOOD_ACCESS_TOKEN", token);
        localStorage.setItem("ROCKINHOOD_CURRENT_USER_ID", id);
        // redirect to home page to see all tweets:
        window.location.href = "/portfolio";
    } catch (err) {
        handleErrors(err);
    }
});
