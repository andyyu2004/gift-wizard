# Gift Wizard - Team 03

## Deployed Address
https://gift-wizard.herokuapp.com/

## Note for markers
Please refer to the latest commit before the due date for the code to mark. The later few commits are minor updates for the demo which is allowed.

## Getting Started
To run on local machine
run `install.sh` in the root directory, and then `npm start` (also in root) to run this application

## Home View (/)

This page provides links to the most of the main views including the following:
- Create new questionnaire (from scratch)
- Creating questionnaire based on the most popular provided templates
- Link to all offered templates
- Links to profile, connection, settings.

## Questionnaire Creation View (/create)

This is the heart of the site and where you can design your own questionnaires
though a simple two step process.

1. Theme selection - Click to choose from pre-made themes (fancy patterned backgrounds!)
2. Question Creation
 
We provide a selection of five types of questions.
- Multiple Choice (Mutually exclusive options)
- Checkbox (Allows multiple selection)
- Rate (1..10 stars)
- Rank (Drag and drop UI to order options)
- Short Answer (Answerer can write their thoughts)

(This creation stuff is all implemented btw!)

The creator can freely add questions by simply clicking on the bar on the left.
The author can edit the questions and options, 
this includes adding more and deleting options for 
ranking and multichoice-like questions.

We also offer a preview toggle button so you can see what the answerer will see when
they answer your questionnaire.

You can also save the questionnaire locally until refresh in the 'open existing page'.

## Open existing view (/open)

In this view you can view the templates you have saved from the `/create` view 
(as well as two mock templates which we have placed for demonstration).

On this page you can view the template, but it is locked for editing. 
You can edit it by clicking the respective edit which takes you back to the `/create` page.

## Mail
You can see the received questionnaires and sent questionnaires, for received ones, you can click on one questionnaire and click edit, you can now edit and answer it and send it to the sender.

## People
you can view all users, and if you click on one user, you can send add friend request here.

## All Templates 

There are two spaces on the home screen which we will reserve for the most popular 
templates, which you can click to take you directly to the create screen where the
template will be preloaded for you to begin editing.
The two templates are currently simply named Template 1 and Template 2.  

The All Templates page is very similar to the /open page in which you can view but not 
edit templates. The difference is in which templates show up, the open shows personal templates,
while the All Templates page shows site wide templates set by an administrator.


## Profile Shortcuts
The bottom few icons are shortcuts to the profile section which can also be accessed through 
the icon in the header after logging in.
Currently, you can also access profile without logging in for your convenience.

## Notification
Access notifications through the button on the left of profile picture in the header, you can accept or reject add friend request there.

## Login
Access this page through the Log In/Sign Up button in the top right.

The default credentials are user/user and admin/admin for regular user and admin respectively.

## Profile
Once logged in as a user, the header changes and you can access the profile through the user icon in the top right of the homepage.
The profile has five subviews: Personal Profile, Area of Interests, Wishlist, Connections and Settings.
The Personal Profile is where you can edit your personal information, and you can change your profile picture
The Area of Interests and Wishlist sections display the user's "area of interests" and "wishlist" attributes, user is able to edit and save it.
The Connections view lists your connections and you can check out their profile information by clicking on their icon.

## Admin 
after logging in as an admin, one can create questionnaires and choose to publish it, which means the questionnaires created will appear in every user's template database, and users can use them.



  


 


 

