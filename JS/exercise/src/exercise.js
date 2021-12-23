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

/*

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

*/

/*

//4.----------function(without map)(Write a function that transforms an array of inputs into a new array based on a provided transformation function.)---
 
var numbers = [1,2,3,4];

function transform(collection,tranFunc){
    let arr=[],a;
    collection.forEach((val) =>{
        a=tranFunc(val);
        arr.push(a);
    });
    return arr;
    
}

var output=transform(numbers,function(num){
    return num*2;
});
console.log(output);

*/


/*

// 5.----------sorting(Write a program to sort an array of object by a target key. The original array should remain unchanged.)---
 
var arr = [{
        id: 1,
        name: 'John',
    }, {
        id: 2,
        name: 'Mary',
    }, {
        id: 3,
        name: 'Andrew',
}];

function sortBy(array, key) {
    let temp;
    for (let i=0; i<array.length; i++){
        for (let j=i; j<array.length; j++){
            if(array[i]['name']>array[j]['name']){
                temp=array[i];
                array[i]=array[j];
                array[j]=temp;
            }
        }
    }
    return array;
}

var sorted = sortBy(arr, 'name');
console.log("final result:",sorted)

*/



// 6.---------Normalization(Write a program to normalize a given input to get the expected output.)---

// // From this
// var input = {
//   '1': {
//     id: 1,
//     name: 'John',
//     children: [
//       { id: 2, name: 'Sally' },
//       { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
//     ]
//   },
//   '5': {
//     id: 5,
//     name: 'Mike',
//     children: [{ id: 6, name: 'Peter' }]
//   }
// };

// // To this
// var output = {
//   '1': { id: 1, name: 'John', children: [2, 3] },
//   '2': { id: 2, name: 'Sally' },
//   '3': { id: 3, name: 'Mark', children: [4] },
//   '4': { id: 4, name: 'Harry' },
//   '5': { id: 5, name: 'Mike', children: [6] },
//   '6': { id: 6, name: 'Peter' }
// };

var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };
  
  function normalization(){
    var output={};
    
    function childArray(person){
      let child_array = person.children.map((child_id)=>{
        return child_id.id;
      });
      return child_array;
    }
    
    function addChildren(person){
      let child_arr = childArray(person);
      person.children.forEach((child)=>{
        output[child.id] = child;
        if(child.children){
          console.log(child);
          addChildren(child);
        }
      });
      changeChildrenFormat(person.id, child_arr);
    }
    
    function changeChildrenFormat(person_id,child_arr){
      output[person_id].children=child_arr;
    }
    
    Object.keys(input).forEach((key)=>{
      output[key]=input[key];
      person=input[key];
      if (person.children){
        addChildren(person);
      }
    });
    console.log("------");
    return output;
    
  }
  
  console.log(normalization());






