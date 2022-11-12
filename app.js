
let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
let ulEl = document.getElementById('ul-el');
const deleteBtn = document.querySelector('.btn');
const tabBtn = document.getElementById('save-tab');


let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


tabBtn.addEventListener('click', ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    })

})


function render(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {

        listItems += `
                    <li>
                    <a target='_blank' href="${leads[i]}">${leads[i]}</a>
                    </li>`;

    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('click', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})
inputBtn.addEventListener('click', () => {
    let inputValue = inputEl.value;
    myLeads.push(inputValue);
    inputValue = '';
    let send = JSON.stringify(myLeads);
    localStorage.setItem('myLeads', send);
    render(myLeads);
});



