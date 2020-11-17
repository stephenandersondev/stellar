Stellar App 
========================
![monkey-jump-gameplay](https://github.com/stephenandersondev/monkey-jump-app/blob/main/frontend/assets/img/readme-img/gameplay.gif?raw=true)
## About

Welcome to Stellar! This app was developed by Stephen Anderson (@stephenandersondev) and Ben Looper (@BenLooper) as part of week 12 of the Flatiron School Software Engineering program. It utilizes a React frontend and a Ruby on Rails backend.

## Demo Video
https://youtu.be/Y8FDJfGZjWw

## Installation

**1.** Fork and Clone this repository.

**2.** Navigate to the backend directory and run bundle install to install necessary gems:
```bash
$ bundle install
```
**3.** Migrate the database:
```bash
$ rails db:migrate
```
**4.** Start the rails server:
```bash
$ rails s
```
**5.** Navigate to the frontend directory and run npm install to install necessary modules:
```bash
$ npm install
```
**6.** Start the react server:
```bash
$ npm start
```
## Usage
You should now be brought to the login screen. Enter your desired username and login! 

![monkey-jump-login](https://github.com/stephenandersondev/monkey-jump-app/blob/main/frontend/assets/img/readme-img/login.gif?raw=true)

After logging in you will see the game screen and user panel which will show your top 5 scores. Press 'START' to begin the game and use the arrow keys to move the monkey left, right, or straight ahead.

The game is over when the monkey falls. Your score is based on how many platforms you pass, and will be displayed to you after the game is over. 

 ![monkey-jump-gameplay](https://github.com/stephenandersondev/monkey-jump-app/blob/main/frontend/assets/img/readme-img/gameplay.gif?raw=true)

Feel free to play the game as many times as you like. If you get into the top 10 scores on your database your name will be displayed on the homepage!

We hope you enjoy building learning about space in Stellar! 😊