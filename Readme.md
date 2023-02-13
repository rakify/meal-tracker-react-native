# Mess Meal Tracker Android App (React Native)

## Introduction

Mess meal tracker web app is for people/students living together in a mess or hostel. Here manager who is responsible to update meals will be given a unique code via email, only with the code manager can update meals. Also manager himself can not delete meals that was updated 2 days ago. This way there should be no deception. And also after each submission meal rate is instantly gets updated so every member can see the ongoing meal rates and also his due. This app is super simple to use and user friendly and responsive too.
This is its android version.

## Tech Stack

React Native, ReactJS, Redux toolkit, Async Storage, React Navigations, Axios.

## Features

• Every member of a mess will use one single email and password to login.

• Total meals, spent, reserve, meal rates are calculated automatically along with each member updates and all are recorded to mongodb databae so no way of losing data.

• Only manager can add new members, new entry, remove himself from manager and add new manager.

• Anyone with account can request new code that will be sent to managers email.

• Even manager can not remove a member who has due ammount.

• Manager can remove a wrong entry if its todays entry or yesterdays, even manager can not remove entry that was added two days ago.

• At 12am on the first day of any month, all data will be cleared, but their history will be stored that can be accessed from below of the page, in new month manager can remove any past member or add all rest information from previous month.

## Screenshots

### Login Screen

![Loginscreen](https://i.ibb.co/cF4yBv4/MT-Login.png)

### Register Screen

![Registerscreen](https://i.ibb.co/nmq01yQ/MT-Register.png)

### Home Screen

![Homescreen](https://i.ibb.co/3cP271s/MT-Homescreen.png)

### Calculations

![Calculations](https://i.ibb.co/ws095Kt/MT-Calculation.png)

### Manager

![Manager](https://i.ibb.co/tx00Rgk/MT-Admin.png)

### Manager Select By

![Manager2](https://i.ibb.co/25fKqcT/MT-Admin-By.png)

### Manager Set Meals

![Manager3](https://i.ibb.co/89fYfbZ/MT-Admin-Meals.png)

### Manager Update Key

![Manager3](https://i.ibb.co/CB5cvF6/MT-Update-Key.png)

### Manager Update User

![Manager3](https://i.ibb.co/mXLJWcN/MT-Update-User.png)

## Demo

[Demo Apk](https://drive.google.com/drive/folders/1_K6rm0eYD6U8XplUy2mjTXkQaq3_KIf0)

use username: eumess and password: eumess for demo account