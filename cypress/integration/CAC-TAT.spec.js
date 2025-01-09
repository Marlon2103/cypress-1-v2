/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
        cy.get('input[id="firstName"]').should('be.visible').type('Marlon').should('have.value', 'Marlon')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = ' Vamos criar um teste para executar na pipeline'
        cy.get('input[id="firstName"]').should('be.visible').type('Marlon').should('have.value', 'Marlon')
        cy.get('input[id="lastName"]').should('be.visible').type('Maciel').should('have.value', 'Maciel')
        cy.get('input[id="email"]').should('be.visible').type('marlonprogrammer@gmail.com').should('have.value', 'marlonprogrammer@gmail.com')
        cy.get('input[id="phone"]').should('be.visible').type('11966136589').should('have.value', '11966136589')
        cy.get('select[id="product"]').should('be.visible')
        cy.get('#email-checkbox').should('be.visible').click('bottom').should('be.checked')
        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 }).should('have.value', longText)
        cy.contains('button', 'Enviar').should('be.visible').click()
        cy.get('.success > strong').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('input[id="firstName"]').should('be.visible').type('Marlon').should('have.value', 'Marlon')
        cy.get('input[id="lastName"]').should('be.visible').type('Maciel').should('have.value', 'Maciel')
        cy.get('input[id="email"]').should('be.visible').type('marlonprogrammergmail,com').should('have.value', 'marlonprogrammergmail,com')
        cy.get('input[id="phone"]').should('be.visible').type('11966136589').should('have.value', '11966136589')
        cy.get('select[id="product"]').should('be.visible')
        cy.get('#email-checkbox').should('be.visible').click('bottom').should('be.checked')
        cy.get('#open-text-area').should('be.visible').type('test', { delay: 0 }).should('have.value', 'test')
        cy.contains('button', 'Enviar').should('be.visible').click()
        cy.get('.error > strong').should('be.visible')
    })
    it('se um valor não-numérico for digitado, seu valor continuará vazio', function () {
        cy.get('input[id="phone"]').should('be.visible').type('sdfsdfsdfs').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[id="firstName"]').should('be.visible').type('Marlon').should('have.value', 'Marlon')
        cy.get('input[id="lastName"]').should('be.visible').type('Maciel').should('have.value', 'Maciel')
        cy.get('input[id="email"]').should('be.visible').type('marlonprogrammer@gmail.com').should('have.value', 'marlonprogrammer@gmail.com')
        cy.get('input[id="phone"]').should('be.visible').type('sdfsdfdsfsdf').should('have.value', '')
        cy.get('select[id="product"]').should('be.visible')
        cy.get('input[type="checkbox"]').should('be.visible').check().should('be.checked')
        cy.get('#open-text-area').should('be.visible').type('test', { delay: 0 }).should('have.value', 'test')
        cy.contains('button', 'Enviar').should('be.visible').click()
        cy.get('.error > strong').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[id="firstName"]').should('be.visible').type('Marlon').should('have.value', 'Marlon').clear().should('have.value', '')
        cy.get('input[id="lastName"]').should('be.visible').type('Maciel').should('have.value', 'Maciel').clear().should('have.value', '')
        cy.get('input[id="email"]').should('be.visible').type('marlonprogrammer@gmail.com').should('have.value', 'marlonprogrammer@gmail.com').clear().should('have.value', '')
        cy.get('input[id="phone"]').should('be.visible').type('sdfsdfdsfsdf').should('have.value', '').clear().should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').should('be.visible').click()
        cy.get('.error > strong').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function () {
       cy.fillMandatoryFieldsAndSubmit()
       cy.get('.success > strong').should('be.visible')
    }) 
    it('Comandos Select', function () {
        cy.get('select').select('Blog') // Seleção pelo texto Blog
        cy.get('select').select('youtube') // Seleção pelo value youtube
        cy.get('select').select(1) // Seleção pelo índice 1
     }) 
     it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
     }) 
     it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
     }) 
     it('seleciona um produto (Blog) por seu índice',  () => {
       cy.get('#product').select(1).should('have.value','blog')
     })
     it('marca o tipo de atendimento "Feedback"',  () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
      })
      it('marca o tipo de atendimento',  () => {
        cy.get('input[type="radio"]')
        .each(typeOfService => { //each significa cada um
            cy.wrap(typeOfService) //wrap empacota
            .check()
            .should('be.checked')
        })
      })

      it('marca ambos checkboxes, depois desmarca o último',  () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked') // Verificar checkbox marcados e desmarcados
        
      })
    /*  it.only('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[id="file-upload"]')
    .selectFile('cypress-1-v2\cypress\fixtures\example.json')
        .should(input => {
           // expect (input[0].files[0].name).to.equal('example.json')
        })

      })  //Deu erro pois nao estava localizando o caminho relativo do arquivo */
     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank') //Verificar tag sem nescessidade de abrir nova aba por conta do Blank
     })
     it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target') //Invoke ele remove o atributo
        .click()

        cy.contains('h1','CAC TAT - Política de privacidade')
        .should('be.visible')
     })
    


})
