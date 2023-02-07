var prodN = document.getElementById("name")
var category = document.getElementById("category")
var amount = document.getElementById("amount")
var price = document.getElementById("price")
var productDesc = document.getElementById("productDesc")
var tbody = document.querySelector("tbody")
var btn = document.getElementById("btn")
var searchBtn = document.getElementById("searchBtn")
let valNameContent = document.getElementById("valNameContent")
let valCategoryContent = document.getElementById("valCategoryContent")
let valDescriptionContent = document.getElementById("valDescriptionContent")
let valAmountContent = document.getElementById("valAmountContent")
let valPriceContent = document.getElementById("valPriceContent")
let id = 0
let flag
let arrContent
if (JSON.parse(localStorage.getItem('arrContent'))) {
  arrContent = JSON.parse(localStorage.getItem('arrContent'))
  appearProduct()
}
else {
  arrContent = []
}
btn.addEventListener("click", addProduct)
prodN.addEventListener('keyup', valName)
category.addEventListener('keyup', valCategory)
productDesc.addEventListener('keyup', valDescription)
amount.addEventListener('keyup', valAmount)
price.addEventListener('keyup', valPrice)

searchBtn.addEventListener('keyup', function () {
  if (searchBtn.value) {
    search(searchBtn.value)
  }
  else {
    appearProduct()
  }
})
function addProduct() {
  if (valName() && valCategory() && valDescription() && valAmount() && valPrice()) {
    let obj = {}
    obj.id = id++;
    obj.prodN = prodN.value;
    obj.category = category.value;
    obj.amount = amount.value;
    obj.price = price.value
    obj.productDesc = productDesc.value;
    arrContent.push(obj)
    localStorage.setItem('arrContent', JSON.stringify(arrContent))
    appearProduct()
    location.reload()
    clear()
    console.log(arrContent)
  }
  else {
    window.alert("Please enter correct data")
  }
}
function clear() {
  prodN.value = "";
  category.value = "";
  productDesc.value = "";
  amount.value = "";
  price.value = "";
}
function appearProduct() {
  tbody.innerHTML = ""
  for (let i = 0; i < arrContent.length; i++) {
    tbody.innerHTML += `
        <tr class="text-center">
          <td>${i + 1}</td>
          <td>${arrContent[i].prodN}</td>
          <td>${arrContent[i].category}</td>
          <td>${arrContent[i].amount}</td>
          <td>${arrContent[i].price}</td>
          <td>${arrContent[i].productDesc}</td>
          <td><button type="button" onClick="updateEle(${arrContent[i].id})" class="btn btn-success">Update</button></td>
          <td><button type="button" onClick="deleteEle(${i})"  class="btn btn-danger">Delete</button></td> 
        </tr>
      `
  }
}
function deleteEle(i) {
  arrContent.splice(i, 1);
  localStorage.setItem('arrContent', JSON.stringify(arrContent))
  appearProduct()
  console.log(arrContent)
  console.log(i)
}
function updateEle(i) {
  prodN.value = arrContent[i].prodN
  category.value = arrContent[i].category
  productDesc.value = arrContent[i].productDesc
  amount.value = arrContent[i].amount
  price.value = arrContent[i].price
  updateProduct(i)
  btn.innerHTML = "Update"
  btn.removeEventListener("click", addProduct)
}
function updateProduct(i) {
  btn.addEventListener("click", function x(e) {
    arrContent[i].prodN = prodN.value
    arrContent[i].category = category.value
    arrContent[i].productDesc = productDesc.value
    arrContent[i].amount = amount.value
    arrContent[i].price = price.value
    localStorage.setItem('arrContent', JSON.stringify(arrContent))
    btn.removeEventListener("click", x)
    location.reload()
    clear()
    appearProduct()
    btn.addEventListener("click", addProduct)
    btn.innerHTML = "Add product"
  })
}
function search(term) {
  tbody.innerHTML = ""
  for (let i = 0; i < arrContent.length; i++) {
    if ((arrContent[i].prodN).includes(term)) {
      tbody.innerHTML += `
        <tr class="text-center">
          <td>${i + 1}</td>
          <td>${arrContent[i].prodN}</td>
          <td>${arrContent[i].category}</td>
          <td>${arrContent[i].amount}</td>
          <td>${arrContent[i].price}</td>
          <td>${arrContent[i].productDesc}</td>
          <td><button type="button" onClick="updateEle(${arrContent[i].id})" class="btn btn-success">Update</button></td>
          <td><button type="button" onClick="deleteEle(${i})"  class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
  }
}
// ${arrContent[i].price}
function valName() {
  let regx = /^[A-Z][a-z]{3,8}$/
  if (regx.test(prodN.value)) {
    prodN.style.boxShadow = "0px 0px 2px 2px green";
    prodN.style.borderColor = "green"
    valNameContent.style.color = "green"
    valNameContent.innerHTML = "the name is correct"
    return true
  }
  else if (prodN.value == "") {
    prodN.style.boxShadow = ""
    prodN.style.borderColor = "transparent"
    valNameContent.style.color = "transparent"
    valNameContent.innerHTML = " "
    return false

  }
  else {
    prodN.style.boxShadow = "0px 0px 2px 2px red "
    prodN.style.borderColor = "red"
    valNameContent.style.color = "red"
    valNameContent.innerHTML = "the name must start with capital and have 3 to 8 characters"
    return false
  }

}
function valCategory() {
  let regx = /^(Mobile|Electric Device)$/
  if (regx.test(category.value)) {
    category.style.boxShadow = "0px 0px 2px 2px green";
    category.style.borderColor = "green"
    valCategoryContent.style.color = "green"
    valCategoryContent.innerHTML = "the is category is available"
    return true
  }
  else if (category.value == "") {
    category.style.boxShadow = ""
    category.style.borderColor = "transparent"
    valCategoryContent.style.color = "transparent"
    valCategoryContent.innerHTML = " "
    return false

  }
  else {
    category.style.boxShadow = "0px 0px 2px 2px red "
    category.style.borderColor = "red"
    valCategoryContent.style.color = "red"
    valCategoryContent.innerHTML = "Mobile or Electric Device"
    return false
  }

}
function valDescription() {
  let regx = /^(\s){5,}/g
  if (regx.test(productDesc.value)) {
    productDesc.style.boxShadow = "0px 0px 2px 2px green";
    productDesc.style.borderColor = "green"
    valDescriptionContent.style.color = "green"
    valDescriptionContent.innerHTML = "the is description is available"
    return true
  }
  else if (productDesc.value == "") {
    productDesc.style.boxShadow = ""
    productDesc.style.borderColor = "transparent"
    valDescriptionContent.style.color = "transparent"
    valDescriptionContent.innerHTML = " "
    return false

  }

  else {
    productDesc.style.boxShadow = "0px 0px 2px 2px red "
    productDesc.style.borderColor = "red"
    valDescriptionContent.style.color = "red"
    valDescriptionContent.innerHTML = "the product description must have at least five space"
    return false
  }

}
function valAmount() {
  let regx = /^[1-5]$/
  if (regx.test(amount.value)) {
    amount.style.boxShadow = "0px 0px 2px 2px green";
    amount.style.borderColor = "green"
    valAmountContent.style.color = "green"
    valAmountContent.innerHTML = "the is amount is available"
    return true
  }
  else if (amount.value == "") {
    amount.style.boxShadow = ""
    amount.style.borderColor = "transparent"
    valAmountContent.style.color = "transparent"
    valAmountContent.innerHTML = " "
    return false

  }
  else {
    amount.style.boxShadow = "0px 0px 2px 2px red "
    amount.style.borderColor = "red"
    valAmountContent.style.color = "red"
    valAmountContent.innerHTML = "the product amount must be between 1-5"
    return false
  }

}
function valPrice() {
  let regx = /^([5-9][0-9][0-9][0-9][0-9]*|[1-9][0-9][0-9][0-9][0-9]+)$/
  if (regx.test(price.value)) {
    price.style.boxShadow = "0px 0px 2px 2px green";
    price.style.borderColor = "green"
    valPriceContent.style.color = "green"
    valPriceContent.innerHTML = "the is price is available"
    return true
  }
  else if (price.value == "") {
     price.style.boxShadow = ""
     price.style.borderColor = "transparent"
    valPriceContent.style.color = "transparent"
    valPriceContent.innerHTML = " "
    return false
  }
  else {
    price.style.boxShadow = "0px 0px 2px 2px red "
    price.style.borderColor = "red"
    valPriceContent.style.color = "red"
    valPriceContent.innerHTML = "the product price must be at least 5000$"
    return false
  }

}