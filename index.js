function addNewExpense(e){
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value,
        category: e.target.category.value,
        orderId: e.target.orderId.value

    }
    console.log(expenseDetails)
    // const token  = localStorage.getItem('token')
    axios.post('https://crudcrud.com/api/75c874ac22e148bf872761013b869db5/orders',expenseDetails )
        .then((response) => {
    localStorage.setItem(expenseDetails.orderId, JSON.stringify(expenseDetails))
    
    addNewExpensetoUI(response.data);

     }).catch(err => showError(err))

}


window.addEventListener('DOMContentLoaded', ()=> {
    axios.get('https://crudcrud.com/api/75c874ac22e148bf872761013b869db5/orders')
    .then(response => {
            response.data.expenses.forEach(expense => {

                addNewExpensetoUI(expense);
            })
    }).catch(err => {
        showError(err)
    })
});

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById(expense.category);
    const expenseElemId = `expense-${expense.orderId}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.orderId})'>
                Delete Product
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    removeExpensefromUI(expenseid);
    localStorage.removeItem(expenseid)
}


function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}