describe('AdSet - Testes de Inclusão de Veículo', () => {
    const email = Cypress.env('email');
    const senha = Cypress.env('senha');
    const placaDuplicada = 'ABC1D23';

    beforeEach(() => {
        cy.visit('https://www.adset.com.br/Integrador/');
        cy.login(email, senha);
        cy.url({ timeout: 10000 }).should('eq', 'https://www.adset.com.br/Integrador/Home/Principal');
    });

    const preencherFormularioVeiculo = () => {
        cy.get('i.s16.icomoon-icon-car').should('be.visible').click();
        cy.get('span.txt').contains('Incluir').click();
        cy.get('#MarcaVeiculoId').select('AUDI', { force: true });
        cy.get('#ModeloVeiculoId').select('100', { force: true });
        cy.get('#AnoFabricacao').select('1995', { force: true });
        cy.get('#AnoModelo').select('1995', { force: true });
        cy.get('#CorVeiculo').select('Amarelo', { force: true });
        cy.get('#VersaoVeiculoId').select('2.2 S-4 AVANT TURBO GASOLINA 4P MANUAL', { force: true });
        cy.get('#CombustivelVeiculo').select('Gasolina', { force: true });
        cy.get('#TransmissaoVeiculo').select('Automático', { force: true });
        cy.get('#Placa').type(placaDuplicada);
        cy.get('#Chassi').type('12345678901234567');
        cy.get('#Valor').type('10000');

    };

    it('Cadastro de veículo com dados obrigatórios.', () => {
        preencherFormularioVeiculo();
        cy.get('button[type="submit"]').click();
        //cy.get('.success-message').should('be.visible').and('contain', 'Veículo cadastrado com sucesso');
    });

    it('Tentativa de inclusão sem preencher campos obrigatórios', () => {
        cy.get('i.s16.icomoon-icon-car').should('be.visible').click();
        cy.get('span.txt').contains('Incluir').click();
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('.validation-summary-errors').should('be.visible').and('contain', 'Placa do Veículo : Preenchimento obrigatório.');
        cy.get('.validation-summary-errors').should('be.visible').and('contain', 'Modelo do Veículo: Preenchimento obrigatório.');
    });

    it('Inserção de valores inválidos nos campos numéricos', () => {
        cy.get('i.s16.icomoon-icon-car').should('be.visible').click();
        cy.get('span.txt').contains('Incluir').click();
        cy.get('#Km').type('abc');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('.validation-summary-errors').should('be.visible').and('contain', "O valor 'abc' não é válido para Quilometragem.");
    });

    it('Tentativa de cadastro com placa duplicada', () => {
        preencherFormularioVeiculo();
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('.validation-summary-errors').should('be.visible').and('contain', 'Placa já cadastrada');
    });
});
