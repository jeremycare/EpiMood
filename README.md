# EpiMood

Service that allows to get feedback about planned activities, events, workdays, ect.

# Server

The server is in NodeJs, using expressions. It's a passwordless identification, that work with Autologin (gut) sent by mail.Every day the members of activities receive an email with the list of activity they didn't vote yet. To remind them, the email contains an Autologin link for the client app.
An user can change his Autologin whenever he want, by asking for another one, after that the token previously created is no longer usable.
The member can send feedback that correspond to a grade, from 0 to 4 and a comment.
