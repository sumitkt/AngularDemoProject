module.exports = function(app,sql) {
    app.get("/pod", function(request,response){
    //    console.log(request);
        sql.getpod(function(result){
            // console.log(result);
            response.send(result);
        })
    });

    
    app.get("/pod/:p_id", function(request,response){
        sql.getpodById({p_id: request.params.p_id}, function(emp){
            response.send(emp);
        })
    });

    app.get("/editpod/:p_id", function(request,response){
        // console.log(request.params);
        sql.editPod({pod_id: request.params.p_id}, function(emp){
            response.send(emp);
        });
    });

    app.put("/editpod", function(request,response){
        console.log("**************************");
        console.log(request.body);
        console.log("**************************");
        sql.updatepod(request.body, function(result){
            response.send(result);
        });
    });


    app.post("/editpod", function(request,response){
        sql.createpod(request.body, function(result){
            response.send(result);
        });
    });





   
};