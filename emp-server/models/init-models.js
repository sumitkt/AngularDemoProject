var DataTypes = require("sequelize").DataTypes;
var _customer = require("./customer");
var _employee = require("./employee");
var _empprojects = require("./empprojects");
var _pod = require("./pod");
var _projects = require("./projects");
var _salary = require("./salary");
var _skills = require("./skills");
var _users = require("./users");

function initModels(sequelize) {
  var customer = _customer(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var empprojects = _empprojects(sequelize, DataTypes);
  var pod = _pod(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var salary = _salary(sequelize, DataTypes);
  var skills = _skills(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  employee.belongsToMany(projects, { as: 'project_id_projects', through: empprojects, foreignKey: "e_id", otherKey: "project_id" });
  projects.belongsToMany(employee, { as: 'e_id_employees', through: empprojects, foreignKey: "project_id", otherKey: "e_id" });
  projects.belongsTo(customer, { as: "customer_name_customer", foreignKey: "customer_name"});
  customer.hasMany(projects, { as: "projects", foreignKey: "customer_name"});
  empprojects.belongsTo(employee, { as: "e", foreignKey: "e_id"});
  employee.hasMany(empprojects, { as: "empprojects", foreignKey: "e_id"});
  pod.belongsTo(employee, { as: "manager", foreignKey: "manager_id"});
  employee.hasMany(pod, { as: "manager_pods", foreignKey: "manager_id"});
  salary.belongsTo(employee, { as: "e", foreignKey: "e_id"});
  employee.hasMany(salary, { as: "salaries", foreignKey: "e_id"});
  skills.belongsTo(employee, { as: "e", foreignKey: "e_id"});
  employee.hasOne(skills, { as: "skill", foreignKey: "e_id"});
  employee.belongsTo(pod, { as: "pod", foreignKey: "pod_id"});
  pod.hasMany(employee, { as: "employees", foreignKey: "pod_id"});
  employee.belongsTo(pod, { as: "manager", foreignKey: "manager_id"});
  pod.hasMany(employee, { as: "manager_employees", foreignKey: "manager_id"});
  projects.belongsTo(pod, { as: "pod", foreignKey: "pod_id"});
  pod.hasMany(projects, { as: "projects", foreignKey: "pod_id"});
  empprojects.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(empprojects, { as: "empprojects", foreignKey: "project_id"});

  return {
    customer,
    employee,
    empprojects,
    pod,
    projects,
    salary,
    skills,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
