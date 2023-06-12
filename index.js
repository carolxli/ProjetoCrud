import express from "express";
import rotaInteressado from "./Rota/RotaInteressado.js";

const porta = 4003;
const hostname = "localhost"; 
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.static("./Frontend"));
app.use(express.json());
app.use('/interessado', rotaInteressado);
app.listen(porta, hostname, ()=>{
    console.log("Backend respondendo em http://"+hostname + ":" + porta); 
});