import InteressadoDAO from "../Persistencia/InteressadoDAO.js";
export default class Interessado {
    #cpf
    #rg
    #nome
    #dataNasc
    #interesse

    constructor(cpf=0, rg=0, nome="Nao consta", dataNasc=0, interesse="Nao consta") {
        this.#cpf = cpf;
        this.#rg = rg;
        this.#nome = nome;
        this.#dataNasc = dataNasc;
        this.#interesse = interesse;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get rg() {
        return this.#rg;
    }
    set rg(novoRg) {
        this.#rg = novoRg;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get dataNasc() {
        return this.#dataNasc;
    }
    set dataNasc(novaDataNasc) {
        this.#dataNasc = novaDataNasc;
    }

    get interesse() {
        return this.#interesse;
    }
    set interesse(novoInteresse) {
        this.#interesse = novoInteresse;
    }

    toJSON() {
        return {
            cpf: this.#cpf,
            rg: this.#rg,
            nome: this.#nome,
            dataNasc: this.#dataNasc,
            interesse: this.#interesse
        }
    }

    async gravar() {
        const interDAO = new InteressadoDAO();
        await interDAO.gravar(this);
    };
    async atualizar() {
        const interDAO = new InteressadoDAO();
        await interDAO.atualizar(this);
    };
    async excluir() {
        const interDAO = new InteressadoDAO();
        await interDAO.excluir(this);
    };
    async consultarCpf(cpf) {
        const interDAO = new InteressadoDAO();
        const interessados = await interDAO.consultarCpf(cpf);
        return interessados;
    };
    async consultarNome(novoNome) {
        const interDAO = new InteressadoDAO();
        const interessados = await interDAO.consultarNome(novoNome);
        return interessados;
    };
}




