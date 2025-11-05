let allPets = [];

// /btn from api
const categoryBtn = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => {
        displayBtn(data.categories)

    })
} 

const displayBtn = (categories) => {
    const btnContainer = document.getElementById('btnContainer');
    // console.log(categories)
    for(let i = 0; i < categories.length; i++){
        const category = categories[i]
        btnContainer.innerHTML+= `
        <button id="${category.category}" onclick="handle('${category.category}')"  class="border-gray-400 removeBg lg:py-6 justify-center py-3 hover:bg-green-50 items-center px-8 lg:px-16 flex font-semibold gap-4 lg:text-3xl text-xl border shadow-sm rounded-full"><img class="lg:w-14 w-8" src="${category.category_icon}" alt="">${category.category}</button>
        `
    }
}


const remove = () => {
        const removeItems = document.getElementsByClassName('removeBg')
        for(let removeItem of removeItems) {
            removeItem.classList.remove('bg-green-200');
            removeItem.classList.add('border-gray-400');
        }
    }

const add = (category) => {
        document.getElementById(category).classList.add('bg-green-200')
        document.getElementById(category).classList.remove('border-gray-400');

    }


// Fetch Pets by Category
const byNamePets = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {
        allPets = data.data;
        displayCard(data.data)
        // console.log(data.data)
    })
} 

// all
const cardAll = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {
        allPets = data.pets; 
        displayCard(data.pets)
    })
} 



