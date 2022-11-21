window.addEventListener('load', () => {
    const nameInput = document.querySelector('#sname');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value)
    })
})



const income = document.querySelector(".income");
const expense = document.querySelector(".expense")
const balance = document.querySelector(".balance")
const addincome = document.querySelector(".addincome")
const incomein = document.querySelector("#incomein")
const addbutton = document.querySelector('#addbtn')
const name = document.querySelector('#name');
const date = document.querySelector('#date');
const amount = document.querySelector('#amount');
const type = document.querySelector('#type');
const submit = document.querySelector('#submit')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')
const reset = document.querySelector('#reset')

const error=document.querySelector('#error')


let count = 0



function updateExpence() {
   balance.innerHTML = `${parseFloat(balance.textContent) - parseFloat(amount.value)}`


   if (expense.textContent == '') {

      expense.textContent = 0

   }

   expense.innerHTML = `${parseFloat(expense.textContent) + parseFloat(amount.value)}`
   localStorage.setItem('bal', balance.innerHTML)
   localStorage.setItem('exp', expense.innerHTML)

}

function storeExpense(idNum) {

   const obj = {
      typee: type.value,
      amountt: amount.value,
      datee: date.value,
      namee: name.value,

   };

   localStorage.setItem(`id${idNum}`, JSON.stringify(obj));

}
   

//table creation

function createTable(e) {
   if (localStorage.getItem('count')) {
      count = JSON.parse(localStorage.getItem('count'))
   }
   e.preventDefault()
   if (income.innerHTML == '') {
      alert('First input Income')
      return
   }

   if (name.value == '' || type.value == '' || amount.value == '' || date.value == '') {
      alert('Fill all inputs')
      return;

   }
   let tr = document.createElement('tr');
   let td1 = document.createElement('td');
   let td2 = document.createElement('td');
   let td3 = document.createElement('td');
   let td4 = document.createElement('td');


   td1.innerHTML = name.value;
   td2.innerHTML = type.value;
   td3.innerHTML = amount.value;
   td4.innerHTML = date.value;
   
   td1.classList.add('name');
   td2.classList.add('type');
   td3.classList.add('amount');
   td4.classList.add('date');
   


   tr.appendChild(td1);
   tr.appendChild(td2);
   tr.appendChild(td3);
   tr.appendChild(td4);

   count++

   tr.classList.add(`id${count}`)
   tr.addEventListener('click', removeData);
   tbody.appendChild(tr);
   table.classList.remove('expense-table');
   storeExpense(count)
   updateExpence();
   localStorage.setItem('count', JSON.stringify(count))
}

//Deleting or reseting all  data
function removeData() {

   let i = this.querySelector('.amount');
   let val = parseFloat(i.textContent);
   balance.innerHTML = `${parseFloat(balance.innerHTML) + val}`
   expense.innerHTML = `${parseFloat(expense.innerHTML) - val}`

   
   // Deleting single data by clicking on the data
   this.parentNode.removeChild(this)
   if (tbody.children.length == 0) {
      table.classList.add('expense-table')
   }

   let id = this.className
   localStorage.removeItem(`${id}`)
   localStorage.setItem('bal', balance.innerHTML)
   localStorage.setItem('exp', expense.innerHTML)
}


addbutton.addEventListener('click', (e) => {
  
   if (incomein.value == '') {
      alert('Input Value')
      return;
   }

   e.preventDefault()
   income.textContent = incomein.value;
   balance.textContent = incomein.value;
   expense.textContent = '0'
   addincome.classList.add('expense-table');
   localStorage.setItem('income', incomein.value);
   localStorage.setItem('bal', incomein.value);
   localStorage.setItem('exp', 0);
})


submit.addEventListener('click', createTable),
reset.addEventListener('click', () => {

   localStorage.clear()
   expense.innerHTML = ''
   income.innerHTML = ''
   balance.innerHTML = ''
   tbody.innerHTML = ''
   table.classList.add('expense-table');
   addincome.classList.remove('expense-table')
})


window.addEventListener('load', () => {
   let cnt = JSON.parse(localStorage.getItem('count'))

   
   if (cnt) {
      income.innerHTML = JSON.parse(localStorage.getItem('income'))
      balance.innerHTML = JSON.parse(localStorage.getItem('bal'))
      expense.innerHTML = JSON.parse(localStorage.getItem('exp'))
      addincome.classList.add('expense-table');
      for (let i = 0; i <= cnt; i++) {
         if (localStorage.getItem(`id${i}`)) {

            let obj = JSON.parse(localStorage.getItem(`id${i}`))
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');

            td1.innerHTML = obj.namee;
            td2.innerHTML = obj.typee;
            td3.innerHTML = obj.amountt;
            td4.innerHTML = obj.datee;
            td1.classList.add('name');
            td2.classList.add('type');
            td3.classList.add('amount');
            td4.classList.add('date');
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tr.classList.add(`id${i}`)
            tr.addEventListener('click', removeData);
            tbody.appendChild(tr);
            table.classList.remove('expense-table');
         }


      }
   }
})
