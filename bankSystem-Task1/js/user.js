const readDataFromStorage = () => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("customers"));
    if (!Array.isArray(data)) throw new Error("data isn't array");
  } catch (exp) {
    data = [];
  }
  return data;
};
const setDataToStorage = (myData) => {
  if (!Array.isArray(myData)) myData = [];
  myData = JSON.stringify(myData);
  localStorage.setItem("customers", myData);
};
///create html el
const createMyOwnElement = (
  element,
  parent,
  classes = "",
  textContent = "",
  attributes = []
) => {
  const el = document.createElement(element);
  parent.appendChild(el);
  if (classes != "") el.classList = classes;
  if (textContent != "") el.textContent = textContent;
  attributes.forEach((attribute) => {
    el.setAttribute(attribute.attName, attribute.attrVal);
  });
  return el;
};
const customersData = readDataFromStorage();
const customersContent = document.querySelector("#addCustomer");
//index.html
const contentIndex = document.querySelector("#content");
//edit customer (add/withdraw)
//const editCustomer=document.querySelector('#editCustomer');
//addpalance btn
const addPalace = document.querySelector("#editCustomer");
//withdraw
const withdrawPalance = document.querySelector("#withdraw");
//single

const transactions = document.querySelector("#transactions");
//////////////////////////Main thead names////////////////////
const userMainHeads = [
  { name: "id", dataStore: "value", default: 5000, isDefault: true },
  { name: "name", dataStore: "value", default: null, isDefault: false },
  { name: "address", dataStore: "value", default: null, isDefault: false },
  { name: "phone", dataStore: "value", default: null, isDefault: false },
  {
    name: "accountNumber",
    dataStore: "value",
    default: null,
    isDefault: false,
  },
  {
    name: "initialBalance",
    dataStore: "value",
    default: null,
    isDefault: false,
  },
];

///////////////add new customer////
if (customersContent) {
  customersContent.addEventListener("submit", function (e) {
    e.preventDefault();
    // const customersData=readDataFromStorage();
    let customers = {};
    userMainHeads.forEach((head) => {
      if (head.isDefault)
        customers[head.name] =
          customersData.length == 0
            ? 5000
            : customersData[customersData.length - 1][head.name] + 1;
      else customers[head.name] = this.elements[head.name][head.dataStore];
      customers.transactions = [];
    });
    //console.log(customers);
    customersData.push(customers);
    this.reset();
    //console.log(customersData);
    setDataToStorage(customersData);
  });
}
////////////////show all customers data/////////////////////////////

function drawElements() {
  contentIndex.innerHTML = "";
  //const customersData=readDataFromStorage();
  if (customersData.length == 0) {
    const tr = createMyOwnElement(
      "tr",
      contentIndex,
      "alert alert-danger text-center"
    );
    createMyOwnElement("td", tr, "", "No Customers Yet", [
      { attName: "colspan", attrVal: 6 },
    ]);
  } else {
    customersData.forEach((customer, i) => {
      const tr = createMyOwnElement("tr", contentIndex);
      userMainHeads.forEach((head) =>
        createMyOwnElement("td", tr, "", customer[head.name])
      );
      const td = createMyOwnElement("td", tr);
      const addBtn = createMyOwnElement(
        "button",
        td,
        "btn btn-danger mx-3",
        "addPalance"
      );
      addBtn.addEventListener("click", () =>
        addPalance(customersData, customer.id)
      );
      const withdrawBtn = createMyOwnElement(
        "button",
        td,
        "btn btn-warning mx-3",
        "Withdraw"
      );
      withdrawBtn.addEventListener("click", (e) =>
        withdraw(customersData, customer.id)
      );
      const showBtn = createMyOwnElement(
        "button",
        td,
        "btn btn-primary mx-3",
        "ShowUser"
      );
      showBtn.addEventListener("click", (e) => showCustomer(customer));
    });
  }
}
if (contentIndex) drawElements();

function addPalance(customersData, id) {
  localStorage.setItem("id", JSON.stringify(id));
  window.location.replace("addpalance.html");
}

function withdraw(customersData, id) {
  localStorage.setItem("id", JSON.stringify(id));
  window.location.replace("withdraw.html");
}

//add or withdraw
if (addPalace) {
  addPalace.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log(this.elements);
    if (!isNaN(this.elements.amount.value)) {
      //addpalance
      let id = JSON.parse(localStorage.getItem("id"));
      console.log(id);
      //find specific customer to add palance in
      //Find index of specific object using findIndex method.
      objIndex = customersData.findIndex((obj) => obj.id == id);
      customersData[objIndex].transactions.push({
        type: "add",
        val: this.elements.amount.value,
      });
      setDataToStorage(customersData);
      // let customer=customersData.find(customer=>customer.id=id);
      //customer.transactions.push({type:"add",val:this.elements.amount.value});
      console.log(customersData);
    } else {
      alert("please enter a number");
    }
    this.reset();
    //  window.location.replace('index.html');
  });
}

if (withdrawPalance) {
  withdrawPalance.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log(this.elements);
    if (!isNaN(this.elements.amount.value)) {
      //addpalance
      let id = JSON.parse(localStorage.getItem("id"));
      console.log(id);
      //find specific customer to add palance in
      //Find index of specific object using findIndex method.
      objIndex = customersData.findIndex((obj) => obj.id == id);
      customersData[objIndex].transactions.push({
        type: "withdraw",
        val: this.elements.amount.value,
      });
      setDataToStorage(customersData);
      // let customer=customersData.find(customer=>customer.id=id);
      //customer.transactions.push({type:"add",val:this.elements.amount.value});
      console.log(customersData);
    } else {
      alert("please enter a number");
    }
    this.reset();
  });
}
function showUser(customer) {
  localStorage.setItem("customer", JSON.stringify(customer));
  window.location.replace("single.html");
}

const single = document.querySelector("#single");
console.log(single);

if (single) {
  try {
    let customer = JSON.parse(localStorage.getItem("customer"));
    if (!customer) throw new Error();
    const tr = createMyOwnElement("tr", single);
    userMainHeads.forEach((head) =>
      createMyOwnElement("td", tr, "", customer[head.name])
    );
    const td = createMyOwnElement("td", tr);
    const addBtn = createMyOwnElement(
      "button",
      td,
      "btn btn-danger mx-3",
      "addPalance"
    );
    addBtn.addEventListener("click", () =>
      addPalance(customersData, customer.id)
    );
    const withdrawBtn = createMyOwnElement(
      "button",
      td,
      "btn btn-warning mx-3",
      "Withdraw"
    );
    withdrawBtn.addEventListener("click", (e) =>
      withdraw(customersData, customer.id)
    );
    const showBtn = createMyOwnElement(
      "button",
      td,
      "btn btn-primary mx-3",
      "ShowCustomer"
    );
    showBtn.addEventListener("click", (e) => showCustomer(customer));
    if (transactions) {
      customer.transactions.forEach((trans) => {
        const tr = createMyOwnElement("tr", transactions);
        createMyOwnElement("td", tr, "", trans.type);
        createMyOwnElement("td", tr, "", trans.val);
      });
    }
  } catch (e) {
    const tr = createMyOwnElement(
      "tr",
      single,
      "alert alert-danger text-center"
    );
    createMyOwnElement("td", tr, "", "No Customers Yet", [
      { attName: "colspan", attrVal: 6 },
    ]);
  }
}
