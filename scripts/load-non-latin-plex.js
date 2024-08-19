/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import loadNonLatinPlex from '@carbon/ibmdotcom-utilities/es/utilities/loadNonLatinPlex/loadNonLatinPlex';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';

/**
 * Initializes the call to fetch the current locale then loads the utility
 *
 * @private
 */
function _init() {
  LocaleAPI.getLang().then(lang => {
    loadNonLatinPlex(lang.lc);
  });
}

// Runs the init function
document.addEventListener('DOMContentLoaded', () => {
  _init();
});
