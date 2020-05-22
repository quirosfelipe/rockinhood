//import { handleErrors } from "./utils.js";
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
const signUpForm = document.querySelector(".signup__form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const fullName = `${firstName} ${lastName}`;
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { fullName, email, password };
    try {
        const res = await fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res);
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
        // redirect to portfolio page:
        window.location.href = "/portfolio";
    } catch (err) {
        handleErrors(err);
    }
});
