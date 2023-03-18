import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submeto o formulário', () => {
        it('deve logar com sucesso', () => {
            const user = {
                name: 'Renata',
                email: 'renatamachadodutra@gmail.com',
                password: '102030'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'Renata',
                email: 'renatamachadodutra@gmail.com',
                password: '102036'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Renata',
                email: 'renatamachado@gmail.com',
                password: '102030'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

        })
    })

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345',

        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('renatamachadodutra@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })
    })

    context('email no formato incorreto', () => {

        const emails = [
            'renata&gmail.com',
            'renata.com',
            '@renata.com',
            '@',
            'renata@',
            '123445',
            '@#$%@',
            'xpto123@'

        ]

        emails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, '102030')
                loginPage.alertShouldBe('Informe um email válido')

            })
        })
    })
})