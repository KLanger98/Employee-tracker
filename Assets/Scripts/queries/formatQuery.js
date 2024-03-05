
//Format database queries based on their selected table name
function formatResponse(response, domain){
    return response.map(obj => {
        let newObj = {...obj};
        if(domain == "department"){
            newObj.value = newObj.id;
            delete newObj.id;
        } else if(domain == "role"){
            newObj.name = obj.title
            newObj.value = newObj.id;
            delete newObj.id
        } else if(domain == "employee"){
            newObj.name = obj.first_name + " " + obj.last_name;
            newObj.value = newObj.id;
            delete newObj.id;
        }
        return newObj;
    })
};


module.exports = formatResponse;