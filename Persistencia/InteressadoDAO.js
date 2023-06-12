import Interessado from "../Modelo/Interessado.js";
import Conexao from "./Conexao.js";
export default class InteressadoDAO {
    async gravar(interessado) {
        if (interessado instanceof Interessado) {
            const conexao = await Conexao();
            const sql = "INSERT INTO interessado(cpf,rg,nome,dataNasc,interesse) VALUES(?,?,?,?,?)";
            const parametros = [interessado.cpf, interessado.rg, interessado.nome, interessado.dataNasc, interessado.interesse];
            await conexao.query(sql, parametros);
        }
    }
    async atualizar(interessado) {
        if (interessado instanceof Interessado) {
            const conexao = await Conexao();
            const sql = "UPDATE interessado SET rg=?,nome=?,dataNasc=?,interesse=? WHERE cpf=?";
            const parametros = [interessado.rg, interessado.nome, interessado.dataNasc, interessado.interesse, interessado.cpf];
            await conexao.query(sql, parametros);
        }
    }
    async excluir(interessado) {
        if (interessado instanceof Interessado) {
            const conexao = await Conexao();
            const sql = "DELETE FROM interessado WHERE cpf=?";
            const parametros = [interessado.cpf];
            await conexao.query(sql, parametros);
        }
    }
    async consultarCpf(cpf) {
        const conexao = await Conexao();
        const sql = "SELECT * FROM interessado WHERE cpf=?";
        const parametros = [cpf]
        const [rows] = await conexao.query(sql, parametros);
        const listaInter = [];
        for (const row of rows) {
            const interessado = new Interessado(row['cpf'], row['rg'], row['nome'], row['dataNasc'], row['interesse']);
            listaInter.push(interessado);
        }
        return listaInter;
    }
    async consultarNome(novoNome) {
        const conexao = await Conexao();
        const sql = "SELECT * FROM interessado WHERE nome LIKE ?";
        const parametros = ['%' + novoNome + '%']
        const [rows] = await conexao.query(sql, parametros);
        const listaInter = [];
        for (const row of rows) {
            const interessado = new Interessado(row['cpf'], row['rg'], row['nome'], row['dataNasc'], row['interesse']);
            listaInter.push(interessado);
        }
        return listaInter;
    }
}