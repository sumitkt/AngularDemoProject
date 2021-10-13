const express = require("express");
const cors = require("cors");
const sql = require("./sql.js");


const app = express();

var corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:4000"]
}

app.use(cors(corsOptions)); 
app.use(express.json());

app.listen(8000, () => {
    console.log("Server is started and listening");
    sql.init();
});

app.get("/", function(request, response){
    response.send("Hello node js!!");

});
require("./pod.js")(app,sql);
require("./employee.js")(app, sql);
require("./client.js")(app,sql);
