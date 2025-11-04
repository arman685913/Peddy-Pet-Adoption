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
        <button id="${category.category}" onclick="handle('${category.category}')"  class="removeBg lg:py-7 justify-center py-3 hover:bg-green-100 items-center px-8 lg:px-20 flex font-semibold gap-4 lg:text-3xl text-xl border shadow-sm rounded-full"><img class="lg:w-16 w-9" src="${category.category_icon}" alt="">${category.category}</button>
        `
    }
}


const remove = () => {
        const removeItems = document.getElementsByClassName('removeBg')
        for(let removeItem of removeItems) {
            removeItem.classList.remove('bg-green-300');
        }
    }

const add = (category) => {
        document.getElementById(category).classList.add('bg-green-300')
    }


// Fetch Pets by Category
const byNamePets = (category) => {
    const url = 
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {
        displayCard(data.data)
        // console.log(data.data)
    })
} 

// all
const cardAll = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {
        displayCard(data.pets)
    })
} 

const displayCard = (pets) => {
    const cardContainer = document.getElementById('cardContainer');
    if(pets.length == 0){
        cardContainer.classList.remove('grid')
        cardContainer.innerHTML = `
            <div class="bg-gray-200 col-span-3 justify-center flex  flex-col lg:py-44 lg:px-24 p-2">
                <div class="text-center mx-auto">
                <img  src="images/error.webp" alt="">
                </div>
                <h1 class="my-3 lg:text-3xl text-xl font-semibold">No Information Available
                </h1>
                <p class="text-gray-400 text-xs lg:text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
              </div>
        `
        return;
    } else{
        for(let i = 0; i < pets.length; i++){
            const pet = pets[i]
            cardContainer.innerHTML +=  `
            <div class="p-4 shadow-lg rounded-2xl text-left">
            <img class="rounded-lg my-2" src="${pet.image}" alt="">
            <h class="text-xl font-semibold">${pet.pet_name}</h1>
            <div class="mt-2 border-b-2">
            <p class="my-1.5 text-sm text-gray-400">Breed: ${pet.breed}</p>
            <p class="my-1.5 text-sm text-gray-400">Birth: ${pet.date_of_birth}</p>
            <p class="my-1.5 text-sm text-gray-400">Gender: ${pet.gender}</p>
            <p class="my-1.5 text-sm text-gray-400">Price: ${pet.price}</p>
            </div>
            <div class="flex justify-between items-center mt-3">
            <button><img class="w-8 rounded-lg border p-1 mt-1" src="https://img.icons8.com/?size=64&id=33481&format=png" alt=""></button>
            <button class="text-green-400 text-sm border py-1 px-3 rounded-lg">Adopt</button>
            <button class="text-green-400 text-sm border py-1 px-3 rounded-lg">Details</button>
            </div>
            </div>
            `
            // console.log(pet)
        }
        }
    }

const handle = (category) =>{
        const cardContainer = document.getElementById('cardContainer')
        cardContainer.innerHTML = ''
        remove()       
        byNamePets(category)
        add(category)
    }

cardAll()
categoryBtn()
