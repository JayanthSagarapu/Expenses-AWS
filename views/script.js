const signBtn = document.getElementById("sign");
const loginBtn = document.getElementById("login");
const errormsg = document.getElementById("error");

signBtn.onclick = async () => {
  window.location.href = "../views/signup.html";
};

loginBtn.onclick = async () => {
  window.location.href = "../views/login.html";
};

async function signUp(event) {
  try {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj = {
      username,
      email,
      password,
    };

    if (username && email && password) {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        obj
      );
      console.log(response);
      if (response.status === 200) {
        window.location.href = "../views/login.html";
      }
    }
  } catch (err) {
    errormsg.innerText = `Error : ${err.message}, Something went wrong`;
    errormsg.class =
      "bi bi-exclamation-triangle text-danger mt-3 w-50 p-3 ml-3";
    console.log(err);
  }
}

async function login(event) {
  try {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj = {
      email,
      password,
    };

    if (email && password) {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        obj
      );
      console.log(response);
      alert("successful");
      event.target.reset();
    }
  } catch (err) {
    errormsg.innerText = `Error : Something went wrong. SignUP if New User`;
    errormsg.class =
      "bi bi-exclamation-triangle text-danger mt-3 w-50 p-3 ml-3";
    console.log(err);
  }
}
