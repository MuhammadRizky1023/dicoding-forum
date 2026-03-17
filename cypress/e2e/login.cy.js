describe('Login Flow', () => {

it('should display login page correctly', () => {
cy.visit('http://localhost:3000/login');


cy.contains('Halaman Login');

cy.get('input[placeholder="Email"]').should('be.visible');
cy.get('input[placeholder="Password"]').should('be.visible');

cy.get('button[type="submit"]').should('be.visible');

});

it('should show error when login with wrong email credentials', () => {
cy.visit('http://localhost:3000/login');

cy.get('input[placeholder="Email"]').type('wrong@mail.com');
cy.get('input[placeholder="Password"]').type('meat_01');
cy.get('button[type="submit"]').click();
cy.url().should('include', '/login');
});

it('should show error when login with wrong password credentials', () => {
cy.visit('http://localhost:3000/login');

cy.get('input[placeholder="Email"]').type('ishowmeat@gmail.com');
cy.get('input[placeholder="Password"]').type('wrong_01');
cy.get('button[type="submit"]').click();
cy.url().should('include', '/login');
});

it('should login successfully', () => {
cy.visit('http://localhost:3000/login');

cy.get('input[placeholder="Email"]').type('ishowmeat@gmail.com');

cy.get('input[placeholder="Password"]').type('meat_01');

cy.get('button[type="submit"]').click();

cy.url({ timeout: 10000 }).should('include', '/profile');

});

});
