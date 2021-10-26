module.exports=function(app,sql){
    app.post("/timecard", function(request,response){
        console.log(request.body)
        sql.updateempProjects(request.body,function(result){
            //console.log(result);
            response.send(result);
    });
});

    app.get("/remaininghours/:e_id",function(request,response){

        console.log(request.params);
        sql.findRemHours(request.params,function(result){
            response.send(result)
        })
    });

    app.get("/currentschedule/:e_id/:project_id/:start_date/:end_date",function(request,response){

        console.log(request);
        sql.findcurrentschedule(request.params,function(result){
            response.send(result);

        });
        //sql.findRemHours(request.params.e_id)
    });
}
