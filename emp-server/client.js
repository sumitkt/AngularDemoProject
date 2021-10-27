module.exports = function(app,sql) {
    app.get("/client", function(request,response){
     console.log("****************");
        sql.getclients(function(result){
             console.log(result);
            response.send(result);
        })
    });

    app.get("/projectsof/:customerName", function(request,response){
        console.log(request.params.pod_id);
        sql.getprojectsBycustomerName({customer_name:request.params.customerName},function(result){
            response.send(result);
        });
    });

    app.get("/empproject/:project_id/:status",function(request, response){
        var a = parseInt(request.params.project_id);

        sql.getEmpProject({project_id:a,status:request.params.status},function(result){
            response.send(result);
        })
    });

    app.post("/addemp", function(request,response){
        sql.addEmp(request.body, function(result){
            response.send(result);
        });
    });

    app.post("/addproject", function(request,response){
        sql.addProject(request.body, function(result){
            response.send(result);
        });
    });

}