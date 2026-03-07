
async function getAllIssue (){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayAllIssue(data.data);
}

function displayAllIssue(issue){
    const allIssueContainer = document.getElementById("allIssueContainer");
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML ="";
    issue.forEach(card => {
        console.log(card);
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML =`
        <div class="card bg-base-100 shadow-sm border-t-4 border-green-300">
    <div class="card-body">
    <div class="flex justify-between">
        <img src="./assets/Open-Status.png" alt="">
        <h2 class="badge badge-xs badge-warning">${card.priority}</h2>
    </div>
    <h2 class="font-semibold text-lg">${card.title}</h2>
    <p>${card.description}</p>
    <div>
        <h2 class="badge badge-xs badge-warning"><i class="fa-solid fa-bug"></i>Bug</h2>
        <h2 class="badge badge-xs badge-warning"><i class="fa-solid fa-circle-radiation"></i>Help Wanted</h2>
    </div>
    <hr class="opacity-20">
     <div class="">
        <p><span>#${card.id} by</span> ${card.author}</p>
        <p>1/15/2024</p>
    </div>
    </div>
   
</div>
        
        `
        cardContainer.append(cardDiv);
    });
}

getAllIssue();