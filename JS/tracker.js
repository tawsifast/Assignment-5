

const allIssueContainer = document.getElementById("allIssueContainer");
const cardContainer = document.getElementById("card-container");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
let allIssues = [];



async function getAllIssue (){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data
    displayAllIssue(allIssues);
}

getAllIssue();


function displayAllIssue(issue){
    
    cardContainer.innerHTML ="";
    issue.forEach(card => {
    console.log(card);
    
    const cardDiv = document.createElement("div");
    const borderColor = card.status === "open" ? "border-green-500" : "border-red-500";
    cardDiv.innerHTML =`
    <div class="card bg-base-100 shadow-sm border-t-4 ${borderColor} h-full">
    <div class="card-body ">
    <div class="flex justify-between">
        <img src="./assets/Open-Status.png" alt="">
        <h2 class="badge badge-xs badge-warning">${card.priority}</h2>
    </div>
    <h2 class="font-semibold text-lg">${card.title}</h2>
    <p>${card.description}</p>
    <div>
        <h2 class="badge badge-soft badge-xs badge-error"><i class="fa-solid fa-bug"></i>Bug</h2>
        <h2 class="badge badge-xs badge-warning"><i class="fa-solid fa-circle-radiation"></i>Help Wanted</h2>
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
}


 async function filterIssues(status, btnid){
   const buttons = [allBtn, openBtn, closeBtn];

   buttons.forEach((btn)=>{

    btn.classList.remove("btn-primary")
    btn.classList.add("btn-outline")
});
    const selectedBtn = document.getElementById(btnid);
    selectedBtn.classList.add("btn-primary")
    selectedBtn.classList.remove("btn-outline")

    let filtered ;
    if(status == "all"){
        filtered = allIssues;
    }else{
        filtered = allIssues.filter((issue) => issue.status === status);
    }
    displayAllIssue(filtered);

}

