# Auto Mart

[![Build Status](https://travis-ci.com/Paul-Taiwo/automart.svg?branch=develop)](https://travis-ci.com/Paul-Taiwo/automart)
[![codecov](https://codecov.io/gh/Paul-Taiwo/automart/branch/develop/graph/badge.svg)](https://codecov.io/gh/Paul-Taiwo/automart)
[![Maintainability](https://api.codeclimate.com/v1/badges/16b7b4d417a83c5676e6/maintainability)](https://codeclimate.com/github/Paul-Taiwo/automart/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/16b7b4d417a83c5676e6/test_coverage)](https://codeclimate.com/github/Paul-Taiwo/automart/test_coverage)

## Project Overview

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers

## Required Features

1. User can sign up.
2. User can sign in.
3. User (seller) can post a car sale advertisement.
4. User (buyer) can make a purchase order.
5. User (buyer) can update the price of his/her purchase order.
6. User (seller) can mark his/her posted AD as sold.
7. User (seller) can update the price of his/her posted AD.
8. User can view a specific car.
9. User can view all unsold cars.
10. User can view all unsold cars within a price range.
11. Admin can delete a posted AD record.
12. Admin can view all posted ads whether sold or unsold.

## Optional features

- User can reset password.
- User can view all cars of a specific body type.
- User can add multiple pictures to a posted ad.
- User can flag/report a posted AD as fraudulent.
- User can view all unsold cars of a specific make (manufacturer).
- User can view all used unsold cars.
- User can view all new unsold cars

## Technologies

- Node js
- Express
- Mocha, chai, babel, eslint

## API URL

<https://automart1.herokuapp.com/api/v1>

## API Endpoints

| Verb     | Endpoint                                                           | Action
| :------- | :---------------------------------------------------------------   | :---------------------------------------------
| POST     | /api/v1/auth/signup                                                | Create a user
| POST     | /api/v1/auth/admin/signup                                          | Create a user (Admin)
| POST     | /api/v1/auth/signin                                                | Sign a user in
| POST     | /api/v1/car                                                        | Create a car AD
| GET      | /api/v1/car                                                        | View all posted ADs whether sold or available
| GET      | /api/v1/car/<:id>                                                  | View a specific car AD
| GET      | /api/v1/car?status=available                                       | View all unsold cars
| GET      | /api/v1/car?body_type=bodyType                                     | View all cars of a specific body type.
| GET      | /api/v1/car?status=available&state=new                             | View all unsold cars of a specific state (new)
| GET      | /api/v1/car?status=available&state=used                            | View all unsold cars of a specific state (used)
| GET      | /api/v1/car?status=available&manufacturer=XXXValue                 | View all unsold cars of a specific make (manufacturer)
| GET      | /api/v1/car?status=available&min_price=XXXValue&max_price=XXXValue | View all unsold cars within a price range
| PATCH    | /api/v1/car/<:id>/price                                            | Update a specific car AD price
| PATCH    | /api/v1/car/<:id>/status                                           | Update a specific car AD status (sold)
| DELETE   | /api/v1/car/<:id>/                                                 | Delete a specific car AD (only Admin)
| POST     | /api/v1/order                                                      | Create an order
| POST     | /api/v1/order/<:id>/price                                          | Update price of an order
| POST     | /api/v1/flag/report                                                | Create a flag/report a posted AD as fraudulent

## Setting up locally

- Clone this repository to your local machine
- Cd into directory `cd into develop`
- Create `.env` file.
- Use the format in `.env-sample` file to configure the API
- Run `npm install` to install dependencies
- Start app with `npm start`

## Documentation

<https://automart1.herokuapp.com/api/v1/docs/>

## Author

Paul Taiwo
