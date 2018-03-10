$(document).ready(function () {
    // An array of topics, new actions will be pushed into this array;
    var topics = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "ferret", "turtle", "chicken", "snake", "hawk", "pig", "gerbil"];
    // Creating Functions & Methods

    function displayGifButtons() {
        $("#gifButtonImage").empty(); 
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.attr("data-animal", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonImage").append(gifButton);
        }
    }
    // Function to add a new action button
    function addNewButton() {
        $("#addGif").on("click", function () {
            var action = $("#action-input").val().trim();
            if (action == "") {
                return false; 
            }
            topics.push(action);

            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs() {
        var action = $(this).attr("data-animal");
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=DKwLyay43g2de4Dh4o4jxKAQlW5ZGfka&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {
                console.log(response); // console test to make sure something returns
                $("#gifsView").empty();
                var results = response.data; 

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); //div for the gifs to go inside
                  // gifDiv.addClass("gifDiv"); 
                    // pulling rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    
                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height.url); 
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url); // still image
                    gifImage.attr("data-animate", results[i].images.fixed_height.url); // animated image
                    gifImage.attr("data-state", "still"); // set the image state
                    gifImage.addClass("image");
                    gifDiv.append(gifRating);
                    gifDiv.append(gifImage);
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    displayGifButtons();
    addNewButton();

    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr("data-state");
        if (state == 'still') {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
});