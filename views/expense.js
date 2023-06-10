const amountArea = document.getElementById("amount");
const descriptionArea = document.getElementById("description");
const categoryArea = document.getElementById("category");
const list = document.getElementById("list");

async function addItem(event) {
  try {
    event.preventDefault();

    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
      amount,
      description,
      category,
    };

    if (amount && description && category) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/expenses/createExpense",
          obj,
          {
            headers: { Authorization: token },
          }
        );
        console.log(response);
        ShowOnScreen(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", reloadpage);

async function reloadpage() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/getExpenses", {
      headers: { Authorization: token },
    });

    console.log(response);
    response.data.forEach((element) => {
      ShowOnScreen(element);
    });
  } catch (err) {
    console.log(err);
  }
}

async function ShowOnScreen(res) {
  const li = document.createElement("li");

  li.className =
    "list-group-item align-self-center w-75 mb-2 text-white p-3 d-block";
  li.style = "background-color: rgba(44, 42, 47, 0.818);font-size:large";
  li.id = "list-item";

  li.append(
    document.createTextNode(res.amount),
    " - ",
    document.createTextNode(res.description),
    " - ",
    document.createTextNode(res.category)
  );

  const delbtn = document.createElement("button");

  delbtn.className = "btn btn-sm float-right delete";
  delbtn.textContent = "Delete";

  delbtn.onclick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/deleteExpense/${res.id}`);
      list.removeChild(li);
    } catch (err) {
      console.log(err);
    }
  };
  li.append(delbtn);

  const editbtn = document.createElement("button");
  editbtn.className = "btn btn-sm float-right edit mr-2";
  editbtn.textContent = " Edit ";
  editbtn.id = "edit";

  editbtn.onclick = async () => {
    try {
      await axios.delete(`http://localhost:3000/deleteExpense/${res.id}`);
      list.removeChild(li);
    } catch (err) {
      console.error(err);
    }
    amountArea.value = res.amount;
    descriptionArea.value = res.description;
    categoryArea.value = res.category;
  };

  li.append(editbtn);
  list.append(li);

  form.reset();
}

const razBtn = document.getElementById("raz-btn");

razBtn.onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    { headers: { Authorization: token } }
  );
  console.log("response : ", response);
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      alert("You are a Premium User Now");
      // razBtn.remove();
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function (response) {
    console.log(response);
    alert("Something Went wrong");
  });
};
