import  express  from "express";
import cors from 'cors'
import path from 'path';
import { adminRouter } from "./Routes/AdminRoute.js";
const app=express()
const _dirname=path.dirname("")
const buildpath=path.join(_dirname,"../employeeDB/dist");
app.use(express.static(buildpath))
app.get("/*",function(req,res){
    res.sendFile(
        path.join(_dirname,"../employeeDB/dist/index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    );
})
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use('/auth',adminRouter)
app.listen(3000,()=>{
    console.log("sever running")
}) 