const displayCard = (pets) => {
    loadingAdd()
    const cardContainer = document.getElementById('cardContainer');
    const imgContainer = document.getElementById('imgContainer');
    const countContainer = document.getElementById('modal1');
    cardContainer.innerHTML = ""; 

    if (pets.length == 0) {
        cardContainer.innerHTML = `
            <div class="bg-gray-200 col-span-3 justify-center flex flex-col lg:py-44 lg:px-24 px-3.5 py-10 md:px-9 md:py-20">
                <div class="text-center mx-auto">
                    <img src="images/error.webp" alt="">
                </div>
                <h1 class="my-3 lg:text-3xl text-xl font-semibold">No Information Available</h1>
                <p class="text-gray-400 text-xs lg:text-base">It is a long established fact that a reader will be distracted...</p>
            </div>
        `;
        loadingRemove();
        return;
    }

for (const pet of pets) {
    if (!pet.date_of_birth) pet.date_of_birth = "Not Found";
    if (!pet.price) pet.price = "Not avaliable";
    if (!pet.breed) pet.breed = "Not avaliable";
    if (!pet.gender) pet.gender = "No avaliable";
    // console.log(pet)
    // Create card div
    const card = document.createElement("div");
    card.className = "p-4 shadow-lg rounded-2xl text-left";

    card.innerHTML = `
        <div>
            <img class="rounded-lg my-2" src="${pet.image}" alt="">
        </div>
        <h1 class="text-xl font-semibold">${pet.pet_name}</h1>
        <div class="mt-2 border-b-2">
            <p class="my-1.5 text-sm text-gray-400">Breed: ${pet.breed}</p>
            <p class="my-1.5 text-sm text-gray-400">Birth: ${pet.date_of_birth}</p>
            <p class="my-1.5 text-sm text-gray-400">Gender: ${pet.gender}</p>
            <p class="my-1.5 text-sm text-gray-400">Price: ${pet.price}</p>
        </div>
        <div class="flex justify-between items-center mt-3">
            <button id="imgBtn" class="text-green-400 border p-1 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>

            </button>
            <button id="countBtn" class="disabled:text-gray-400 text-green-400 text-sm border py-1 px-3 rounded-lg disabled:bg-gray-200">Adopt</button>
            <button id="detailsBtn" class="text-green-400 text-sm border py-1 px-3 rounded-lg">Details</button>
        </div>
    `;
    

    //details
    const detailsBtn = card.querySelector('#detailsBtn');
    detailsBtn.addEventListener('click', () => {
        const modal2 = document.getElementById('modal2');
        modal2.showModal(); 
        modal2.innerHTML=`
        <div class="modal-box">
          <div class="w-full">
            <img class="w-full rounded-lg object-cover" src="${pet.image}" alt="">
          </div>
            
          <h3 class="text-xl mt-5 font-bold">${pet.pet_name}</h3>
            
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 my-3">
            <p class="text-sm text-gray-500">Breed: ${pet.breed}</p>
            <p class="text-sm text-gray-500">Birth: ${pet.date_of_birth}</p>
            <p class="text-sm text-gray-500">Gender: ${pet.gender}</p>
            <p class="text-sm text-gray-500">Price: ${pet.price}</p>
            <p class="text-sm text-gray-500 md:col-span-2">Vaccinated_status: ${pet.vaccinated_status}</p>
          </div>
            
          <h3 class="text-lg font-bold">Details Information</h3>
          <p class="text-sm text-gray-500 mb-4">Details: ${pet.pet_details}</p>
            
          <div class="modal-action flex justify-center">
            <form method="dialog">
              <button class="btn bg-green-100 hover:bg-green-300 text-lg px-20 sm:px-36 md:px-40 lg:px-48">
                Cancel
              </button>
            </form>
          </div>
        </div>
            
        `
    })

    //countDown
    const countBtn = card.querySelector('#countBtn')
    countBtn.addEventListener('click', () => {
        const modal1 = document.getElementById('modal1')
        modal1.showModal();
        countContainer.innerHTML = `
            <div class="modal-box text-center">
            <div class="flex justify-center">
                <img class="flex justify-center" src="https://img.icons8.com/?size=96&id=PEmFcgjhBgKF&format=png" alt="">
            </div>
              <h3 class="text-4xl my-2 font-bold">Congrates</h3>
              <span id="time" class="font-bold text-5xl my-2">
              
            </span>
            </div>
            <form method="dialog" class="">
              <button>close</button>
            </form>
        `;
        const countDown = modal1.querySelector('#time');
        let value = 3;
        countDown.innerText = value;
        const int = setInterval(() => {
            value--;
            countDown.innerText = value;
            if(value <= 0){
                clearInterval(int);
                modal1.close();
        }
        }, 1000);
        countBtn.disabled = true;
    }
)

    // add img to card
    const imgBtn = card.querySelector("#imgBtn");
    imgBtn.addEventListener("click", () => {
        imgBtn.classList.add("bg-green-300")
        imgBtn.classList.add("text-green-900")
        imgBtn.disabled = true;
        const imag = document.createElement('span')
        imag.innerHTML = `
            <div>
                <img class="rounded-lg my-2" src="${pet.image}" alt="">
            </div>
        `;
        imgContainer.appendChild(imag);
    }

);

    
    cardContainer.appendChild(card);
}
loadingRemove();
};



const handle = (category) =>{
        
        const cardContainer = document.getElementById('cardContainer')
        cardContainer.innerHTML = ''
        remove()       
        add(category)
        byNamePets(category)
        // loadingRemove()
    }

//loading function
const loadingAdd = () => {
    const loadingContainer = document.getElementById('loadingContainer');
    const cardContainer = document.getElementById('cardContainer');
    loadingContainer.classList.remove('hidden')
    cardContainer.classList.add('hidden')
    
}
const loadingRemove = () => {
    const loadingContainer = document.getElementById('loadingContainer');
    const cardContainer = document.getElementById('cardContainer');
    setInterval((n) => {  
        loadingContainer.classList.add('hidden')
        cardContainer.classList.remove('hidden')
        clearInterval(n)
    }, 3500);
    
}

document.getElementById('sortBtn').addEventListener('click', () => {
    const cardContainer = document.getElementById('cardContainer')
        cardContainer.innerHTML = ''
  const sortedPets = [...allPets].sort((a, b) => b.price - a.price); 
  displayCard(sortedPets);
});


cardAll()
categoryBtn()
