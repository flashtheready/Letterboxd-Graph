import csv

### ---- Update these two file paths ---####
# The inputFile should be the csv you created with addTMDBResultsToCSV.py, and the output file is where you want the new csv to save 

inputFile = "" #"FILE_PATH/INPUT_FILE.csv"
outputFile = "" #"FILE_PATH/OUTPUT_FILE.csv"
 
blankRow = ['' ,' ' ,'' ,'' ,'' ,'' ]
#sampleRow = ['2020 03 14', 'Governor Gabbi', '2016', '0.5','' ,'' ]

rowsFromFile = []
rowsToFile = []
dateCount = 0
dateLimit = 6 # The number of rows per day that we want. If you want a different amount you'll have to edit the main loop of this script
datesTotal = 434 # The number of dates in our dataset
entriesTotal = dateLimit * datesTotal
blankRowsToAdd = []

with open(inputFile, 'r') as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        try:
            rowsFromFile.append(row) 
        except IndexError as e:
            pass

rowsToFile.append(rowsFromFile[0])
for i in rowsFromFile:
#Look through rowsFromFile and look for multiple entries on the same day
#Add blank rows so that each day has exactly 6 entries
    index = rowsFromFile.index(i)
    if index > 0:
    ##Skip header row
        if index < len(rowsFromFile) - 1:
            nextrow = rowsFromFile[index+1]
            date = i[0]
            nextdate = nextrow[0]
            if date == nextdate:
                ##The next diary entry is on the same day
                ##Just need to append row to new file
                rowsToFile.append(i)
                dateCount += 1
            else:
                dateCount += 1
                dateCount = 6 - dateCount
                for a in range(dateCount):
                    blankRowsToAdd.append([i[0],' ' ,'' ,'' ,'' ,'blank'])
                rowsToFile.append(i)
                for b in blankRowsToAdd:
                    rowsToFile.append(b)
                ##Clear values before next date
                dateCount = 0
                blankRowsToAdd.clear()

with open(outputFile, 'w') as new_csv_file:
    writer = csv.writer(new_csv_file)
    for row in rowsToFile:
        date = row[0]
        try:
            writer.writerow(row)
        except IndexError as e:
            pass