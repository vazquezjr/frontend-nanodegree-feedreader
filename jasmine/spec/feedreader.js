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

        // This block tests each feed to make sure that they have a valid url.
        it('have a valid URL', function() {

            // For each feed,
            for (var i = 0; i < allFeeds.length; i++) {

                // Check that each feed has a url defined and that it is not an empty string.
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


         // This block tests each feed to make sure that hey have a valid name.
         it('have a valid name', function() {

            // For each feed,
            for (var i = 0; i < allFeeds.length; i++) {

                // Check that each feed has a name defined and that it is not an empty string.
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });

    });


    // This test suite provides tests for menu functionality.
    describe('The menu', function() {

        // This block tests whether the slide-menu is hidden by default.
        it('is hidden by default', function() {

            // Grab all of the classes of the body tag.
            var classList = $('body').attr('class').split(/\s+/);

            // Assume that the slide-menu is not hidden by default.
            var isHidden = false;

            // For each class of the body tag.
            for (var i = 0; i < classList.length; i++)
                
                // If one the attributes of the body tag is 'menu-hidden',
                if (classList[i] === 'menu-hidden')

                    // Then the slide menu is hidden by default.
                    isHidden = true;

            // Check to see if the slide menu is hidden by default by checking the isHidden variable.
            expect(isHidden).toBe(true);

        });

        // This block checks to see if the slide-menu changes visibility when the hamburger button is clicked.
        it('changes visibility when the menu icon is clicked', function() {
            
            // Grab the tag the contains the hamburger button and click it.
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');

            // Grab the list of classes from the body tag.
            var classList = $('body').attr('class').split(/\s+/);

            // Assume that the slide-menu is not hidden by default.
            var isHidden = false;

            // For each class of the body tag.
            for (var i = 0; i < classList.length; i++)
                
                // If one the attributes of the body tag is 'menu-hidden',
                if (classList[i] === 'menu-hidden')

                    // Then the slide menu is hidden by default.
                    isHidden = true;

            // Check to see if the slide-menu is now visible.
            expect(isHidden).toBe(false);

            // Click the hamburger button again.
            menuIcon.trigger('click');

            // Grab the list of classes from the body tag.
            var classList = $('body').attr('class').split(/\s+/);

            // Assume that the slide-menu is not hidden by default.
            var isHidden = false;

            // For each class of the body tag.
            for (var i = 0; i < classList.length; i++)
                
                // If one the attributes of the body tag is 'menu-hidden',
                if (classList[i] === 'menu-hidden')

                    // Then the slide menu is hidden by default.
                    isHidden = true;

            // Check to see if the slide-menu is now hidden.
            expect(isHidden).toBe(true);
        });

    });

    // This test suite provides a test to see if the feeds are loaded.
    describe('Initial Entries', function() {

         // Before each test,
         beforeEach(function(done) {

            // Start loading the feed and start the test once the feed is completely loaded.
            loadFeed(0, function() {
                done();
            });
         });

         // This block checks to see if the feed is loaded,
         it('are loaded', function(done) {

            // Grab the list of all of the feeds currently loaded.
            var feeds = $('.entry');

            // Check to see if the feed has several entries loaded.
            expect(feeds.length).not.toBe(0);

            // Tell the test that we are done.
            done();
         });

    });

    // This test suite provides a test to chekc if we can change the source of the feeds to load new feeds.
    describe('New Feed Selection', function() {

        // Create two new variables to store the name of the initial feed source and the content of the initial feed.
        var blogContent;
        var blogHeader;

        // Before each test,
        beforeEach(function(done) {

            // Load a feed,
            loadFeed(1, function() {

                // Grab the feed source and the content of the feed,
                blogContent = $('.entry-link h2').html();
                blogHeader = $('.header .header-title').html();

                // Load a different feed and wait until this feed is loaded to start the test.
                loadFeed(3, function() {
                    done();
                });
            });
        });

         // This block checks to see if the feed contents change when a different feed is loaded.
         it('changes content', function(done) {

            // Check to see if the current content is different than the initially loaded content.
            expect($('.entry-link h2').html()).not.toBe(blogContent);

            // Check to see if the current feed source is different than the initial feed source.
            expect($('.header .header-title').html()).not.toBe(blogHeader);

            // Tell the test that we are done.
            done();
         });

         // After all of the tests are done, load the feed from the first feed source.
         afterAll(function(done) {
            loadFeed(0, done);
         });

    });

}());
