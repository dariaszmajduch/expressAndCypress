describe('My First Test', () => {
    it('Visit localhost', () => {
        cy.visit('http://localhost:3000');
        cy.get('div > h3')
    });
});
