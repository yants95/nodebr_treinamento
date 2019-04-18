const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'A mira'
}

let MOCK_ID = ''
describe('Suíte de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('GET /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('GET /heroes com filtro listando somente 3 registros', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('GET /heroes com filtro retornando erro de limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEE'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query",
                "keys": ["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })

    it('GET /heroes com filtro listando um item', async () => {
        const NAME = MOCK_HEROI_INICIAL.nome

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })

    it('POST /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Herói cadastrado com sucesso!")
    })

    it('PATCH /heroes/:id', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Super mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Herói atualizado com sucesso!')
    })

    it('PATCH /heroes/:id - não deve atualizar com ID incorreto', async () => {
        const _id = `5c688a463d12a20eab765359`

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify({
                poder: 'Super mira'
            })
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Não encontrado no banco'
        }

        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('DELETE /heroes/:id', async () => {
        const id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)   
        assert.deepEqual(dados.message, 'Herói removido com sucesso!')
    })

    it('DELETE /heroes/:id - nao deve remover', async () => {
        const id = '5c688a463d12a20eab765359'
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Não encontrado no banco'
        }

        assert.ok(statusCode === 412)   
        assert.deepEqual(dados, expected)
    })

    it('DELETE /heroes/:id - nao deve remover com id invalido', async () => {
        const id = 'ID_INVALIDO'
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        }

        assert.ok(statusCode === 500)   
        assert.deepEqual(dados, expected)
    })
})