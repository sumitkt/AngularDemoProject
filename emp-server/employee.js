module.exports = function(app,sql) {
    app.get("/employee", function(request,response){
        sql.getEmployees(function(result){
            response.send(result);
            console.log(result);
        })
    });
 
    app.get("/employee/:e_id", function(request,response){
        sql.getEmployeeById({e_id: request.params.e_id}, function(emp){
            response.send(emp);
        })
    });

    app.get("/edit/:e_id", function(request,response){
        sql.editEmployee({e_id: request.params.e_id}, function(emp){
            response.send(emp);
        })
    });

    app.put("/edit", function(request,response){
        sql.updateEmployee(request.body, function(result){
            response.send(result);
        });
    });


    app.post("/edit", function(request,response){
        sql.createEmployee(request.body, function(result){
            response.send(result);
        });
    });

    // addition of new functions

    app.get("/employeein/:pod_id", function(request,response){
        console.log(request.params.pod_id);
        sql.getEmployeeByPodId({pod_id:request.params.pod_id},function(result){
            response.send(result);
        });
    });

    app.get("/skill/:e_id",function(request,response){
        sql.getSkillOfEmployee({e_id: request.params.e_id},function(result){
            response.send(result);
        })
    })





   
};