/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        describe('Checking RSS Feed links', function () {
            allFeeds.forEach(function (rss, index) {
                it(`=> link #${(index + 1)}`, function () {
                    expect(rss.url).toBeDefined();
                    expect(rss.url).not.toEqual('');
                });
            });
        });


        /* in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        describe('Check RSS Feed names', function () {
            allFeeds.forEach(function (rss, index) {
                it(`=> name #${(index + 1)}`, function () {
                    expect(rss.name).toBeDefined();
                    expect(rss.name).not.toEqual('');
                });
            });
        });
    });


    /* The menu test */
    describe('The menu', function () {
        const isOpen = () => $('body').hasClass('menu-hidden');
        const clickOnMenu = () => { $('.menu-icon-link').trigger( "click" ); };

        /* test that ensures the menu element is
         * hidden by default.
         */
        it('hiden menu by default', function () {
            expect(isOpen()).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked
         * and close after another click.
         */
        it('does the menu display when clicked', function () {
            clickOnMenu();
            expect(isOpen()).not.toBe(true);
        });
        it('does it hide when clicked again', function () {
            clickOnMenu();
            expect(isOpen()).toBe(true);
        });
    });


    /* test that check if there is any initial entries" */
    describe('Initial Entries', function () {

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single entry element within the .feed container.
         */
        beforeAll(function (done) {
            loadFeed(0, done);
        });

        it('recieved inital elements', function () {
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });

    /* test that check if there is changable rss feed */
    describe('New Feed Selection', function () {
        let feedInfo;

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeAll(function (done) {
            feedInfo = $('.feed').html();
            loadFeed(1, done);
        });

        it('changing feed', function () {
            expect($('.feed').html()).not.toEqual(feedInfo);
        })
    });
}());
