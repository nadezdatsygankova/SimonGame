$(document).ready(function () {

    let gamePattern = [];
    let buttonColours = ["red", "blue", "green", "yellow"];
    let userClickedPattern = [];
    let level = 0;
    let started = false;

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        let randomNumber = Math.floor((Math.random() * 4));
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
        playSound(randomChosenColour);
    }

    $(".btn").click(function () {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    });

    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    }

    $(document).keypress(function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    })

    function checkAnswer(currentLevel) {
        //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

            console.log("success");

            //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
            if (userClickedPattern.length === gamePattern.length) {

                //5. Call nextSequence() after a 1000 millisecond delay.
                setTimeout(function () {
                    nextSequence();
                }, 1000);

            }

        } else {

            console.log("wrong");
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
    }

    function startOver() {
        level = 0;
        started = false;
        gamePattern = [];
    }
})