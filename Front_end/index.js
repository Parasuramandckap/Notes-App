// targetting all the html elements
let titleInput = document.querySelector("#title")
const clodeBtn = document.querySelector(".close")
const addNote = document.querySelector(".add")
const addNoteDiv = document.querySelector(".add-container")
const cardsDiv = document.querySelector(".cards")
const decriptionInput = document.querySelector(".decription")
const submitBtn = document.querySelector(".submit")

let addText = document.querySelector(".note")
console.log(addText)
let loader = document.querySelector(".loader")
// console.log(addText)
//add note btn click then open the note form
addNote.addEventListener("click", () => {
    addNoteDiv.classList.add("showzIndex")

})
// close btn click then close the note form
clodeBtn.addEventListener('click', () => {
    addNoteDiv.classList.remove("showzIndex")
    titleInput.value = ""
    decriptionInput.value = ""
    submitBtn.innerText = "submit"
    addText.innerText = "Add a New Note"
})





//add notes function
submitBtn.addEventListener("click", () => {
    if (titleInput.value.trim() !== "" || decriptionInput.value.trim() !== "") {
        if (submitBtn.innerText == "submit") {
            fetch("http://localhost:3000/posts", {
                method: 'POST',
                body: JSON.stringify({
                    title: `${titleInput.value}`,
                    description: `${decriptionInput.value}`

                }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            titleInput.value = "";
            decriptionInput.value = ""
            submitBtn.innerText = "Update"
        }
    }
    else {
        //user give the empty value show the alert
        alert("please enter the value")
    }


})

//get date 
let today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0');
let year = today.getFullYear();


// fetch data in api url 
window.addEventListener("DOMContentLoaded", () => {
    loader.style.visibility = "visible"
    fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(json => {
            loader.style.visibility = "hidden"
            json.forEach(element => {

   
                //element create in json response
                let mainDiv = document.createElement("div")
                mainDiv.setAttribute("class", "datas")
                mainDiv.setAttribute("data-set", element.id)

                let titlediv = document.createElement("div")
                let title = document.createElement("h3")
                title.innerText = `${element.title}`
                titlediv.appendChild(title)

                let lineTop = document.createElement("div")
                lineTop.setAttribute("class", "line")

                let paragraphDiv = document.createElement("div")
                paragraphDiv.setAttribute("class", "paragraphDiv")
                let description = document.createElement("article")
                description.setAttribute("class", "description")
                description.innerText = `${element.description}`
                paragraphDiv.appendChild(description)
                let lineBottom = document.createElement("div")
                lineBottom.setAttribute("class", "line")

                let footerdiv = document.createElement("div")
                footerdiv.setAttribute("class", "footer")

                let datediv = document.createElement("div")

                let date = document.createElement("p")
                date.innerText = `${day}/${month}/${year}`

                datediv.appendChild(date)
                let icons = document.createElement("button")
                icons.setAttribute("class", "icons")
                icons.setAttribute("data-set", element.id)
                icons.innerHTML = `<i class="fa fa-ellipsis-v option more" data-set = "${element.id}" aria-hidden="true"></i>`;

                let options = document.createElement("div")
                options.setAttribute("class", "opt")
                options.setAttribute("data-set", element.id)

                let editicon = document.createElement("div")
                editicon.setAttribute("data-set", element.id)
                editicon.setAttribute("class", "icondiv")
                editicon.innerHTML = `<i class="fas fa-edit edit"></i>  ${"Edit"}`


                let deleteicon = document.createElement("div")
                deleteicon.setAttribute("class", "icondiv")
                deleteicon.setAttribute("data-set", element.id)
                deleteicon.innerHTML = `<i class="fas fa-trash-alt trash"></i> ${"Delete"}`
                options.appendChild(deleteicon)
                options.appendChild(editicon)

                footerdiv.appendChild(datediv)
                footerdiv.appendChild(icons)

                mainDiv.appendChild(titlediv)
                mainDiv.appendChild(lineTop)
                mainDiv.appendChild(paragraphDiv)
                mainDiv.appendChild(lineBottom)
                mainDiv.appendChild(footerdiv)
                mainDiv.appendChild(options)
                cardsDiv.appendChild(mainDiv)

                //delete operation 

                deleteicon.addEventListener("click", (e) => {
                    let deleteid = e.target.dataset.set
                    fetch(`http://localhost:3000/posts/${deleteid}`, {
                        method: "DELETE",
                        headers: {
                            'Content-type': 'application/json',
                        }
                    })

                })


                //edit operation
                editicon.addEventListener("click", (e) => {
                    addText.innerText = "Update the Note"
                    addNoteDiv.classList.add("showzIndex")
                    submitBtn.innerText = "Update";
                    let editId = e.target.dataset.set
                    console.log(editId);
                    fetch(`http://localhost:3000/posts/${editId}`)
                        .then(res => res.json())
                        .then(update => {
                            // console.log(update)
                            submitBtn.setAttribute("data-set", update.id)
                            // console.log(submitBtn);
                            titleInput.value = update.title
                            decriptionInput.value = update.description
                        })
                })

                //update operation
                submitBtn.addEventListener("click", (e) => {
                    if (submitBtn.innerText == "Update") {
                        if(titleInput.value.trim() !== "" || decriptionInput.value.trim() !== ""){
                            let updateid = e.target.dataset.set
                            console.log(updateid)
                            fetch(`http://localhost:3000/posts/${updateid}`, {
                                method: "PUT",
                                body: JSON.stringify({
                                    "title": titleInput.value,
                                    "description": decriptionInput.value
                                }),
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            })
                            titleInput.value = "";
                            decriptionInput.value = ""
                            submitBtn.innerText = "submit"
                            addText.innerText = "Add a New Note"
                        }


                    }
                    


                })



            })

        })


})


//optiomn show and hide funcionality

let selectid = 0;
window.addEventListener("click", (e) => {
    selectid = e.target.dataset.set
    if (e.target.classList.contains("icons") || e.target.classList.contains("more")) {
        let optionsDIv = document.querySelectorAll(".opt")
        optionsDIv.forEach((element, idx) => {
            console.log(selectid)
            if (element.dataset.set == selectid) {
                element.style.visibility = "visible"
            }
            else {
                // element.classList.add("hide")
                element.style.visibility = "hidden"
            }
        })
    }
    else{
        let optionsDivs = document.querySelectorAll(".opt")
        optionsDivs.forEach((option)=>{
            option.style.visibility = "hidden"
        })
    }
})