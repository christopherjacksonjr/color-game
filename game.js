//Variables declarations.
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

resetButton.addEventListener("click", resetClicked);

init(); 

function init()
{
	//Mode buttons event listeners.
	setupModeButtons();

	//Setting the random colors to the squares on the screen.
	setupSquares();

	reset();
}

function setupModeButtons()
{
	//Mode buttons event listeners.
	for(var i = 0; i < modeButtons.length; i++)
	{
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares()
{
	//Setting the random colors to the squares on the screen.
	for(var i = 0; i < squares.length; i++)
	{
		//Add click listeners to squares.
		squares[i].addEventListener("click", squareClicked);
	}
}

//Function for square event listener.
function squareClicked()
{
	//grab color of clicked square.
	var clickedColor = this.style.backgroundColor;

	//compare color to pickedColor.
	if(clickedColor === pickedColor)
	{
		messageDisplay.textContent = "Correct!";
		resetButton.textContent = "Play again?";
		changeColors(clickedColor);
		h1.style.backgroundColor = clickedColor;
	}
	else
	{
		this.style.backgroundColor = "#232323";
		messageDisplay.textContent = "Try again.";
	}
}

//Function to change color of other squares once correct one is chosen.
function changeColors(color)
{
	//Loop through all squares. 
	for(var i = 0; i < squares.length; i++)
	{
		//Change each color to match given color.
		squares[i].style.backgroundColor = color;	
	}
}

//Function to pick color user should be guessing.
function pickColor()
{
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//Function to generate random colors.
function generateRandomColors(number)
{
	//Make an array.
	array = [];

	//Add number random colors to array.
	for(var i = 0; i < number; i++)
	{
		//Get random color and push into array.
		array.push(randomColor());
	}

	//Return that array.
	return array;
}

function randomColor()
{
	//Pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);

	//Pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);

	//Pick a "blue from 0 - 255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function resetClicked()
{
	reset();
}

function reset()
{
	//Generate all new colors.
	colors = generateRandomColors(numSquares);

	//Pick a new random color from array.
	pickedColor = pickColor();

	//Change cclorDisplay to match pickedColor.
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New colors";
	messageDisplay.textContent = "";

	//Change colors of squares.
	for(var i = 0; i < squares.length; i++)
	{
		//Change each color to match given color.
		if(colors[i])
		{
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else
		{
			squares[i].style.display = "none";
		}
	}

	h1.style.backgroundColor = "steelblue";
}