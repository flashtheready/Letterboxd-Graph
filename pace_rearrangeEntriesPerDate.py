import csv

### ---- Update these two file paths ---####
# The inputFile should be the csv you created with pace_addBlankRowsPerDate.py, and the output file is where you want the new csv to save 

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

# Read the inputFile and add rows to rowsFromFile[]
with open(inputFile, 'r') as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        try:
            rowsFromFile.append(row) 
        except IndexError as e:
            pass

entriesInDate = []
rowsToFile = []
rowsToFile.append(rowsFromFile[0])

i = 0
while (i < len(rowsFromFile)):
    entriesInDate = []
    blankEntriesInDate = 0
    d = 0
    for d in range(6):
        entry = rowsFromFile[i + d]
        entriesInDate.append(entry)
        if entry[4] == "blank":
            blankEntriesInDate += 1

    # Depending on how many blank entries are in each date, put them in rowsToFile in a certain order
    if blankEntriesInDate == 0 or blankEntriesInDate == 1 or blankEntriesInDate == 5 or blankEntriesInDate == 6:
        rowsToFile.append(entriesInDate[0])
        rowsToFile.append(entriesInDate[1])
        rowsToFile.append(entriesInDate[2])
        rowsToFile.append(entriesInDate[3])
        rowsToFile.append(entriesInDate[4])
        rowsToFile.append(entriesInDate[5])
    elif blankEntriesInDate == 2:
        rowsToFile.append(entriesInDate[0])
        rowsToFile.append(entriesInDate[1])
        rowsToFile.append(entriesInDate[4])
        rowsToFile.append(entriesInDate[2])
        rowsToFile.append(entriesInDate[3])
        rowsToFile.append(entriesInDate[5])
    elif blankEntriesInDate == 3:
        rowsToFile.append(entriesInDate[0])
        rowsToFile.append(entriesInDate[3])
        rowsToFile.append(entriesInDate[1])
        rowsToFile.append(entriesInDate[4])
        rowsToFile.append(entriesInDate[2])
        rowsToFile.append(entriesInDate[5])
    elif blankEntriesInDate == 4:
        rowsToFile.append(entriesInDate[0])
        rowsToFile.append(entriesInDate[2])
        rowsToFile.append(entriesInDate[3])
        rowsToFile.append(entriesInDate[1])
        rowsToFile.append(entriesInDate[4])
        rowsToFile.append(entriesInDate[5])
    i += 6

with open(outputFile, 'w') as new_csv_file:
    writer = csv.writer(new_csv_file)
    for row in rowsToFile:
        date = row[0]
        try:
            writer.writerow(row)
        except IndexError as e:
            pass