

const allIssueContainer = document.getElementById("allIssueContainer");
const cardContainer = document.getElementById("card-container");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const total = document.getElementById("total");
const loadingSpinner = document.getElementById("laodingSpinner")

let allIssues = [];

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    cardContainer.innerHTML = "";
}
function hideLoading(){
    loadingSpinner.classList.add("hidden");
}


async function getAllIssue (){
   showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hideLoading();
    allIssues = data.data;

    displayAllIssue(allIssues);
    total.innerText = allIssues.length;

}

getAllIssue();

// card er detials load hobe
async function loadWordDetail(id){
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayCardDetails(details.data);
}

// card er details modal e show hobe
function displayCardDetails(array){
console.log(array);
const detailBox = document.getElementById("details-container");
detailBox.innerHTML= `
    
      <h3 class="text-2xl font-bold">${array.title}</h3>
    <div class="flex items-center gap-3">
        <h2 class="badge badge-md badge-success font-semibold">${array.status}</h2>
        <p class="text-gray-600">Opened by ${array.author}</p>
        <p class="text-gray-600">${new Date(array.createdAt).toLocaleDateString()}</p>
    </div>
    <div class>
        <h2 class="badge badge-sm badge-soft badge-error font-semibold"><i class="fa-solid fa-bug"></i>${array.labels[0]}</h2>
        <h2 class="badge badge-sm badge-warning font-semibold"><i class="fa-solid fa-circle-radiation"></i>${array.labels[1]}</h2>
    </div>
    <p class="text-gray-600">${array.description}</p>
    <div class="flex gap-30 items-center">
        <div>
            <p class="text-gray-600">Assignee:</p>
            <p class="text-gray-600">${array.assignee ? array.assignee : "not found"}</p>
        </div>
        <div>
            <p class="text-gray-600">Priority:</p>
         <h2 class="badge badge-error">${array.priority}</h2>
        </div>
    </div>
  
`
document.getElementById("details_modal_1").showModal()

}


function displayAllIssue(issue){

    cardContainer.innerHTML ="";
    issue.forEach(card => {
    console.log(card);

    const cardDiv = document.createElement("div");
    
    // status open/close hole border color change hobe
    const borderColor = card.status === "open" ? "border-green-500" : "border-red-500";

    const priority = card.priority === "high" ? "badge-error" : card.priority === "medium" ? "badge-warning" : "text-gray-600";

    // status open/close hole img change hobe
    const img = card.status === "open" ? '<img src="./assets/Open-Status.png" alt=""></img>' : '<img src="./assets/Closed- Status .png" alt=""></img>';

    cardDiv.innerHTML =`
    <div onclick="loadWordDetail(${card.id})" class="card bg-base-100 shadow-sm border-t-4 ${borderColor} h-full">
    <div class="card-body ">
    <div class="flex justify-between">
        ${img}
        <h2 class="badge badge-soft badge-sm font-semibold ${priority}">${card.priority}</h2>
    </div>
    <h2 class="font-semibold text-lg">${card.title}</h2>
    <p class="line-clamp-2">${card.description}</p>
    <div>

        <h2 class="badge badge-xs badge-soft badge-error font-semibold gap-1"><i class="fa-solid fa-bug"></i>${card.labels[0]}</h2>
        <h2 class="badge badge-xs badge-warning font-semibold gap-1"><i class="fa-solid fa-circle-radiation"></i>${card.labels[1]}</h2>
    </div>
    <hr class="opacity-20">
     <div class="flex justify-between">
     <div>
        <p><span>#${card.id} by</span> ${card.author}</p>
        <p>Assignee : ${card.assignee ? card.assignee: "Unassigned"}</p>
     </div>
     <div>
     <p>${new Date(card.createdAt).toLocaleDateString()}</p>
     <p>${new Date(card.updatedAt).toLocaleDateString()}</p>
     </div>
    </div>
    </div>
</div>
        
        `
        cardContainer.append(cardDiv);
       
    });

}


// parameter status hobe button er onlick er 1st argument
// jei button click korbo oi button er info jabe 
 async function filterIssues(status, btnid){
showLoading();
   const buttons = [allBtn, openBtn, closeBtn];

   buttons.forEach((btn)=>{

    btn.classList.remove("btn-primary")
    btn.classList.add("btn-outline")
});
    // jei btn e click korbo otar id asbe ekhane
    const selectedBtn = document.getElementById(btnid);
    selectedBtn.classList.add("btn-primary")
    selectedBtn.classList.remove("btn-outline")
    hideLoading();
    let filtered ;
    showLoading();
    // status holo button er arguments 
    if(status == "all"){
        filtered = allIssues;
        // total card number count korbe
        total.innerText =filtered.length;
         hideLoading();
    }else{
        showLoading();
        // all button e jodi click na kore tahole ekhane asbe & open/close button e click onujai card gulo nia array banabe
        filtered = allIssues.filter((issue) => issue.status === status);
            
        total.innerText =filtered.length;
        hideLoading();
    }
    // filter er maddhome j arra hoyece ta ekhane argument akare pathabe and page e show hobe
    displayAllIssue(filtered);

}



// by searching display search value
 document.getElementById("btn-search").addEventListener("click",async () => {
    showLoading();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
   const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
   const searchData = await res.json();
   console.log(searchData);
   const allIssue = searchData.data;
   console.log(allIssue);
   const filterissue = allIssue.filter((name)=> name.title.toLowerCase().includes(searchValue));
  displayAllIssue(filterissue);
  hideLoading();
})




