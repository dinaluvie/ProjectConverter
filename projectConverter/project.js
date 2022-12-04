const buttonChoose=document.querySelector('.valyutaWIW')
const buttonGet=document.querySelector('.valyutaWIG')
const buttonChooseLiW=document.querySelectorAll('.valyutaWIW>li')
const buttonChooseLiG=document.querySelectorAll('.valyutaWIG>li')
let inputNumberW=document.querySelector('.myInputW')
let inputNumberG=document.querySelector('.myInputG')
let informationW=document.querySelector('.informationW')
let informationG=document.querySelector('.informationG')
let eventWIW='RUB'
let eventWIG='USD'
inputNumberW.value=1
let keyInput='left'
let inputDynamic=inputNumberW.value
TextChange(eventWIW,eventWIG)
Calculator(inputDynamic,eventWIW,eventWIG,keyInput)
buttonChoose.addEventListener('click',(event)=>{
    buttonChooseLiW.forEach(li=>{li.style.backgroundColor='white'})
    event.target.style.backgroundColor='purple'
    eventWIW=event.target.innerHTML
    Calculator(inputDynamic,eventWIW,eventWIG,keyInput)
    TextChange(eventWIW,eventWIG)
})
buttonGet.addEventListener('click',(event)=>{
  buttonChooseLiG.forEach(li=>{li.style.backgroundColor='white'})
  event.target.style.backgroundColor='purple'
  eventWIG=event.target.innerHTML
  Calculator(inputDynamic,eventWIW,eventWIG,keyInput)
  TextChange(eventWIW,eventWIG)
  
})
inputNumberW.addEventListener('input',(event)=>{
    inputDynamic=event.target.value
    keyInput='left'
    Calculator(inputDynamic,eventWIW,eventWIG,keyInput)
})
inputNumberG.addEventListener('input',(event)=>{
    inputDynamic=event.target.value
    keyInput='right'
    Calculator(inputDynamic,eventWIG,eventWIW,keyInput) 
})
function Calculator(inputN,optionW,optionG,keyI){
  fetch(`
  https://api.exchangerate.host/latest?base=${optionW}&symbols=${optionG}`)
   .then((response)=>response.json())
   .then(data=>{
    if(keyI=='left'){
      inputNumberG.value=inputN*(+data.rates[`${optionG}`])}
      else{
      inputNumberW.value=inputN*(+data.rates[`${optionG}`])}
    })  
}
function TextChange(nameW,nameG){
  fetch(`
  https://api.exchangerate.host/latest?base=${nameW}&symbols=${nameG}`)
   .then((response)=>response.json())
   .then(data=>{
    informationW.innerHTML=`1 ${nameW}=${data.rates[`${nameG}`]} ${nameG}`
   })
   fetch(`
  https://api.exchangerate.host/latest?base=${nameG}&symbols=${nameW}`)
   .then((response)=>response.json())
   .then(data=>{
    informationG.innerHTML=`1 ${nameG}=${data.rates[`${nameW}`]} ${nameW}`
   })
}


