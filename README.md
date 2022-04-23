## Jotter Project
[Jotter](https://jotting-app.herokuapp.com) a place to "Jot your thoughts down!", is a clone of Twitter, where you can post, comment, and follow to build your feed. 

## Technologies Used
Jotter uses a React frontend, Flask backend, and PostgreSQL as the database. Other tehchnologies where used such as Redux JavaScript, CSS, Python, SQLAlchemy.

## Lets get started
### In order to use the application there are some steps required
1. Clone this github repository
   `https://github.com/ljmurill/Jotter.git`
2. You want to install all dependencies by using `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Create a `.env` file based on the .env.example with the proper settings for your development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your .env file
5. Now get into your pipenv, migrate your database, seed your database, and run your flask app `pipenv shell`, `flask db upgrade`, `flask seed all`, `flask run`
6. To set up the frontend you will need to go into the "react-app" directory where you will run these commands `npm install`, `npm start`

You should now be ready to get started!


## Features

### Posting a "Jot"
You are able to post a jot from your sidebar and from the home page where you will see it appear on your home feed and profile page.
![image](https://user-images.githubusercontent.com/72574258/163440948-bc1090d2-fe58-441f-bdba-0eac0090cff2.png)
### Following Users
You will be able to go onto users profile page where you will be able to see all there post and follow them so there post can be present on your home feed.
![image](https://user-images.githubusercontent.com/72574258/163441151-9cebd085-ce8a-4159-9403-cfae4ec87564.png)
### Replying to Jots
You have the ability to comment from the specific post page or comment by clicking the comment icon which will activiate a modal with the post and form to comment.
![image](https://user-images.githubusercontent.com/72574258/163441229-0b0cc01a-3411-45a6-8388-16912788a995.png)
### Search for Users
You have the ability to search for a user by their username and when you click the results it will take you to their profile page.
![image](https://user-images.githubusercontent.com/72574258/163441668-3aad51d4-9f5c-44c5-adb9-720c56d534e3.png)
### Look at users following
The ability to look at who the users following and followers, from this page you can see if the users are following you and you can follow and unfollow from this page aswell.
![image](https://user-images.githubusercontent.com/72574258/163441815-20240343-5533-42f3-a981-9b826034da91.png)

