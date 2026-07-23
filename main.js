let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');

let tbody = document.getElementById('tbody');


let mood = 'create'
let tmp;


// total
function getTotal() {

    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = ('#040');
    }

    else {
        total.innerHTML = '';
        total.style.backgroundColor = ('#c50404');
    }
}


// create 
let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}

else {
    dataPro = [];
}

submit.onclick = function () {
    

    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    

 if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {

        
    if (mood === 'create') {

         if (newPro.count > 1) {
        for(let i = 0; i< newPro.count; i++) {
             dataPro.push(newPro);
        }
    }

    else {
        dataPro.push(newPro);
    }

        clearData();


    }

    else {
         dataPro [tmp] = newPro;
         mood = 'create';
         submit.innerHTML = 'Create';
         count.style.display = 'none'
         clearData();
    }

   

    }
   

    
    localStorage.setItem('product', JSON.stringify(dataPro));
  
    showData();
    clearData();
            total.style.backgroundColor = ('#c50404');


}


// clear

function clearData() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// show
function showData() {

    let table = '';

    for (let i = 0; i < dataPro.length; i++) {

        if (dataPro[i] == null) {
            continue;
        }

        table += `

        <tr>

        <td> ${i+1}</td>
        <td> ${dataPro[i].title} </td>
        <td> ${dataPro[i].price} </td>
        <td> ${dataPro[i].taxes} </td>
        <td> ${dataPro[i].ads} </td>
        <td> ${dataPro[i].discount} </td>
        <td> ${dataPro[i].total} </td>
        <td> ${dataPro[i].category} </td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        </tr>   

        `;

    }
 
    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById('deleteAll');

    if (dataPro.length > 0) {
        
        btnDeleteAll.innerHTML = `
        
        <button onclick = "deleteAll()" > delete All (${dataPro.length}) </button>
        
        `


    }

    
        else {
            btnDeleteAll.innerHTML = '';
        }

    


}


// delete

function deleteData(i) {

    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}


showData();


// deleteAll 

function deleteAll() {

   localStorage.clear()
   dataPro.splice(0)
   showData();

}



// update 

function updateData(i) {

     title.value = dataPro[i].title
     price.value = dataPro[i].price
     taxes.value = dataPro[i].taxes
     ads.value = dataPro[i].ads
     discount.value = dataPro[i].discount
     category.value = dataPro[i].category
    getTotal()
    count.style.display = 'none'
    submit.innerHTML = 'Update'

    mood = 'update'
    tmp = i;
    scroll ({
    top:0,
    behavior:"smooth",
    
    }) 



}


let searchMood = 'title';

function getSearchMood(id) {


    if (id == "searchTitle") {

        searchMood = 'title';

    }

    else {

        searchMood = 'category' ;
       
    }
     search.placeholder = "Search By " + searchMood;

    search.focus()
    search.value = '';
    showData()
    

}



function SearchData (value) {

     let table = ''; 

     for (let i = 0; i< dataPro.length; i++ ) {

         if (searchMood =='title')
        
        
        {

        

        {

        if (dataPro[i].title.includes(value.toLowerCase())) 

            //    if (dataPro[i].title == value) 



        {

        table += `

        <tr>

        <td> ${i}</td>
        <td> ${dataPro[i].title} </td>
        <td> ${dataPro[i].price} </td>
        <td> ${dataPro[i].taxes} </td>
        <td> ${dataPro[i].ads} </td>
        <td> ${dataPro[i].discount} </td>
        <td> ${dataPro[i].total} </td>
        <td> ${dataPro[i].category} </td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        </tr>   

        `;

        }
                
            }

    }


    else {

     

        {

        if (dataPro[i].category.includes(value.toLowerCase())) 

            //    if (dataPro[i].category == value) 



        {

        table += `

        <tr>

        <td> ${i+1}</td>
        <td> ${dataPro[i].title} </td>
        <td> ${dataPro[i].price} </td>
        <td> ${dataPro[i].taxes} </td>
        <td> ${dataPro[i].ads} </td>
        <td> ${dataPro[i].discount} </td>
        <td> ${dataPro[i].total} </td>
        <td> ${dataPro[i].category} </td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        </tr>   

        `;

        }
                
            }


    }

        document.getElementById('tbody').innerHTML = table;


}

     }


     function changeMood() {

    let body = document.getElementById('body');

    if (body.style.backgroundColor == 'rgb(255, 255, 255)') {

        location.reload();

    }

    else {

            let   body = document.getElementById('body')
     let disc = document.getElementById('disc')
     
let darkMood = document.getElementById('darkMood');

darkMood.innerHTML = `<i class="fa-solid fa-sun"></i>`;

        body.style.backgroundColor = ('#FFFFFF');
        disc.style.color = ('#050000')

        let inputs = [
        title,
        price,
        taxes,
        ads,
        discount,
        count,
        category,
        search
    ];

         inputs.forEach(function(input) {
    input.style.backgroundColor = '#EBEFEF';
    input.style.color = '#000000'
    input.style.border = "1px solid #babdbe";
   });

   
        let btns = [
        submit,
        searchCategory,
        searchTitle,
    
    ];

   btns.forEach(function(btn) {
    btn.style.backgroundColor = '#006677';
    btn.style.border = "1px solid #babdbe";
});

  let tableHeed = document.getElementsByClassName('tableHeed');

for(let i = 0; i < tableHeed.length; i++) {
    tableHeed[i].style.color = '#006677' ;
}

tbody.style.color = "#030000";

let footer = document.getElementById('footer')

footer.style.color = '#006677'
footer.style.animation = 'none'
footer.style.borderTop = "2px solid #006677";


let linkedin = document.getElementById('linkedin');

linkedin.style.color = '#006677';
linkedin.style.animation = 'none'

      }
     
     

    }
