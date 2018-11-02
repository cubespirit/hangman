paper.install(window);
window.onload = function () {
    paper.setup("myCanvas");


    function gameStart() {
        paper.project.activeLayer.removeChildren();
        paper.view.draw();
        // get a random word, create an array with the letters of the word, create an array with blanks
        var wordArray = [0];
        wordArray = ["accommodate", "handkerchief", "cemetery", "millennium", "liaison", "pronunciation"];
        var lettArray = wordArray[Math.floor(Math.random() * wordArray.length)].split("");
        var blankArray = [0];
        var lifeCount = 8;
        var isClicked = 0;

        lettArray.forEach(function (element, index) {
            blankArray[index] = "_";
        });


        var squarePath = new Path.Rectangle(new Point(20, 20), new Size(60, 5));
        squarePath.fillColor = 'aquamarine';
        var squareSymbol = new Symbol(squarePath);

        // lets place some squares using symbols, and rotate each instance slightly
        for (var i = 0; i < lettArray.length; i++) {
            var placedSymbol = squareSymbol.place(new Point(60 + (i * 80), 50));
            // operation on the instance
        }

        view.onFrame = function (event) {
            // Add 1 degree to the hue
            squareSymbol.definition.fillColor.hue += 1;
        }

        var text = new PointText({
            point: new Point(33, 120),
            content: 'lives: 8',
            justification: 'left',
            fontSize: 15
        });

        var placedText = [];

        for (var i = 0; i < lettArray.length; i++) {
            placedText[i] = new PointText({
                point: new Point(60 + (i * 80), 40),
                content: '',
                justification: 'center',
                fontSize: 30,
                fillColor: 'red'
            });
        }



        console.log(lettArray);

        // add event listener for key down
        // if key down === a letter in the lettArray, change blankArray[indexes of letter] to that letter
        // else, lose a life

        document.addEventListener('keyup', function (event) {
            if (lettArray.includes(event.key)) {
                var x = lettArray.indexOf(event.key);
                while (x != -1) {
                    blankArray[x] = lettArray[x];
                    console.log(blankArray[x]);
                    placedText[x].content = blankArray[x];
                    placedText[x].fillColor.hue += 30;
                    x = lettArray.indexOf(event.key, ++x);
                }

                console.log(blankArray);
                checkWinner();
            } else if (!(event.key.length === 1) || !(event.key.match(/[a-z]/i))) {
                console.log("not a letter!");
            } else {
                lifeCount -= 1;
                text.content = "lives: " + String(lifeCount);
                checkLives();
                console.log(lifeCount);
            };
        });

        // add function that counts lives
        function checkLives() {
            if (lifeCount <= 0) {
                text.content = "you lose, hit enter to play again";
                addEventListener('keydown', function (event) {
                    if (event.key === "Enter" && isClicked === 0) {
                        gameStart();
                        isClicked = 1;
                    }
                });
            }
        }

        // add function that tells you if you won
        function checkWinner() {
            if (JSON.stringify(blankArray) == JSON.stringify(lettArray)) {
                console.log("you win");
                text.content = "you win, hit enter to play again";
                addEventListener('keydown', function (event) {
                    if (event.key === "Enter" && isClicked === 0) {
                        gameStart();
                        isClicked = 1;
                    }
                });
            }
        }

        // add function that tells you if you lost

    }

    gameStart();
};