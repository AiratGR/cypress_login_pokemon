import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

    afterEach('Конец теста', function () {
        cy.get('#messageHeader').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
       });

    it('Верный пароль и верный логин', function () {
         cy.visit('/');

         cy.get('#mail').type(data.login);
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();

         cy.get('#messageHeader').contains('Авторизация прошла успешно');
     })
 
     it('Восстановление пароля', function () {
        cy.visit('/');
        
        cy.get('#forgotEmailButton').click();

        cy.get('#mailForgot').type('Cashy@rambler.ru');
        cy.get('#restoreEmailButton').click();

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
    })

    it('Неверный пароль и верный логин', function () {
        cy.visit('/');

        cy.get('#mail').type(data.login);
        cy.get('#pass').type('iLoveqastudio7');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })

    it('Верный пароль и неверный логин', function () {
        cy.visit('/');

        cy.get('#mail').type('german_dolnikov@mail.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })

    it('Верный пароль и логин без @', function () {
        cy.visit('/');

        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
    })

    it('Приведение прописных букв к строчным в поле логин', function () {
        cy.visit('/');

        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })
 })
 
 