describe('Questions', function() {

    var server = require('../env').server()
    before(function () {
        require('../login-as').admin(this)
    })

    it('should be added to new test', function() {
        casper.then(function() {
            this.clickLabel('Add New', '*[@id="menu-posts-wpt_test"]/*//a')
        })

        casper.then(function() {
            'Fatal'.should.not.be.textInDOM
            'Add New Test'.should.be.inTitle

            this.click('#wpt_question_add');
            this.click('#wpt_question_add');
            this.click('#wpt_question_add');
            this.click('#wpt_question_add');
            this.click('#wpt_question_add');
            this.click('#wpt_question_add');
            this.fillSelectors('form#post', {
                '#title'                : 'To Be or Not to Be?',
                '#wpt_question_title_0' : 'To Be?',
                '#wpt_question_title_5' : 'Not to Be?'
            })
            this.click('#publish')
        })

        casper.waitWhileSelector('form#post.wpt-ajax-save').waitForUrl(/message/, function() {
            'Fatal'.should.not.be.textInDOM
            '#message'.should.be.inDOM
            'wpt_question_title_0.value'.should.evaluate.to.be.equal('To Be?')
            'wpt_question_title_1.value'.should.evaluate.to.be.equal('Not to Be?')
            'typeof wpt_question_title_2'.should.evaluate.to.be.equal('undefined')
        })
    })

    it('should be removed and updated in test', function() {
        casper.then(function() {
            this.clickLabel('All Tests', '*[@id="menu-posts-wpt_test"]/*//a')
        })

        casper.then(function() {
            this.clickLabel('To Be or Not to Be?', 'a')
        })

        casper.then(function() {
            this.clickLabel(' Lie', 'label')

            this.click('#wpt_question_add');
            this.fillSelectors('form#post', {
                '#wpt_question_title_0' : '',
                '#wpt_question_title_1' : 'Not to Be???',
                '#wpt_question_title_2' : 'But Why?'
            })
            this.fill('form#post', {}, true)
        })

        casper.waitWhileSelector('form#post.wpt-ajax-save').waitForUrl(/message/, function() {
            'Fatal'.should.not.be.textInDOM
            '#message'.should.be.inDOM
            'wpt_question_title_0.value'.should.evaluate.to.be.equal('Not to Be???')
            'wpt_question_title_1.value'.should.evaluate.to.be.equal('But Why?')
            'typeof wpt_question_title_2'.should.evaluate.to.be.equal('undefined')
        })
    })

    it('should be added from quick fill', function() {
        casper.then(function() {
            this.clickLabel('All Tests', '*[@id="menu-posts-wpt_test"]/*//a')
        })

        casper.then(function() {
            this.clickLabel('To Be or Not to Be?', 'a')
        })

        casper.then(function() {
            this.clickLabel('Quick Fill From Text', 'a')
            this.fillSelectors('form#post', {
                '[ng-controller="EditQuickFillController"] textarea': '1. Cool. \n2. "Quick"\n3. Question\n'
            })
            this.clickLabel('Quick Fill From Text', 'button')
            this.fill('form#post', {}, true)
        })

        casper.waitWhileSelector('form#post.wpt-ajax-save').waitForUrl(/message/, function() {
            'Fatal'.should.not.be.textInDOM
            '#message'.should.be.inDOM
            'wpt_question_title_2.value'.should.evaluate.to.be.equal('Cool.')
            'wpt_question_title_3.value'.should.evaluate.to.be.equal('"Quick"')
            'wpt_question_title_4.value'.should.evaluate.to.be.equal('Question')
            'typeof wpt_question_title_5'.should.evaluate.to.be.equal('undefined')
        })
    })

    it('should be then shown in test', function() {
        casper.evaluate(function() {
            document.location = jQuery('#view-post-btn a,#post-preview').attr('href')
        })

        casper.waitForUrl(/not/, function() {
            'Fatal'.should.not.be.textInDOM
            '“Quick”'.should.be.textInDOM
            '.wpt_test.fill_form'.should.be.inDOM
            'document.querySelectorAll(".wpt_test.fill_form .question").length'.should.evaluate.to.equal(5)
        })
    })

    it('should be in non-final test', function() {
        casper.then(function() {
            'Test is under construction'.should.be.textInDOM
            'form.wpt_test_form input[type=submit]'.should.not.be.inDOM
        })
    })
})
