const signBtn = document.getElementById("sign");
const loginBtn = document.getElementById("login");

signBtn.onclick = async () => {
  window.location.href = "../views/signup.html";
};

loginBtn.onclick = async () => {
  window.location.href = "../views/login.html";
};

async function signUp(event) {
  event.preventDefault();

  try {
    const signUpDetails = {
      name: event.target.username.value,
      email: event.target.email.value,
      password: event.target.email.value,
    };

    const response = await axios.post(
      "http://localhost:3000/user/signup",
      signUpDetails
    );

    if (response.status === 201) {
      window.location.href = "../views/login.html";
    } else {
      throw new Error("Failed to Login");
    }
  } catch (err) {
    document.body.innerHTML = `<div style ="color:red> ${err}</div>`;
  }
}
