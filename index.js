const displayHistory= document.querySelector(".display-history");
const display= document.querySelector(".display-input");
const tempResult= document.querySelector(".temp-result");
const numbers= document.querySelectorAll(".number");//karena lebih dari satu memakai all
const operation= document.querySelectorAll(".operation");
const equal= document.querySelector(".equal");
const clearAll=document.querySelector(".all-clear");
const lastClear=document.querySelector(".last-entity-clear");


let dis1Num= "";//displayHistory
let dis2Num= "";//displayInput
let result= null;
let lastOperation= ""//penjumlahan pengkalian akan dihitung terakhir
let haveDot= false;

numbers.forEach(number => {
    number.addEventListener('click', (e)=>{
        if (e.target.innerText === "." && !haveDot){
            console.log(e.target.innerText)//saat click angka akan mencetak angka tersebut ke console          
            haveDot= true;//jika titik belum pernah dipakai maka input titik akan diterima
        }else if (e.target.innerText === "." && haveDot){
            return;//jika titik sudah dipakai maka simbol titik tidak bisa lagi dijalankan
        }
        dis2Num += e.target.innerText 
    //+= menambah angka ke dis2Num dari e.target bukan mengganti, jika sudah ada 2 dan ingin diisi 1 maka menjadi 21
        display.innerText = dis2Num //membuat display input menampilkan isi dis2Num
    })
}); 

operation.forEach((operatio) => {
    operatio.addEventListener('click', (e) => {
        if (!dis2Num) return; // Jika dis2Num tidak memiliki angka, operasi tidak berjalan
        haveDot = false; // Setiap operasi dipakai maka dot/titik bisa dipakai kembali
        const operationName= e.target.innerText;
        if (dis1Num && dis2Num && lastOperation){//mengecek apakah history, input dan operasi sudah digunakan
            console.log('Jalankan operasi matematika')
            mathOperation()
        }else{
            result = parseFloat(dis2Num); //jika tidak maka result akan menampilkan penjumlahan terakhir yang dilakukan
            //parseFloat membuat string menjadi float
        }
        clearVar(operationName)
        lastOperation= operationName;
    });
});
function clearVar(name= ''){//menerima isian dari operation name saat operation dipakai +/ dll
    dis1Num += dis2Num + " " + name + " ";//tampilan saat memasukkan angka dan operasi
    displayHistory.innerText= dis1Num;
    display.innerText=''//saat operation digunakan angka recent akan clear
    dis2Num= '';
    tempResult.innerText= result;
}
function mathOperation() {
    if (lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equal.addEventListener('click', (e) =>{//penamaan e bebas
    if (!dis1Num || !dis2Num) return
    haveDot= false;
    mathOperation()
    clearVar();
    display.innerText= result;
    tempResult.innerText= "";//saat click sama dengan = maka temp clear
    dis2Num= result
    dis1Num= "";

})

clearAll.addEventListener('click', () => {//e bisa dihapus karena tidak menerima input
    dis1Num = '';
    dis2Num = '';
    haveDot = false;
    displayHistory.innerText = "";
    display.innerText = "";
    tempResult.innerText = "";
    result = '';
    lastOperation = '';
});

lastClear.addEventListener('click', (e)=>{
    display.innerText = "";
    dis2Num= "";
})

window.addEventListener("keydown", (e)=>{//window artinya keseluruhan layar
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" //karna terakhir hilangkan atau
    ){
        clickButton(e.key)//saat angka di klik di keyboard akan menjalan fungsi clickbutton
    } else if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%"){
        clickOperation(e.key);
    } else if (e.key === "*"){
        clickOperation('X')//saat * di klik akan di baca sebagai X
    } else if (e.key === "Enter" || e.key === "=")
        clickEqual();
    else if (e.key === "Backspace") {
        clickClear()
    }
})

function clickButton(key){
    numbers.forEach((button) =>{
        if (button.innerText === key){
            button.click()
        }
    })
}

function clickOperation(key){
    operation.forEach((operatio)=>{
        if(operatio.innerText === key){
            operatio.click()
        }
    })
}

function clickEqual(){ //tidak perlu cek key yang di klik karena sudah deklarasi di atas dengan enter
    equal.click()
}

function clickClear(){
    clearAll.click();
}