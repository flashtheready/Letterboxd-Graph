import csv

totalsString = ""

with open('/Users/noahhornstein/Documents/__Sandbox/LETTERBOXD/02_ASSETS/Diary Library/V2/diary_v2_fin.csv', 'r') as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        try:
            # print(row[1])

            # totalsString += str(row[2])
            totalsString += ", \""
            totalsString += str(row[1])
            totalsString += "\" "
            if str(row[1]) == "": 
                totalsString += " "
            # else:
            #     totalsString += str(row[1])
        except IndexError as e:
            #print (e)
            pass


print(totalsString)
