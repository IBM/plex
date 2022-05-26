/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('Plex test page', () => {
  it('should load the basic test page', () => {
    cy.visit('/index.html', { timeout: 10000 });

    cy.wait(5000);

    // Take a snapshot for visual diffing
    cy.percySnapshot('test | basic');
  });
});
