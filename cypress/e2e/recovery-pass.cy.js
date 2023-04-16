
import fpPage from '../support/pages/views/forgot-pass'
import rpPage from '../support/pages/views/reset-pass'
import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

describe('esqueci minha senha', () => {

    it('deve poder solicitar o resgate de senha', () => {

        const user = {
            name: 'Renata teste',
            email: 'renatateste@gmail.com',
            password: '123456',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        fpPage.noticeShouldBe(message)
    })

    context('quando o usuário solicita resgate de senha', () => {

        const user = {
            name: 'Rezinha',
            email: 'rezinha@yahoo.com',
            password: '102030',
            is_shaver: false
        }

        beforeEach(()=> {
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
        })

        it('deve poder cadastrar uma nova senha', () => {
            rpPage.go(Cypress.env('passToken'))
            rpPage.submit('abc123', 'abc123')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.noticeShouldBe(message)
        })

        afterEach(()=> {
            cy.submitLogin(user.email, 'abc123')
            cy.userShouldBeLoggedIn(user.name)
        })
    })

})