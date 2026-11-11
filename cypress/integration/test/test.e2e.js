/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('Plex test page', () => {
  beforeEach(() => {
    cy.visit('/index.html', { timeout: 10000 });
  });

  it('should render the page heading', () => {
    cy.get('h1').should('be.visible').and('have.text', 'IBM Plex');
  });

  it('should list every Plex family in the family selector', () => {
    cy.get('#plex-family option').should('have.length.greaterThan', 1);
    cy.get('#plex-family option[value="IBM Plex Sans"]').should('exist');
    cy.get('#plex-family option[value="IBM Plex Mono"]').should('exist');
  });

  it('should apply IBM Plex Sans to the body', () => {
    cy.get('body').should('have.css', 'font-family').and('include', 'IBM Plex Sans');
  });

  it('should load an IBM Plex Sans font file', () => {
    cy.document().then((doc) =>
      cy.wrap(doc.fonts.ready).then(() => {
        const loaded = Array.from(doc.fonts).filter(
          (face) =>
            face.family.replace(/["']/g, '') === 'IBM Plex Sans' &&
            face.status === 'loaded'
        );
        expect(loaded, 'loaded IBM Plex Sans faces').to.have.length.greaterThan(0);
      })
    );
  });
});
