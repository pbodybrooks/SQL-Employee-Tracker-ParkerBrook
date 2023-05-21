INSERT INTO department (department_name) 
VALUES ("Customer Success"),
       ("Engineering"),
       ("Finance"),
       ("Human Resources"),
       ("Legal"),
       ("Marketing"),
       ("Operations"),
       ("Product"),
       ("Sales"),
       ("Support");

INSERT INTO role (role_title, salary, department_id)
VALUES ("Customer Succes Manager I", 84000, 1),
       ("Customer Succes Manager II", 93000, 1),
       ("Manager, Customer Success", 120000, 1),
       ("Software Engineer I", 103000, 2),
       ("Software Engineer II", 117000, 2),
       ("Senior Software Engineer I", 143000, 2),
       ("Senior Software Engineer II", 157000, 2),
       ("Principal Engineer", 201000, 2),
       ("Manager, Engineering", 176000, 2),
       ("Financial Analyst I", 67000, 3),
       ("Financial Analyst II", 67000, 3),
       ("Financial Associate", 93000, 3),
       ("Manager, Finance", 108000, 3),
       ("Recruiter", 94000, 4),
       ("HR Business Partner", 109000, 4),
       ("Manager, HR", 121000, 4),
       ("Compliance Specialist", 70000, 5),
       ("Corporate Counsel", 126000, 5),
       ("Manager, Legal", 139000, 5),
       ("Product Marketing Manager", 95000, 6),
       ("Senior Product Marketing Manager", 118000, 6),
       ("Manager, Marketing", 127000, 6),
       ("Operations Analyst", 63000, 7),
       ("Operations Manager", 79000, 7),
       ("Senior Operations Manager", 94000, 7),
       ("Manager, Operations", 107000, 7),
       ("Product Manager I", 96000, 8),
       ("Product Manager II", 124000, 8),
       ("Group Product Manager II", 169000, 8),
       ("Manager, Product", 185000, 8),
       ("Sales Development Representative", 54000, 9),
       ("Senior Sales Development Representative", 59000, 9),
       ("Account Executive", 98000, 9),
       ("Manager, Sales", 110000, 9),
       ("Customer Support Representative I", 40000, 10),
       ("Customer Support Representative II", 58000, 10),
       ("Implementation Manager", 76000, 10),
       ("Manager, Delivery", 91000, 10);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Safaa", "Lamb", 1, 3),
       ("Kelvin", "Cobb", 2, 3),
       ("Ana", "Woodard", 3, NULL),
       ("Yasin", "Williamson", 4, 9),
       ("Valerie", "Martin", 5, 9),
       ("Kara", "Proctor", 6, 9),
       ("Alastair", "Mahoney", 7, 9),
       ("Brandon", "Alvarado", 8, 9),
       ("Sophia", "Wright", 9, NULL),
       ("Jacob", "Riley", 10, 13),
       ("Emma", "Baker", 11, 13),
       ("Ethan", "Miles", 12, 13),
       ("Mia", "Ward", 13, NULL),
       ("Oliver", "Wagner", 14, 16),
       ("Ava", "Russell", 15, 16),
       ("Noah", "Pierce", 16, NULL),
       ("Isabella", "Holmes", 17, 19),
       ("William", "West", 18, 19),
       ("Charlotte", "Harrington", 19, NULL),
       ("James", "Hill", 20, 22),
       ("Amelia", "Hunter", 21, 22),
       ("Benjamin", "Gibson", 22, NULL),
       ("Evelyn", "Lowe", 23, 26),
       ("Lucas", "Black", 24, 26),
       ("Abigail", "Dickinson", 25, 26),
       ("Alexander", "Mason", 26, NULL),
       ("Chloe", "Roberts", 27, 30),
       ("Daniel", "Sullivan", 28, 30),
       ("Kira", "Hendricks", 29, 30),
       ("Harper", "Bowman", 30, NULL),
       ("Oscar", "Warren", 31, 34),
       ("Lila", "Ramirez", 32, 34),
       ("Finn", "Harvey", 33, 34),
       ("Lydia", "Morales", 34, NULL),
       ("Gabe", "Holt", 35, 38),
       ("Daisy", "Patterson", 36, 38),
       ("Max", "Lopez", 37, 38),
       ("Avery", "Lynch", 38, NULL);

