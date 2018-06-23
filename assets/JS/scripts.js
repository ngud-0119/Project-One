$(document).ready(function () {




    /// start up game on load
    $("#startMenu,#startBtn").fadeIn(2500).removeClass('hidden');

    /// Goes to first question
    $("#startBtn").click(function () {
        $("#startBtn").hide();
        $(".jumbotron").show(2000);
        $("#enterBand-Div").show();
        $("#startMenu").hide(1000);

    })

    $("#submitBandBtn").on("click", function () {
        if ($("#band-input").val().trim() === "") {
            alert("you must enter a band.")
        }




        var band = $("#band-input").val().trim().toUpperCase();
        var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + band + "&api_key=43aa7275eb736bbda8af4906bb03dfaa&format=json"


        // Creating an AJAX call for the specific band button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var bandsReturn = response.similarartists.artist

            $("#bands-view").append("<h1> Similar Artists to " + band);
            $("#bands-view").append("<h3> Click a band to learn more!");

            for (i = 0; i < 5; i++) {
                console.log(bandsReturn[i].name);

                $("#enterBand-Div").hide(1000);
                $("#bands-view").show(1000);

                bandButtons = $("<button hidden>" + bandsReturn[i].name + "</button>");
                $(bandButtons).addClass("waves-effect waves-light btn-large");
                $("#bands-view").append(bandButtons);
                $(bandButtons).addClass("band-return")
                $(bandButtons).attr("data-band", bandsReturn[i].name)
                $(".band-return").show(1000);

            }






        })

        $(document).on("click", ".band-return", function (event) {

            var bandInfo = $(this).attr("data-band");
            var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + bandInfo + "&api_key=43aa7275eb736bbda8af4906bb03dfaa&format=json";


            console.log(bandInfo)

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                var bandPic = response.artist.image[3]["#text"];
                var bandBio = response.artist.bio.summary;

                console.log(bandPic);
                console.log(bandBio);

                $("#band-info-div").empty();
                
                $("#band-info-div").append("<h1>" + bandInfo + "</h1>")
                $("<img>").attr("src", bandPic).appendTo("#band-info-div");
                $("#band-info-div").append("<p>" + bandBio + "</p>");



            })

        })

    })























})










