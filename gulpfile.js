/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

require('./gulp-tasks/build');
require('./gulp-tasks/clean');

process.once('SIGINT', () => {
  process.exit(0);
});
