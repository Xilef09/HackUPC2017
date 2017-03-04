/**
 * Created by Gui on 04/03/2017.
 */
/*
 NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

 <script src="https://api.trello.com/1/client.js?key=your_application_key">...

 See https://trello.com/docs for a list of available API URLs

 The API development board is at https://trello.com/api

 The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
 */
var listaIds = ["570cbaacc078e64c570a1472","57618e68d2d733dd8222c4a4","58a42f721c2f91cb34bbf2bd",
    "564f10f2f7a8185aafc212ce", "58b9e719a25e7f60c7736b4c","56cc43989e478436ea725caf","564f11073921da5774e711b2",
    "56e7f2cdf3e99b15febe5c3a" ];

angular.module('myApp')
    .service('trelloService', [ function () {
        var trello = {};
        trello.boards = [];
        trello.authorize = function () {
            var onAuthorize = function() {
                updateLoggedIn();
                $("#output").empty();
            };

            Trello.authorize({
                type: "popup",
                success: onAuthorize,
                scope: { write: true, read: true }
            });
        };
        trello.getBoards = function () {
            updateLoggedIn();
            $("#result").empty();
            var data = [];

            Trello.members.get("me", function(member){
                $("#fullName").text(member.fullName);

                var $boards = $("<div>")
                    .text("Loading Boards...")
                    .appendTo("#result");

                // Output a list of all of the cards that the member
                // is assigned to
                Trello.get("members/me/boards", function(boards) {
                    $boards.empty();
                    $.each(boards, function(ix, board) {
                        $("<a>")
                            .attr({href: board.url, target: "trello"})
                            .addClass("board")
                            .text(board.name)
                            .appendTo($boards);

                        data.push({id: board.id , name: board.name});
                    });
                });
                console.log(data);
                angular.copy(data, trello.boards);
            });
        };

        var updateLoggedIn = function() {
            var isLoggedIn = Trello.authorized();
            $("#loggedout").toggle(!isLoggedIn);
            $("#loggedin").toggle(isLoggedIn);
        };

        return trello;


        /*
    $(document).ready(function(){
        var onAuthorize = function() {
            updateLoggedIn();
            $("#output").empty();

            Trello.members.get("me", function(member){
                $("#fullName").text(member.fullName);

                var $cards = $("<div>")
                    .text("Loading Cards...")
                    .appendTo("#output");

                // Output a list of all of the cards that the member
                // is assigned to
                Trello.get("members/me/cards", function(cards) {
                    $cards.empty();
                    $.each(cards, function(ix, card) {
                        $("<a>")
                            .attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name)
                            .appendTo($cards);
                    });
                });
            });

        };
        var getBoards = function(){
            updateLoggedIn();
            $("#result").empty();

            Trello.members.get("me", function(member){
                $("#fullName").text(member.fullName);

                var $boards = $("<div>")
                    .text("Loading Boards...")
                    .appendTo("#result");

                // Output a list of all of the cards that the member
                // is assigned to
                Trello.get("members/me/boards", function(boards) {
                    $boards.empty();
                    $.each(boards, function(ix, board) {
                        $("<a>")
                            .attr({href: board.url, target: "trello"})
                            .addClass("board")
                            .text(board.name)
                            .appendTo($boards);
                        console.log(board.id);

                    });
                });
            });
        }

        var getCardsOfBoard = function(){
            updateLoggedIn();
            $("#result2").empty();

            Trello.members.get("me", function(member){
                $("#fullName").text(member.fullName);

                var $cards = $("<div>")
                    .text("Loading Cards...")
                    .appendTo("#result2");

                // Output a list of all of the cards that the member
                // is assigned to
                Trello.get("boards/" + listaIds[3] + "/cards", function(cards) {
                    $cards.empty();
                    $.each(cards, function(ix, card) {
                        $("<a>")
                            .attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name)
                            .appendTo($cards);
                        console.log(card.name);

                    });
                });
            });
        }

        var updateLoggedIn = function() {
            var isLoggedIn = Trello.authorized();
            $("#loggedout").toggle(!isLoggedIn);
            $("#loggedin").toggle(isLoggedIn);
        };

        var logout = function() {
            Trello.deauthorize();
            updateLoggedIn();
        };

        Trello.authorize({
            interactive:false,
            success: onAuthorize
        });


        $("#connectLink")
            .click(function(){
                Trello.authorize({
                    type: "popup",
                    success: onAuthorize,
                    scope: { write: true, read: true }
                });
                callback();
            });
        $("#getMyBoards").click(function(){
            console.log("hi");
                getBoards();
        });
        $("#getMyCards").click(function(){
            getCardsOfBoard();
        });
        $("#disconnect").click(logout);


    });*/
    }]);


