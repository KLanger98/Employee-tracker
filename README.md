# Employee Management System
 
## Description
This project has been created to assist with tracking employees, roles and departments within a business and has been completed as a part of the Adelaide University Web Development bootcamp. The motivation for this project has been to create a user interface within the command line which allows the user to perform various tasks such as viewing, adding, deleting and updating key business departments, roles and employees. This has been completed with the help of mySQL and express.js. 

Completing this project was a useful lesson in maintaining a SQL database by dynamically making queries, inserting, deleting and updating data. It was also an unexpected exercise in understanding how to implement promises due to the asynchronous nature of Inquirer and SQL. This was especially useful as the majority of processes required a consistent structure to ensure all promises are resolved or rejected appropriately throughout modules. 


## Installation
To install this Employee Management System, simply clone this repository to your local computer.

Once installed you will need to navigate to the repository and install all necessary node packages with 'npm i'. This will install inquirer and mysql2 for use. 

You will need to have SQL downloaded and installed on your computer for this application to run. You will then need to ensure that your SQL credentials in database.js found at 'Assets/Scripts/database.js' matches your own credentials.

You will then need to launch SQL and SOURCE schema.sql and seeds.sql.

Then, run the program by entering 'npm start' into the terminal


## Usage
Please find a demo video here: https://drive.google.com/file/d/1kNMnzSbuKylbsuunj5DH9O5JqClZmcSh/view?usp=sharing

Once you have launched the 'Employee Management System' you will be presented with the following options:

![Screenshot of loaded management system](./Assets/Screenshots/loadedInterface.png)

You can scroll through all the options provided and select them with 'Enter', as an example, selecting view employees will provide the following table:

![Screenshot fo all employees](./Assets/Screenshots/viewTable.png)

If you select to add either an employee, role or department you will be prompted with the appropriate questions associated with that tables necessary values. 

![Adding employee](./Assets/Screenshots/addEmployees.png)

A similar process can be found with each selected process. YOu will be prompted to either select an option from a list or provide a text response which will then be used to complete your desired process. 
