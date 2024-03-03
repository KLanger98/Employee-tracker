

function formatDepartments(response){
    return response.map(obj => {
        let newObj = {...obj};
        newObj.value = newObj.id;
        delete newObj.id;
        return newObj;
    })
}

function formatEmployees(response){
    return response.map(obj =>{
            let newObj = {
                name: obj.first_name + " " + obj.last_name,
                value: obj.id
            }
            return newObj;
        })
}

function formatRoles(response){
    return response.map(obj => {
        let newObj = {...obj};
        newObj.name = newObj.title;
        newObj.value = newObj.id;
        delete newObj.id;
        return newObj;
    })
}

module.exports = {formatDepartments, formatEmployees, formatRoles};