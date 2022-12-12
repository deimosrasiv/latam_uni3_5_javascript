const button = document.querySelector("#btnadd");
const inputList = document.querySelector("#inputList");
const jobs = document.querySelector("#jobs");
const totalList = document.querySelector("#totalList");
const form = document.querySelector("#form");
const listOk = document.querySelector("#listOk");




let list =[];

// Pintamos el contenido de las teras en el DOM
const render =() =>{
    jobs.innerHTML ="";
    list.forEach((item) =>{
           
            if (item.status != 0){
                
                jobs.innerHTML +=`
                <div class="input-group mb-3 ">
                    <div class="input-group-text">
                    <small class="ok">Ok</small>
                    <input class="form-check-input mt-0" id="chex"  onclick="statusOK(${item.id},${item.status})" type="checkbox" value="" aria-label="Checkbox for following text input" checked>
                    </div>
                    <small rows="2" cols="0" type="text" class="form-control"><span class="ok" >ID: ${item.id}</span><br><del>${item.tarea}</del></p></small>
                    <button type="button"  onclick="deleteList(${item.id})" class="btn btn-danger">Eliminar</button>
                </div>
            `
                return
            } else {
                jobs.innerHTML +=`
                    <div class="input-group mb-3 ">
                        <div class="input-group-text">
                            <input class="form-check-input mt-0" id="chex"  onclick="statusOK(${item.id},${item.status})" type="checkbox" value="" aria-label="Checkbox for following text input">
                        </div>
                        <small rows="2" cols="0" type="text" class="form-control" ><span class="ok" >ID: ${item.id}</span><br> ${item.tarea}</small>
                        <button type="button"  onclick="deleteList(${item.id})" class="btn btn-danger">Eliminar</button>
                    </div>
                `
            }
        
    })
        let sumstatus = list.map(item => item.status).reduce((prev, curr) => prev + curr, 0);
        listOk.innerHTML =sumstatus
        totalList.innerHTML=list.length
}


// agregamos tareas 
form.addEventListener("submit",(e) =>{
    e.preventDefault();
    if (inputList.value != ""){
        list.push({
            id:Date.now(),
            tarea:inputList.value,
            status: 0
        });
        render();
        inputList.value = ""
    }
});


//Eliminadmos items 
const deleteList = (id) => {
    list = list.filter((item) => item.id !== id);
    render();
};




// cambiamos en el array el status de 1 a 0
// para identificar cuando una tarea ya se encuentra concluida 
// el usuario puede volver a dejar como tarea pendiente
const statusOK = (id) =>{
    list.forEach((item) =>{
        if (item.id === id){
            render();
                if (item.status === 0){
                    item.status = 1
                    render();
                } else {
                    item.status = 0
                    render();
                }
        }
    })
}






