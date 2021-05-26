
## Importing Necessary Modules
import requests # to get image from the web
import shutil # to save it locally
import os
import csv

## Set up the image URL and filename
# image_url = "https://image.tmdb.org/t/p/w154/vpyu6e2ht70uDh1k8k9mqB1Tj0L.jpg"
imageUrlBase = "https://image.tmdb.org/t/p/w500" # This will download images with a width of 500 pixels, but TMDB offers other resolutions


### ---- Update these two file paths ---####
# The inputFile should be the csv you created with pace_rearrangeEntriesPerDate.py, and the dirPath is where the images should be saved 

inputFile = "" #"FILE_PATH/INPUT_FILE.csv"
dirPath = "" # Where the images should be saved

pathsFromCSV = []

with open(inputFile, 'r') as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        posterPath = row[7]
        if len(posterPath) > 2:
            try:
                posterPath = posterPath[1:] # remove first '
                posterPath = posterPath[:-1] # remove last '
                pathsFromCSV.append(posterPath)
            except IndexError as e:
                pass


for i in range(len(pathsFromCSV)):
    path = pathsFromCSV[i]
    fullPath = imageUrlBase + path
    print(fullPath)
    filename = fullPath.split("/")[-1]
    # Open the url image, set stream to True, this will return the stream content.
    r = requests.get(fullPath, stream = True)

    # # Check if the image was retrieved successfully
    if r.status_code == 200:
        # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
        r.raw.decode_content = True
        print(r)
        # Open a local file with wb ( write binary ) permission.
        with open(filename,'wb') as f:
            name = i
            fullName = str(name)+".jpg"
            print(r.raw)
            print(f.name)
            shutil.copyfileobj(r.raw, f)
            os.rename(f.name, fullName)
            
        print('Image sucessfully Downloaded: ',filename)
    else:
        print('Image Couldn\'t be retreived')