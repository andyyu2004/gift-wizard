# Gift Wizard - Team 03

## Getting Started

Simply `npm install` in the root directory, and then `npm start` to run this application.

## Home View (/)

This page provides links to the most of the main views including the following:
- Create new questionnaire (from scratch)
- Creating questionnaire based on the most popular provided templates
- Link to all offered templates
- Links to profile, connection, settings.

## Questionnaire Creation View (/create)

This is the heart of the site and where you can design your own questionnaires
though a simple two step process.

1. Theme selection - Click to choose from a given selection of themes
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


## Login
Access this page through the Log In/Sign Up button in the top right.

The default credentials are user/user and admin/admin for regular user and admin respectively.

## Profile
Once logged in as a user, the header changes and you can access the profile through the icon in the top right.
The profile has five subviews.
The personal profile is where you can edit your personal information (edit is not currently enabled)
The connections page lists your connections and you can check out their profile by clicking on their icon.



  


 


 

