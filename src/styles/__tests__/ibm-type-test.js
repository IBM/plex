'use strict';

const path = require('path');
const sass = require('node-sass');

const file = path.resolve(__dirname, '../ibm-type.scss');

describe('ibm-type', () => {
  it('should compile', done => {
    sass.render(
      {
        file,
      },
      (error, result) => {
        if (error) {
          done.fail(error);
          return;
        }

        expect(result.css.toString()).toMatchSnapshot();
        done();
      }
    );
  });
});
