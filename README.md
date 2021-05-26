# Letterboxd-Graph
Format and animate data from Letterboxd to create a chart of your watch history

Here are the basic steps:

1] Download your data from Letterboxd. Go to Account Settings -> Import & Export -> Export Your Data
2] We're interested in the diary.csv
3] Use the addTMDBResultsToCSV.py script to create a new csv with genre IDs, languages and urls for the posters. This script could easily be modified to gather other data: director credits, popularity, average rating, etc.
4] Use pace_addBlankRowsPerDate.py and then pace_rearrrangeEntriesPerDate.py to add blank rows so that every day is given exactly 6 rows in the CSV, which will result in each day being exactly 6 frames in the final animation
5] Use all of the convertcsvtoarray...py scripts to get arrays of your data, and copy them into createAnimationFromData.js
6] createAnimationFromData.js will take those arrays and create your After Effects animation with the year totals, ratings and genre charts
7] Similarly, createDiaryCount.js will create the chart from the top of my animation that counts how many entries are logged on each day
