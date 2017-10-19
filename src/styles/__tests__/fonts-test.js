'use strict';

const path = require('path');
const sass = require('node-sass');
const families = require('../../families');

describe('fonts', () => {
  it('should compile the _fonts.scss partial', done => {
    const file = path.resolve(__dirname, '../_fonts.scss');
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

  families.forEach(family => {
    const file = path.resolve(
      __dirname,
      '../',
      family.type.toLowerCase(),
      '_index.scss'
    );

    it(`should compile the sass partial for font-family: ${family.type}`, done => {
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
});
