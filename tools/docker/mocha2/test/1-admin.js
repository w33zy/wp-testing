require('chai').should();
const puppeteer = require('puppeteer-core'); // eslint-disable-line no-unused-vars
const _ = require('./_');

describe('Admin', () => {
  /** @type puppeteer.Page */
  let page;

  it('should disable visual editing', async function () { // eslint-disable-line func-names
    page = await _.adminPage();

    await Promise.all([
      page.goto('http://wpt.docker/wp-admin/profile.php'),
      page.waitForNavigation(),
    ]);

    const richEditDisabledSelector = 'input[name=rich_editing]:not(:checked)';
    if ((await page.$(richEditDisabledSelector)) == null) {
      this.skip();
    }

    await page.click(richEditDisabledSelector);

    await Promise.all([
      page.click('#submit'),
      page.waitForNavigation(),
      page.waitForResponse((response) => response.url().includes('updated')),
    ]);
  });

  describe('Create default user in subscriber role', () => {
    let isExists = false;

    it('should check if user exists already', async () => {
      await Promise.all([
        page.goto('http://wpt.docker/wp-admin/users.php'),
        page.waitForNavigation(),
      ]);

      isExists = (await page.$eval('body', (body) => body.innerText)).includes('user@wpti.dev');
    });

    it('should fill new user form', async function () { // eslint-disable-line func-names
      if (isExists) {
        this.skip();
      }
      await Promise.all([
        page.goto('http://wpt.docker/wp-admin/user-new.php'),
        page.waitForNavigation(),
      ]);

      await page.evaluate(() => {
        /* eslint-disable no-undef */
        user_login.value = 'user';
        email.value = 'user@wpti.dev';
        pass1.value = 'Fx2T8fGG7WPQ2vV';
        pass1.setAttribute('data-pw', pass1.value);
        const pass1Text = document.querySelector('#pass1-text');
        if (pass1Text !== null) {
          pass1Text.value = pass1.value;
        }
        pass2.value = pass1.value;
        if (typeof noconfirmation !== 'undefined') {
          noconfirmation.checked = true;
        }
        /* eslint-enable no-undef */
      });
    });

    it('should submit form and check that user added', async function () { // eslint-disable-line func-names
      if (isExists) {
        this.skip();
      }

      await Promise.all([
        page.click('input[type=submit]'),
        page.waitForNavigation(),
        page.waitForResponse((response) => response.url().includes('update')),
      ]);

      (await page.$eval('body', (body) => body.innerText)).should.contains('user@wpti.dev');
    });
  });
});
