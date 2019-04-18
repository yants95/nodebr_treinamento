const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-i, --id [value]', "ID do herói")
        .option('-c, --cadastrar', "Cadastrar um herói")
        .option('-l, --listar', "Listar um herói")
        .option('-r, --remover', "Remove um herói pelo id")
        .option('-a, --atualizar [value]', "Atualizar um herói pelo id")
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Herói não foi cadastrado')
                return;
            }

            console.log('Herói cadastrado com sucesso!')
        }

        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.error('Não foi possível remover o herói')
                return;
            }

            console.log('Herói removido com sucesso!')
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if (!resultado) {
                console.error('Não foi possível atualizar o herói')
                return;
            }

            console.log('Herói atualizado com sucesso!')
        }
    } catch (error) {
        console.error(error)
    }
}

main()