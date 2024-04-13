const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const conversionRate = document.querySelector(".msg");


for (let select of dropdowns){
    for ( currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value=currcode;
        if (select.name === "from" && currcode ==="USD"){
            newoption.selected="selected";
        }else if (select.name === "to" && currcode ==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target);
    });
}


const updateFlag = (element)=>{
let currcode=element.value;
let countryCode = countryList[currcode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img=  element.parentElement.querySelector("img");
img.src= newSrc;

};

btn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal==="" || amtVal <1){
        amtVal=1;
        amount.value="1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtVal * rate ;
    conversionRate.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    conversionRate.style.display= "block";
});