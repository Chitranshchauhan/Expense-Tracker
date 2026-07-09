const balance = document.getElementById("balance");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    transactionList.innerHTML = "";

    let total = 0;

    transactions.forEach((transaction, index) => {

        const li = document.createElement("li");

        li.classList.add(transaction.type);

        li.innerHTML = `
            ${transaction.description} - ₹${transaction.amount}

            <button class="delete-btn" onclick="deleteTransaction(${index})">
                X
            </button>
        `;

        transactionList.appendChild(li);

        if(transaction.type === "income"){
            total += Number(transaction.amount);
        }else{
            total -= Number(transaction.amount);
        }

    });

    balance.innerText = `₹${total}`;

    localStorage.setItem("transactions", JSON.stringify(transactions));

}

addBtn.addEventListener("click", ()=>{

    if(description.value === "" || amount.value === ""){
        alert("Please fill all fields");
        return;
    }

    transactions.push({

        description: description.value,
        amount: amount.value,
        type: type.value

    });

    description.value = "";
    amount.value = "";

    updateUI();

});

function deleteTransaction(index){

    transactions.splice(index,1);

    updateUI();

}

updateUI();