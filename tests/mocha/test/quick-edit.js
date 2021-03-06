describe('Quick edit', function() {

    var server = require('../env').server()
    before(function () {
        require('../login-as').admin(this)
    })

    it('should work for posts', function() {
        casper.then(function() {
            this.clickLabel('All Posts', '*[@id="menu-posts"]/*//a')
        })
        casper.then(function() {
            '#post-1'.should.be.inDOM
            this.click('#post-1 .editinline')
        })
        casper.waitForSelector('form#posts-filter input[name="post_title"]', function() {
            this.fill('form#posts-filter', {
                'post_title': 'Hello world!'
            })
            this.click('#edit-1 .save')
        })
        casper.waitWhileSelector('#edit-1', function() {
            'Hello world!'.should.be.textInDOM
        })
    })

    it('should preserve test data: questions and etc.', function() {
        casper.then(function() {
            this.clickLabel('All Tests', '*[@id="menu-posts-wpt_test"]/*//a')
        })
        casper.then(function() {
            var testId = casper.evaluate(function() {
                return jQuery('.row-title:contains("To Be or Not to Be?")')
                    .closest('tr')
                    .find('input[name="post[]"]')
                    .val()
            })
            this.click('#post-' + testId + ' .editinline')
            this.waitForSelector('form#posts-filter input[name="post_title"]', function() {
                this.fill('form#posts-filter', {
                    'post_title': 'To Be or Not to Be?!'
                })
                this.click('#edit-' + testId + ' .save')
            })
            this.waitForSelectorTextChange('#post-' + testId, function() {
                'To Be or Not to Be?!'.should.be.textInDOM
                this.clickLabel('To Be or Not to Be?!', 'a')
            })
        })
        casper.then(function() {
            'wpt_question_title_0.value'.should.evaluate.to.be.equal('Not to Be???')
        })
    })
})
