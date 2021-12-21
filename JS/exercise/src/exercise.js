/*

// 1.------- (loop and function)  *in opposite triangle form-------------

var n=5;
var n = parseInt(window.prompt("Enter number:"));

function triangle(a){
    for(let i=n;i>=1; i--){
        let s=''
        for(let j=1;j<=i;j++){
            s=s+'*'
        }
        console.log(s);
    }
}

triangle(n);
*/






/*

// 2.---------------(objects) create objects including name,address,emails,interest,education--------
// let obj={
//     "name": "Sunder Tamakhu",
//     "address": "Ittachhen BKT",
//     "emails": "tamakhusunder@gmail.com",
//     "interests": [
//         "football",
//         "coding",
//         "sleeping",
//         "traveling"
//     ],
//     "education": [
//         {
//             "name": "Everest English School",
//             "enrolledDate": "2070"
//         },
//         {
//             "name": "Khwopa Higher Sec School",
//             "enrolledDate": "2072"
//         },
//         {
//             "name": "Khwopa Engineering College",
//             "enrolledDate": "2074"
//         }
//     ]
// };
let obj1={}
obj1.name = "Sunder Tamakhu";
obj1.address = "Ittachhen BKT";
obj1.emails = "tamakhusunder@gmail.com";
obj1.interests = ['football', 'coding', 'sleeping', 'traveling'];
obj1.education = [
        {name : "Everest English School", enrolledDate : "2070"},
        {name : "Khwopa Higher Sec School", enrolledDate : "2072"},
        {name : "Khwopa Engineering College", enrolledDate : "2074"},
    ];
console.log(obj1);

for (let i=0; i<obj1.education.length;i++){
    console.log("name:",obj1.education[i].name,", date:",obj1.education[i].enrolledDate); 
}

*/

// 3.--------------------(objects) searches object by key in array---
//Write a function that searches for an object by a specific key value in an array of objects:

var fruits =[
    {id:1, name: 'Banana', color:'Yellow'},
    {id:2, name: 'Apple', color:'Red'},
];

function searchByName(fruits,input_name){
    let result;
    for(let i=0; i<fruits.length; i++){
        if (fruits[i].name.toLowerCase()===input_name.toLowerCase()){
            result=fruits[i]
        }
    }
    if (result){
        return result;
        
    }
    else{
        return "Didnot match any fruits.";
    }

}

function searchByKey(fruits,i_key,i_value){
    let result;
    fruits.forEach((val,index) => {
        keys=Object.keys(val);
        // if (keys.includes(i_key)){
        if(keys.indexOf(i_key) !== -1){
           if(val[i_key].toLowerCase()==i_value.toLowerCase()){
                result= val;
            }
        }
        
    });
    if (result){
        return result;
    }
    else{
        return "Didnot match key and value of fruits"
    }
}

let s_name=searchByName(fruits,"apple");
console.log(s_name);
console.log("------------")

let s_keyvalue=searchByKey(fruits,'names','banana');
console.log(s_keyvalue);