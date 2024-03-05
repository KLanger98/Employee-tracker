INSERT INTO department (name)
VALUES ("Finance"),
       ("IT"),
       ("Administrative");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 850000, 1),
       ("Back-End Developer", 80000, 2),
       ("Front-End Developer", 750000, 2),
       ("CEO", 120000, 3),
       ("Secretary", 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Smith", 1, 2),
        ("Brad", "Pitt", 4, null),
        ("Teddy", "Norm", 3, 2),
        ("Jessica", "Denali", 2, 3),
        ("Hailey", "Tapioca", 3, 3),
        ("James", "Man", 5, 2);


