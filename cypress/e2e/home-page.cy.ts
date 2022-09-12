describe('Homepage', () => {
  let newPost: { title: string; post: string; user: string };

  it('Initial page', () => {
    cy.visit('/');
    cy.get('mat-spinner').should('exist');
    cy.contains("Today's posts");
    cy.get('app-button-link').contains('reset posts').should('have.class', 'mat-warn');
    cy.contains(
      'Server data are not persistent, any change is keeping only in client state and will be lost after refresh page'
    );
    cy.wait(300);
    cy.get('snack-bar-container button.mat-button').contains('OK').click();
    cy.wait(1000);
    cy.contains(
      'Server data are not persistent, any change is keeping only in client state and will be lost after refresh page'
    ).should('not.exist');
  });

  before(() => {
    cy.fixture('new-post').then((data) => {
      newPost = data;
    });
  });

  it('Add new post', () => {
    cy.visit('/');
    cy.get('#addPost_top').contains('new post').click();
    cy.get('mat-form-field').contains('Title *'); // Required field
    cy.get('mat-form-field').contains('Choose an user *'); // Required field
    cy.get('app-button-link').contains('Cancel').click();
    cy.wait(300);

    cy.get('#addPost_bottom').contains('new post').click();
    cy.get('textarea[name="body"]').invoke('height').should('be.closeTo', 16, 5);
    cy.get('app-button-link').contains('Submit').should('be.disabled');
    fillNewPostForm();
    cy.get('textarea[name="body"]').invoke('height').should('be.closeTo', 47, 5);
    cy.get('app-button-link').contains('Submit').click();

    checkNewPostCreated();
  });

  before(() => {
    cy.fixture('new-post').then((data) => {
      newPost = data;
    });
  });

  it('Reset posts', () => {
    cy.visit('/');
    cy.get('#addPost_top').contains('new post').click();
    fillNewPostForm();
    cy.get('app-button-link').contains('Submit').click();

    checkNewPostCreated();

    cy.get('app-button-link').contains('reset posts').click();

    cy.wait(300);
    cy.get('app-card[ng-reflect-id="101"]').should('not.exist');
  });

  function fillNewPostForm() {
    cy.get('input[name="title"]').type(newPost.title);
    cy.get('textarea[name="body"]').type(newPost.post);
    cy.get('mat-select[data-name="userId"]').matSelect(newPost.user);
  }

  function checkNewPostCreated() {
    cy.wait(300);
    cy.contains('Successfully created');
    cy.get('app-card[ng-reflect-id="101"]').contains(newPost.title);
    cy.get('app-card[ng-reflect-id="101"]').contains(newPost.post);
    cy.get('app-card[ng-reflect-id="101"]').contains(newPost.user);
  }
});
