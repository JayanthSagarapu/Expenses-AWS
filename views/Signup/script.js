const signBtn = document.getElementById("sign");
const loginBtn = document.getElementById("login");
const errormsg = document.getElementById("error");

signBtn.onclick = async () => {
  window.location.href = "../Signup/signup.html";
};

loginBtn.onclick = async () => {
  window.location.href = "../Login/login.html";
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
        "http://16.171.13.59:3000/user/signup",
        obj
      );
      console.log(response);
      if (response.status === 200) {
        window.location.href = "../Login/login.html";
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
        "http://16.171.13.59:3000/user/login",
        obj
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      window.location.href = "../views/Expense/expense.html";
      // event.target.reset();
    }
  } catch (err) {
    errormsg.innerText = `Error : Something went wrong. SignUP if New User`;
    errormsg.class =
      "bi bi-exclamation-triangle text-danger mt-3 w-50 p-3 ml-3";
    console.log(err);
  }
}

async function forgetPassword(event) {
  try {
    event.preventDefault();
    const email = event.target.email.value;

    if (email) {
      const response = await axios.post(
        "http://16.171.13.59:3000/password/forgotpassword",
        {
          email: email,
        }
      );
      window.location.href = "../views/Login/login.html";
      event.target.reset();
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
