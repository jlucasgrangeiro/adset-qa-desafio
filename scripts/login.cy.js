describe('AdSet - Teste de Login', () => {
  beforeEach(() => {
    cy.visit('https://www.adset.com.br/Integrador/');
  });

  it('Realizar login com credenciais válidas e acessar a página inicial', () => {
    const email = Cypress.env('email');
    const senha = Cypress.env('senha');

    cy.login(email, senha);

    cy.url({ timeout: 10000 }).should('eq', 'https://www.adset.com.br/Integrador/Home/Principal');

  });
});