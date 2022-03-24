## Jotter Project
Jotter a place to "Jot your thoughts down!", is a clone of Twitter, where you can post, comment, and follow to build your feed.

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
![homeFeed](https://user-images.githubusercontent.com/72574258/159960770-5283db6e-dc41-45e0-8140-4a347012c3e3.png)
### Following Users
You will be able to go onto users profile page where you will be able to see all there post and follow them so there post can be present on your home feed.
![profilePage](https://user-images.githubusercontent.com/72574258/159960732-0f2867af-a70b-4273-82b1-1963aeec26b0.png)
### Replying to Jots
You have the ability to comment from the specific post page or comment by clicking the comment icon which will activiate a modal with the post and form to comment.
![CommentFeature](https://user-images.githubusercontent.com/72574258/159960793-3d711ed8-702c-4021-987d-6c9560abf433.png)
