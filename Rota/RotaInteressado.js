import { Router } from "express";
import InteressadoCtrl from "../Controle/InteressadoCtrl.js";

const rotaInteressado = new Router();
const interCtrl = new InteressadoCtrl();
rotaInteressado.post("/",interCtrl.gravar).patch("/",interCtrl.atualizar).delete("/:cpf",interCtrl.excluir).get("/",interCtrl.consultar).get("/:novoNome",interCtrl.consultar);
export default rotaInteressado;