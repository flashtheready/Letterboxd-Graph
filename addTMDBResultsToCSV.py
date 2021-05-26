from urllib.request import urlopen
import csv
import urllib.parse
import json

api_key = '53d52c8f3eb74eb1aa0e7b778fc96523'
urlBase = "https://api.themoviedb.org/3/"
movieName = "Jurassic&20Park"

### ---- Update these two file paths ---####
# The inputFile should be the diary.csv you downloaded from Letterboxd, and the output file is where you want the new csv to save 

inputFile = "" #"FILE_PATH/INPUT_FILE.csv"
outputFile = "" #"FILE_PATH/OUTPUT_FILE.csv"
 
# urlExample = https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
searchUrl = urlBase + "search/movie?api_key=" + api_key + "&query=" + movieName

titlesFromCSV = []
yearsFromCSV = []
diaryDatesFromCSV = []

with open(inputFile, 'r') as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        try:
            diaryDatesFromCSV.append(row[0])
            titlesFromCSV.append(row[1])
            yearsFromCSV.append(row[2])
        except IndexError as e:
            pass

diaryDatesFromCSV.pop(0) # removes empty first line
titlesFromCSV.pop(0) # removes empty first line
yearsFromCSV.pop(0) # removes empty first line

idsFromAPI = []
langsFromAPI = []
genresFromAPI = []
posterPathsFromAPI = []

for i in titlesFromCSV:
# --- Loop through titlesFromCSV and return TMDb IDs
    # print(i)
    try:
        index = titlesFromCSV.index(i)
        searchTitle = i
        searchYear = yearsFromCSV[index]
        rawQuery = searchTitle # + " " + year
        query = urllib.parse.quote(rawQuery)
        tmdbUrl = urlBase + "search/movie?api_key=" + api_key + "&query=" + query
        tmdbResult = urlopen(tmdbUrl).read()
        json_object = json.loads(tmdbResult)
        results = json_object["results"]
        matchingResults = []
        for i in results:
            # --- Loop through all results and compare their year
            # print(i)
            try:
                releaseDate = i["release_date"]
                releaseDateTrimmed = releaseDate[0 : 4]
                # print("searchYear = " + searchYear + " .... releaseDateTrimmed = " + releaseDateTrimmed)
                if releaseDateTrimmed == searchYear:
                    matchingResults.append(i)
            except KeyError:
                pass
        # print(len(matchingResults))
        matchingResult = matchingResults[0]

        id = matchingResult["id"]
        idsFromAPI.append(id)
        try:
            lang = matchingResult["original_language"]
            langsFromAPI.append(lang)
        except KeyError:
            langsFromAPI.append(" ")
            print("******* ERROR lang *******")
        try:
            genres = matchingResult["genre_ids"]
            genresFromAPI.append(genres)
            print(len(genresFromAPI))
        except KeyError:
            genresFromAPI.append(" ")
            print("******* ERROR id *******")
        try:
            posterPath = matchingResult["poster_path"]
            posterPathsFromAPI.append(posterPath)
        except KeyError:
            postersPathsFromAPI.append(" ")
            print("******* ERROR posterPath *******")
    except IndexError as e:
        pass


# -- Create rows for CSV
rowsToAdd = []

for i in range(len(idsFromAPI)):
    diaryDate = diaryDatesFromCSV[i]
    title = titlesFromCSV[i]
    year = yearsFromCSV[i]
    id = idsFromAPI[i]
    lang = langsFromAPI[i]
    genres = genresFromAPI[i]
    posterPath = posterPathsFromAPI[i]
    rowsToAdd.append([diaryDate, title, year, id, lang, genres, posterPath])

with open(outputFile, 'w') as new_csv_file:
    writer = csv.writer(new_csv_file)
    for row in rowsToAdd:
        date = row[0]
        try:
            writer.writerow(row)
        except IndexError as e:
            pass