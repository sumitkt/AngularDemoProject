module.exports=function(app,sql){
    app.post("/timecard", function(request,response){
        console.log(request.body)
        sql.updateempProjects(request.body,function(result){
            console.log(result);
            response.send(result);
    });
});
}
