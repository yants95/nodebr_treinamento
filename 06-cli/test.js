const { deepEqual, ok } = require('assert')
const Database = require('./Database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Suíte de manipulação de heróis', () => {
    before(async () => {
        await Database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    
    it('Deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await Database.listar(expected.id)

        deepEqual(resultado, expected)
    })

    it('Deve cadastrar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await Database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [atual] = await Database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(atual, expected)
    })

    it('Deve remover um herói por id', async () => {
        const expected = true
        const resultado = await Database.remover(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(resultado, expected)
    })

    it('Deve atalizar um herói pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: "Batman",
            poder: "Dinheiro"
        }

        await Database.atualizar(expected.id, {
            nome: expected.nome,
            poder: expected.poder,
          });

        const [realResult] = await Database.listar(expected.id);

        deepEqual(realResult, expected)
    })
})