let creatButton = document.getElementById("button")
let saveButton = document.getElementById("saveButton")
let submitButton = document.getElementById("submitButton")
let modalOverlay = document.getElementById("modal-overlay")
let closeModalIcon = document.getElementById("close-modal-icon")
let nameOfWebsite = document.getElementById("nameOfWebsite")
let resourceForm = document.getElementById("resource-form")
let linkOfWebsite = document.getElementById("linkOfWebsite")
let descriptionOfWebsite = document.getElementById("descriptionOfWebsite")
let resourcesSection = document.getElementById("resources-section")


let resources = []
let singleData 

function closeBackModalOverlay(){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove("modal-overlay-visible")
        modalOverlay.classList.add("modal-overlay")
    }
}
closeModalIcon.addEventListener("click", closeBackModalOverlay )

function printResourcesOnUI(){
    resourcesSection.textContent = ""

    resources.forEach(function(allResourcesFromArray){
         let printID = allResourcesFromArray.id
         let printSiteName = allResourcesFromArray.siteName
         let printSiteLink = allResourcesFromArray.siteLink
         let printSiteDescription = allResourcesFromArray.siteDescription
         
         let resourceDIV = document.createElement("div")
         resourceDIV.classList.add("resource")

         let nameOfWebsiteDIV = document.createElement("div")
         nameOfWebsiteDIV.classList.add("name-of-website")

         let nameOfWebsiteText = document.createElement("a")
         nameOfWebsiteText.setAttribute("href", `${printSiteLink}`)
         nameOfWebsiteText.setAttribute("target", "_blank")
         nameOfWebsiteText.setAttribute("contenteditable", "false")
         nameOfWebsiteText.textContent = printSiteName

         let iconDiv = document.createElement("div")
         iconDiv.classList.add("icondiv")

         let deleteIcon = document.createElement("i")
         deleteIcon.classList.add("fa", "fa-trash")
         deleteIcon.setAttribute(`onclick`, `deleteResource('${printID}')`)

         let editIcon = document.createElement("i")
        editIcon.classList.add("fa-regular", "fa-pen-to-square")
        editIcon.setAttribute(`onclick`, `revealModalOverlay( "" ,'${printID}')`)


        // function editResource(){
        //     console.log("i'm working")
        // }
         

         let descriptionOfWebsiteDiv = document.createElement("div")
         descriptionOfWebsiteDiv.classList.add("description-of-website")

         let descriptionText = document.createElement("p")
         descriptionText.textContent = printSiteDescription
         descriptionText.setAttribute("contenteditable", "false")

         descriptionOfWebsiteDiv.append(descriptionText)
         iconDiv.append(deleteIcon, editIcon)
         nameOfWebsiteDIV.append(nameOfWebsiteText, iconDiv)
         resourceDIV.append(nameOfWebsiteDIV, descriptionOfWebsiteDiv)
         resourcesSection.append(resourceDIV)
    })
}

function revealModalOverlay(button, printID){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfWebsite.focus()
    // this is for the EDIT BUTTONS
    if(!button) {
        resources.forEach(function(resource, index ){
            if(resource.id == printID){
                singleData = resource
                nameOfWebsite.value = resource.siteName
                linkOfWebsite.value = resource.siteLink
                descriptionOfWebsite.value = resource.siteDescription
                submitButton.classList.add("hidden")
                saveButton.classList.remove("hidden")
            }
        })
    } else { 
        // THIS IS FOR THE CREATE
        nameOfWebsite.value = ""
        linkOfWebsite.value = ""
        descriptionOfWebsite.value = ""
        saveButton.classList.add("hidden")
        submitButton.classList.remove("hidden")
    }
}
creatButton.addEventListener("click", revealModalOverlay)


function deleteResource(printID){
    resources.forEach(function(resource, index ){
        if(resource.id == printID){
            resources.splice(index, 1)
        }
    })
    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
}

function fetchResources(){
    if(localStorage.getItem("resources")){
        resources = JSON.parse(localStorage.getItem("resources"))
    }
    printResourcesOnUI()
}
fetchResources()

resourceForm.addEventListener("submit", handleForm)
function handleForm(event){
    event.preventDefault()
    let websiteName = nameOfWebsite.value
    let websiteURL = linkOfWebsite.value
    let description = descriptionOfWebsite.value
    let data = JSON.parse(localStorage.getItem("resources"))

    if(nameOfWebsite.value.trim() === ""){
        nameOfWebsite.style.border = "1px solid red"
    }

    if(linkOfWebsite.value.trim() === ""){
        linkOfWebsite.style.border = "1px solid red"
    }

    if(descriptionOfWebsite.value.trim() === ""){
        descriptionOfWebsite.style.border = "1px solid red"
    }

    const aCreatedResource = {
        siteName : websiteName,
        siteLink : websiteURL,
        siteDescription : description,
        id:  data.length ? data.length + 1 : 1
    }

    resources.push(aCreatedResource)
    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
    resourceForm.reset()
    closeBackModalOverlay()
}

saveButton.addEventListener("click", function(){
    let websiteName = nameOfWebsite.value
    let websiteURL = linkOfWebsite.value
    let description = descriptionOfWebsite.value
    
    // deletes the clicked object from the recourse array
    resources.forEach(function(resource, index ){
        if(resource.id == singleData.id){
           resources.splice(index, 1)
        } 
    })

    // creates a new object that will be added to the array.
    const aCreatedResource = {
        siteName : websiteName,
        siteLink : websiteURL,
        siteDescription : description,
        id:  singleData.id
    }

    // 
    resources.unshift(aCreatedResource)
    localStorage.setItem("resources", JSON.stringify(resources))
    closeBackModalOverlay()
    fetchResources()
})

// document.addEventListener("click", function(){
//     console.log("resources", resources)
//     console.log("SINGLE DATA", singleData)
//     console.log("printID", printID)
// })



