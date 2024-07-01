//Problem 1

let employees = [
    {firstName: 'Sam', department: 'Tech', designation: 'Manager', salary: 40000, raiseEligible: true},
    {firstName: 'Mary', department: 'Finance', designation: 'Trainee', salary: 18500, raiseEligible: true},
    {firstName: 'Bill', department: 'HR', designation: 'Executive', salary: 21200, raiseEligible: false}
];

console.log('Problem 1:', employees);

//Problem 2

let company = {
    companyName: 'Tech Stars',
    website: 'www.techstars.site',
    employees: employees
};

console.log('Problen 2:', company);

//Problem 3

let newEmployee = {firstName: 'Anna', department: 'Tech', designation: 'Executive', salary: 25600, raiseEligible: false};
company.employees.push(newEmployee);

console.log('Problem 3:', deepCopy(company));

//Problem 4

let totalSalary = company.employees.reduce((acc, employee) => acc + employee.salary, 0);

console.log('Problem 4: Total Salary =', totalSalary);

//Problem 5

function giveRaiseAndSetEligibilityFalse(company) {
    company.employees.forEach(employee => {
        if (employee.raiseEligible) {
            employee.salary *= 1.1;
            employee.raiseEligible = false;
        }
    });
}

giveRaiseAndSetEligibilityFalse(company);
console.log('Problem 5:', deepCopy(company));

//Problem 6

let workFromHome = ['Anna', 'Sam'];

function updateWorkFromHomeStatus(company, wfhList) {
    company.employees.forEach(employee => {
        employee.wfh = wfhList.includes(employee.firstName);
    });
}

updateWorkFromHomeStatus(company, workFromHome);
console.log('Problem 6:', deepCopy(company));