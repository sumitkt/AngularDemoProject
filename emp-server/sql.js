const {Sequelize,Op} = require('sequelize');
// const employee = require('./employee');
// const pod = require('./pod');


var initModels = require("./models/init-models");


const sequelize =  new Sequelize("demoproject_db","root","sumit",{
    host: "localhost",
    dialect: "mariadb",
    port: 3306
});


var models =initModels(sequelize);

// const Employee = sequelize.define('employee',{
//     e_id : { type: Sequelize.STRING },
//     e_name : { type: Sequelize.STRING },
//     pod_id : { type: Sequelize.STRING },
//     manager_id: { type: Sequelize.STRING },
//     emp_image : { type: Sequelize.STRING }
// });

init = function(){
    console.log('Hello');
    sequelize.
    authenticate()
    .then(() => {
        console.log("Connection established!!!");
    })
    .catch( err => {
        console.error("unable to connect: ",err);
    });

    models.employee.sync();
    models.pod.sync();
    models.projects.sync();
    models.salary.sync();
    models.skills.sync();
    models.customer.sync();
    

  
}

getEmployees = function(callback){  
    models.employee.findAll().then( emp => {
        //console.log(emp);
        callback(emp);});
}

getEmployeeById = function(options ,callback){
    models.employee.findOne({ where: {e_id: options.e_id } }).
        then(emp => callback(emp));
};

editEmployee = function(options ,callback){
    console.log("***************");
    models.employee.findOne({ where: {e_id: options.e_id } }).
        then(emp => callback(emp));
};

updateEmployee = function(request, callback) {
    models.employee.findOne({ where: {e_id : request.e_id}}).then(function(emp){
        emp.update({
            e_id: request.e_id,
            e_name: request.e_name,
            manager_id: request.manager_id,
            pod_id: request.pod_id,
            emp_image: request.emp_image
        });
        callback(emp);
    });
}

createEmployee = function(request,callback) {
    models.employee.create({
        e_id: request.e_id,
        e_name: request.e_name,
        pod_id: request.pod_id,
        manager_id: request.manager_id,
        emp_image: request.emp_image
    }).then(emp => callback(emp));
}


// addition of new functions
getEmployeeByPodId = function(options,callback){
    console.log(options.pod_id);
    models.employee.findAll({ where : {pod_id: options.pod_id}}).
    then(emp => callback(emp));

}

getSkillOfEmployee = function(options,callback){
    console.log(options.e_id);
    models.skills.findOne({where: {e_id:options.e_id}}).
    then(skills => callback(skills));
}
getpod = function(callback){  
    models.pod.findAll( {include: [{
        model: models.employee,
        required: true,
        as: "manager"
       }]
    }).then( pod => 
        {//console.log(pod);
             callback(pod);});
}

getpodById = function(options ,callback){
    models.pod.findOne({ where: {pod_id: options.pod_id } }).
        then(emp => callback(emp));
};


editPod = function(options ,callback){
    console.log("***********");
    console.log(options);
    models.pod.findOne({ where: {pod_id: options.pod_id } }).
        then(emp => {
            
            console.log("**********");
            console.log(emp);
            callback(emp);});
};

updatepod = function(request, callback) {
    models.pod.findOne({ where: {pod_id : request.pod_id}}).then(function(emp){
        emp.update({
            pod_id: request.p_id,
            p_name: request.p_name,
            manager_id: request.manager_id,
            
        });
        callback(emp);
    });
}

createpod = function(request,callback) {
    models.pod.create({
        pod_id: request.pod_id,
        p_name: request.p_name,
        
        manager_id: request.manager_id,
        
    }).then(emp => callback(emp));
}

addEmp = function(request,callback) {
    models.empprojects.create({
        e_id: request.e_id,
        project_id: request.project_id,
        work_hours: request.work_hours,
        
    }).then(emp => callback(emp));
}

getclients = function(callback){
    models.customer.findAll().then(client => callback(client));
}

getprojectsBycustomerName = function(request,callback){

    models.projects.findAll({
        where:{
            customer_name:request.customer_name
        }
    }).then( result => callback(result));
}

getEmpProject = function(request,callback){

    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
      
        return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('-');
      };

    current_date_IN_DATE_FORMAT=new Date();
    current_date_IN_STRING_FORMAT=current_date_IN_DATE_FORMAT.yyyymmdd()

    function startOfWeek(date) {
        console.log('date.getDate =' + date.getDate());
        console.log('date.getDay =' + date.getDay());
        //console.log("date.getDate =" + date.getDate());
        var diff =
          date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
      }

      start_date= startOfWeek(current_date_IN_DATE_FORMAT).yyyymmdd();
      


      


    models.empprojects.findAll({
        where:{
            project_id:request.project_id,
            date:{[Op.between]:[start_date,current_date_IN_STRING_FORMAT]}

        },
       
        include: [{
            model: models.employee,
            required: true,
            as: "e"
           }],
           attributes:['e_id','project_id',[sequelize.fn('sum', sequelize.col('work_hours')), 'thisweekstotalworkinghours']],
        group:['empprojects.e_id','empprojects.project_id']
    }).then( result => {
        //console.log(result[1].work_hours);
        
        callback(result);
    });
}
updateempProjects = function(request, callback) {
    //console.log("*******************");
    //console.log(request[0].work_hours);
    //console.log("*******************");
    let flag=false;
    for(let i=0;i<7;i++){
        models.empprojects.findAll({
            where:{
                e_id:request[i].e_id,
                date:request[i].date
            },
            attributes:['e_id','date',[sequelize.fn('sum', sequelize.col('work_hours')), 'total_hours']],
            group:['e_id','date'],
            raw:true

        }).then(result => {
            console.log("i="+i);
            if(result[0].total_hours >8){
                flag=true;
                //break;
            } 
            console.log("*******************");
        })
   
    }// end of for loop
    if(flag === false){
        models.empprojects.bulkCreate(request, { updateOnDuplicate: ["work_hours"] }).
        then(result =>callback(result));
    }
    else{
        let message="work_hours exceeded";
        callback(message);
    }
    
}


findcurrentschedule= function(request,callback){
    models.empprojects.findAll({
        where:{
            e_id:request.e_id,
            project_id:request.project_id,
            date:{[Op.between]:[request.start_date,request.end_date]}
        }
    }).then(result => callback(result));
    
}

module.exports.init = init;

module.exports.getEmpProject=getEmpProject;
module.exports.getEmployees = getEmployees;
module.exports.getEmployeeById = getEmployeeById;
module.exports.editEmployee = editEmployee;
module.exports.updateEmployee = updateEmployee; 
module.exports.createEmployee = createEmployee;
module.exports.getEmployeeByPodId= getEmployeeByPodId;
module.exports.getSkillOfEmployee = getSkillOfEmployee;
module.exports.getpod = getpod;
module.exports.getpodById = getpodById;
module.exports.editPod = editPod;
module.exports.updatepod = updatepod; 
module.exports.createpod = createpod;
module.exports.getclients=getclients;
module.exports.getprojectsBycustomerName=getprojectsBycustomerName;
<<<<<<< HEAD
module.exports.addEmp=addEmp;
=======
module.exports.updateempProjects=updateempProjects;
module.exports.findcurrentschedule=findcurrentschedule;
>>>>>>> 150e91de8d8e522d0f46aa989cd4ac111e3656ff
