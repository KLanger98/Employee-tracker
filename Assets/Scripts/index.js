const promptUser = require('./promptChoice');
const handleChoice = require('./handleChoice');


function runEmployeeDatabase(){
    promptUser()
    .then((response) =>{
        handleChoice(response.command)
            .then((response) =>{
                console.log(response);
                runEmployeeDatabase();
            })
            .catch((error) => {
                console.error(error)
            })
        
    })
    .catch((error) => {
        console.error(error);
    })
}

module.exports = runEmployeeDatabase;