# sonic-project
A prototype for audio navigation and games

## NOTE
In order to start the interface when the html file is running in the browser, the user MUST click enter, there is no visual, audio, or any other sort of signal in  the program that shows this

## Features & Main Menu Commands
* A main menu with audio announcements for settings and help
* The settings menu contains speech volume, music volume and a toggle for music, and speaking rate
* There is currently one game option which contains a 10 by 10 by 10 grid; see the [grid](#Grid) section for more details
* Up and down arrow moves through menus
* Left and right arrows change the value of a setting
* Enter opens a menu or selects a setting so that it can be modified
* Escape goes to the previous menu
* Backspace goes to the main menu
* Space bar says the current item
* Home goes to the top of a menu
* End goes to the bottom of the menu
* Page up goes up in a menu by 5 items
* Page down goes down in a menu by 5 items

NOTE: When you are in a game option, the commands will not necessarily be the same as the main menu commands. The backspace command is the only current command that has the same function in the main menu and every game.
If one of the features above does not specify a game option that it applies to, then it is a main menu command

## Grid
* Up and down arrows navigate the Y-axis
* Left and right arrows navigate the X-axis
* period (.) and slash (/) navigate the Z-axis
* M activates the menu
* The menu currently contains one option, object picker, which has a list of objects. Selecting one of these objects will place that object on the position you were at when you opened the menu
* Selecting an object returns you to the grid at the position you were when you opened the menu
* Please note that it will not tell you your current position when the menu closes
* When you navigate the grid, it will tell you your position, I.E 0, 0, 0. If there is an object on the position, it will also note that, I.E, Spawn, 0, 0, 0

## Issues
* Visual elements have not been added, and there is no guide to navigating the audio interface
* The help option doesn't currently do anything
