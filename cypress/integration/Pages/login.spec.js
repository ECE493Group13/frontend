describe('Login Page', () => {
    const url = 'http://localhost:3000';

    beforeEach(() => {
        cy.visit(url)
    })

    it('it should have "Data Mining System" title', () => {
        cy.contains('Data Mining System')
    })

    it('it has a double input form container', () => {
        cy.get('form').parent().should('have.class', 'dms-double-input-form-container')
    })

    it('has a username input with placeholder "Username"', () => {
        cy.get("[type='text']").should('have.attr', 'placeholder', 'Username')
    })

    it('has a password input with placeholder "Password"', () => {
        cy.get("[type='password']").should('have.attr', 'placeholder', 'Password')
    })

    it('accepts username input', () => {
        const input = "test_username"
        cy.get('#input1')
            .type(input)
            .should('have.value', input)
    })
    
    it('accepts password input', () => {
        const input = "test_password"
        cy.get('#input2')
            .type(input)
            .should('have.value', input)
    })

    it('it has a "Log in" button', () => {
        cy.get('form').find('button').should('have.text', 'Log in')
    })

    it('it has a "No account? Get started here" clickable text', () => {
        cy.contains('No account? Get started here').invoke('css', 'cursor').should('equal', 'pointer')
    })

    it('gets login data from api', () => {  
        const baseUrl = 'http://localhost:4433/auth/login'
        let username = 'example'
        let password = 'password'
        cy.request(baseUrl, JSON.stringify({
            "username": username,
            "password": password
        }))
        .then((response) => {
            expect(response.body).to.have.property('token')
            expect(response.body).to.have.property('is_temp_password')
        })
    })
})
