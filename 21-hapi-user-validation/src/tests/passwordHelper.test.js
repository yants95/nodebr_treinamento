const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'yan@32123123'
const HASH = '$2b$04$yG6XxwnFuR3QuccUDyyKouproNmUlU9YwoC1P5vfs7nXVZLld3O5e'

describe('User Helper Test Suit', function () {
    it('Deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        
        assert.ok(result.length > 10)
    })

    it('Deve validar a senha', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        assert.ok(result, true)
    })
})