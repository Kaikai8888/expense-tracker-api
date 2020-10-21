# Expense Tracker
A simple expense tracking web app to help you know your cash flow at ease.
https://frozen-taiga-94619.herokuapp.com

![home page](./home-page-screenshot.png)

## Features
* browsing all expenses and check total amount
* filtering expenses by categories and check subtotal amount of the selected category
* creating new expense
* editing existing expense
* deleting expense

## Prerequisite
* Node.js: v10.15.0
* npm: 6.4.1
* nodemon: 2.0.4
* express: 4.17.1
* express-handlebars: 5.1.0
* body-parser: 1.19.0
* method-override: 3.0.0
* mongoDB: 4.2.9
* robo 3T: 1.4.1
* mongoose: 5.10.7

## Installation
1. Enter ` git clone https://github.com/Kaikai8888/expense-tracker.git ` in the terminal to download the project folder
2. Use robo 3T to manipulate mongoDB, create connection to `localhost: 27017`, and create the database,`expense-tracker`
3. Enter `npm run seed` in the terminal to to run seeder.js with nodemon and create seed data
4. Enter `npm run dev` in the terminal to run app.js with nodemon to set up database connection and start local server 
5. Enter http://localhost:3000 in the brower and enter the website

