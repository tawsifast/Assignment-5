

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



function displayAllIssue(issue){
    showLoading();
    cardContainer.innerHTML ="";
    issue.forEach(card => {
    console.log(card);

    const cardDiv = document.createElement("div");
    
    // status open/close hole border color change hobe
    const borderColor = card.status === "open" ? "border-green-500" : "border-red-500";

    // status open/close hole img change hobe
    const img = card.status === "open" ? '<img src="./assets/Open-Status.png" alt=""></img>' : '<img src="./assets/Closed- Status .png" alt=""></img>';

    cardDiv.innerHTML =`
    <div class="card bg-base-100 shadow-sm border-t-4 ${borderColor} h-full">
    <div class="card-body ">
    <div class="flex justify-between">
        ${img}
        <h2 class="badge badge-soft badge-xs badge-error font-semibold">${card.priority}</h2>
    </div>
    <h2 class="font-semibold text-lg">${card.title}</h2>
    <p class="line-clamp-2">${card.description}</p>
    <div>

        <h2 class="badge badge-xs badge-warning font-semibold"><i class="fa-solid fa-bug"></i>Bug</h2>
        <h2 class="badge badge-xs badge-warning font-semibold"><i class="fa-solid fa-circle-radiation"></i>Help Wanted</h2>
    </div>
    <hr class="opacity-20">
     <div class="">
     <div>
      <p><span>#${card.id} by</span> ${card.author}</p>
        <p>1/15/2024</p>
        </div>
    </div>
    </div>
   
</div>
        
        `
        cardContainer.append(cardDiv);
       
    });
 hideLoading();
}



// parameter status hobe button er onlick er 1st argument
// jei button click korbo oi button er info jabe 
 async function filterIssues(status, btnid){

   const buttons = [allBtn, openBtn, closeBtn];

   buttons.forEach((btn)=>{

    btn.classList.remove("btn-primary")
    btn.classList.add("btn-outline")
});
    // jei btn e click korbo otar id asbe ekhane
    const selectedBtn = document.getElementById(btnid);
    selectedBtn.classList.add("btn-primary")
    selectedBtn.classList.remove("btn-outline")

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




