// This script will create the diary count seen at the top of my graphic. Each bar equals one day, with 0 - 6 entries per day
// This script will take a blank composition in After Effects, populate it with nulls, shapes, and text objects, and then apply keyframes based on the data in your Diary Arrays
// I kept one composition I called "pasteboard" which I would use as the destination for this script. Whenever I needed to run this script I would delete everything in pasteboard, run this script, and then copy whatever I needed from the results and paste it into whichever other comp I was working on

app.beginUndoGroup("Create bar graph");

var myComp = app.project.activeItem;

// Constants
var yearsTotal = 102;
var daysTotal = 434;
var margin = myComp.width/10;
var graphWidth = myComp.width - (margin * 2);
var barHeightUnit = 1;
var barW = 4;
var barH = 100;

// Prepping some arrays
var yearNulls = [];
var yearShapes = [];
var diaryEntriesNulls = [];
var diaryEntriesShapes = [];
var ratingsNulls = [];
var ratingsShapes = [];

// Diary Arrays
var diaryListYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2010, 0, 0, 0, 0, 0, 2011, 0, 0, 1989, 0, 0, 1967, 0, 1996, 0, 1974, 0, 2016, 0, 0, 0, 0, 0, 1960, 0, 0, 0, 0, 0, 1994, 0, 0, 0, 0, 0, 1971, 0, 0, 0, 0, 0, 1966, 0, 0, 0, 0, 0, 1953, 0, 0, 2018, 0, 0, 2017, 0, 0, 0, 0, 0, 2018, 0, 0, 1999, 0, 0, 2016, 0, 0, 1967, 0, 0, 1969, 0, 0, 1982, 0, 0, 1989, 0, 0, 1999, 0, 0, 1954, 0, 0, 0, 0, 0, 1937, 0, 0, 0, 0, 0, 2016, 0, 1969, 0, 1995, 0, 1956, 0, 1946, 0, 2003, 0, 1959, 0, 0, 0, 0, 0, 1974, 0, 0, 1960, 0, 0, 1983, 0, 0, 2011, 0, 0, 2020, 0, 1953, 0, 1952, 0, 1984, 0, 1991, 0, 1954, 0, 1979, 2017, 0, 1957, 2011, 0, 1983, 0, 1971, 0, 1969, 0, 1951, 2018, 0, 1958, 2019, 0, 2019, 0, 1982, 0, 1966, 0, 1992, 1988, 1990, 1943, 2014, 0, 2003, 1953, 0, 1963, 2000, 0, 1979, 0, 1960, 0, 1985, 0, 1961, 0, 0, 1955, 0, 0, 1973, 0, 1975, 0, 1985, 0, 2019, 0, 1954, 0, 1963, 0, 1959, 0, 0, 1942, 0, 0, 1958, 1957, 0, 1959, 1979, 0, 1987, 0, 1963, 0, 1999, 0, 1974, 0, 0, 1986, 0, 0, 2014, 0, 0, 1973, 0, 0, 2012, 0, 1987, 0, 1979, 0, 1976, 1962, 1934, 1992, 2019, 0, 2016, 1957, 1966, 1994, 1946, 2003, 1978, 2019, 0, 1987, 1982, 0, 2017, 0, 0, 1981, 0, 0, 1984, 0, 0, 0, 0, 0, 2000, 1978, 0, 1939, 1977, 0, 1981, 0, 0, 0, 0, 0, 1959, 0, 0, 1965, 0, 0, 1996, 0, 1975, 0, 1972, 0, 1958, 0, 0, 1953, 0, 0, 2015, 1986, 1991, 1975, 1998, 0, 1985, 0, 2009, 0, 1936, 0, 1986, 0, 2005, 0, 1956, 0, 1997, 2018, 0, 1955, 2014, 0, 2010, 1997, 1985, 1994, 1981, 0, 1994, 1970, 0, 1940, 1948, 0, 1993, 2002, 0, 1981, 1976, 0, 1999, 2018, 1953, 1972, 1978, 1973, 2019, 2010, 0, 2013, 2004, 0, 1939, 0, 0, 0, 0, 0, 1976, 1989, 0, 1981, 1958, 0, 1973, 1947, 1983, 1943, 2013, 0, 1983, 1988, 1988, 1945, 1975, 0, 2018, 1993, 0, 2020, 1954, 0, 2011, 1993, 0, 1983, 1988, 0, 1989, 0, 0, 0, 0, 0, 1925, 0, 0, 1980, 0, 0, 1970, 0, 1958, 0, 2015, 0, 1984, 0, 1966, 0, 1970, 0, 1970, 0, 1939, 0, 1933, 0, 1994, 1928, 1932, 1921, 1921, 1970, 1932, 1921, 1961, 1965, 1980, 0, 1985, 0, 0, 1965, 0, 0, 1982, 2013, 0, 1980, 1939, 0, 1920, 0, 1955, 0, 2019, 0, 1964, 2013, 0, 1975, 1993, 0, 2018, 0, 0, 1964, 0, 0, 1971, 0, 0, 0, 0, 0, 1972, 0, 0, 0, 0, 0, 1969, 1956, 0, 1993, 1958, 0, 2003, 1921, 1996, 1968, 2000, 0, 2015, 0, 0, 1958, 0, 0, 2016, 0, 0, 1991, 0, 0, 1924, 0, 1983, 0, 1992, 0, 1995, 0, 2005, 0, 2006, 0, 2014, 1982, 0, 2005, 1941, 0, 1964, 0, 0, 0, 0, 0, 1938, 0, 0, 0, 0, 0, 1971, 1978, 0, 2017, 2000, 0, 1994, 0, 0, 1958, 0, 0, 1976, 0, 1971, 0, 1930, 0, 1988, 0, 2009, 0, 1988, 0, 1985, 0, 0, 0, 0, 0, 1966, 0, 0, 1959, 0, 0, 2020, 0, 0, 1963, 0, 0, 2011, 0, 0, 1999, 0, 0, 2018, 1954, 1988, 1960, 2005, 0, 1967, 2019, 0, 2010, 1991, 0, 2019, 2014, 0, 1991, 1961, 0, 2011, 0, 0, 0, 0, 0, 2006, 0, 0, 0, 0, 0, 2014, 0, 0, 0, 0, 0, 2011, 0, 0, 0, 0, 0, 2014, 0, 0, 2008, 0, 0, 2019, 0, 1987, 0, 2011, 0, 1922, 0, 0, 1950, 0, 0, 2019, 0, 0, 2017, 0, 0, 1992, 0, 0, 1986, 0, 0, 2020, 0, 1962, 0, 1978, 0, 1986, 0, 2015, 0, 2009, 0, 2016, 0, 0, 1950, 0, 0, 1996, 0, 1944, 0, 1992, 0, 1974, 0, 0, 1974, 0, 0, 1975, 0, 0, 1981, 0, 0, 1993, 0, 0, 0, 0, 0, 1984, 0, 0, 0, 0, 0, 2015, 0, 1981, 0, 1985, 0, 2016, 0, 0, 1996, 0, 0, 1942, 0, 0, 2018, 0, 0, 2008, 0, 1985, 0, 1962, 0, 2016, 0, 0, 1972, 0, 0, 1965, 0, 0, 0, 0, 0, 2014, 0, 0, 1984, 0, 0, 2015, 0, 0, 0, 0, 0, 1998, 0, 1982, 0, 2008, 0, 1976, 0, 0, 1962, 0, 0, 1977, 0, 2011, 0, 2008, 0, 1985, 0, 2020, 0, 1979, 0, 1931, 0, 1935, 0, 2000, 0, 1977, 0, 0, 0, 0, 0, 1987, 0, 1982, 0, 1963, 0, 2009, 0, 0, 2008, 0, 0, 1982, 2018, 0, 2017, 1946, 0, 1977, 0, 0, 1964, 0, 0, 1990, 0, 1984, 0, 2019, 0, 1997, 0, 0, 0, 0, 0, 1984, 0, 0, 2018, 0, 0, 2019, 0, 1951, 0, 1965, 0, 1955, 0, 1983, 0, 1962, 0, 2011, 0, 0, 2019, 0, 0, 1962, 2018, 0, 2017, 2013, 0, 2018, 0, 1965, 0, 1976, 0, 1962, 0, 0, 0, 0, 0, 1959, 0, 0, 2018, 0, 0, 1986, 0, 2000, 0, 1992, 0, 1942, 0, 1954, 0, 1973, 0, 2019, 0, 1978, 0, 2020, 0, 2018, 0, 0, 1987, 0, 0, 2020, 0, 0, 1970, 0, 0, 1972, 0, 0, 1969, 0, 0, 1974, 0, 2019, 0, 2015, 0, 1993, 0, 0, 1991, 0, 0, 2007, 0, 0, 1973, 0, 0, 2017, 0, 0, 0, 0, 0, 1986, 0, 1965, 0, 1961, 0, 1973, 0, 0, 0, 0, 0, 1984, 0, 1977, 0, 1969, 0, 1986, 1970, 1948, 1989, 2010, 0, 1977, 0, 0, 0, 0, 0, 2001, 0, 1988, 0, 1985, 0, 1998, 2010, 0, 1945, 1970, 0, 2002, 0, 1996, 0, 1989, 0, 2017, 0, 1988, 0, 1995, 0, 1992, 0, 1996, 0, 1974, 0, 2014, 0, 1946, 0, 2010, 0, 1996, 0, 1978, 0, 1997, 0, 1997, 0, 0, 1985, 0, 0, 1985, 0, 0, 1991, 0, 0, 1945, 0, 0, 1961, 0, 0, 2020, 0, 0, 1990, 0, 0, 2001, 0, 1927, 0, 1980, 0, 1985, 0, 0, 0, 0, 0, 2019, 0, 0, 1991, 0, 0, 2003, 0, 0, 2017, 0, 0, 1987, 0, 0, 1986, 0, 0, 1983, 0, 0, 0, 0, 0, 2020, 0, 0, 0, 0, 0, 1989, 0, 0, 2000, 0, 0, 1970, 0, 0, 1929, 0, 0, 1934, 0, 0, 1937, 0, 0, 2015, 0, 2015, 0, 1985, 0, 2018, 0, 0, 1935, 0, 0, 2018, 0, 2008, 0, 2008, 0, 1980, 0, 2005, 0, 1968, 0, 2004, 0, 1938, 0, 1955, 0, 1982, 0, 0, 0, 0, 0, 2001, 0, 1991, 0, 1941, 0, 2010, 1940, 0, 1929, 1981, 0, 2011, 1983, 0, 2019, 2020, 0, 2020, 0, 0, 1960, 0, 0, 1985, 0, 0, 1985, 0, 0, 1941, 0, 0, 1986, 0, 0, 1975, 2008, 0, 1999, 2010, 0, 1999, 0, 2018, 0, 2014, 0, 1980, 2014, 1995, 1994, 2020, 1990, 1991, 2012, 2012, 1985, 1943, 0, 2020, 0, 1991, 0, 1980, 0, 1944, 1984, 0, 2013, 2016, 0, 2013, 0, 1968, 0, 1966, 0, 1946, 0, 1975, 0, 2020, 0, 1967, 1992, 0, 1980, 1961, 0, 2005, 1990, 0, 1980, 2017, 0, 2010, 2012, 1981, 2011, 1996, 0, 1995, 0, 1985, 0, 2017, 0, 2010, 2017, 2018, 1983, 1960, 0, 1951, 0, 1954, 0, 1968, 0, 1975, 1954, 1996, 1980, 1971, 0, 2007, 2018, 2010, 2004, 1964, 0, 1977, 2016, 0, 2009, 2011, 0, 2017, 0, 1995, 0, 1979, 0, 2009, 1989, 0, 2015, 1986, 0, 2018, 2018, 2020, 1993, 1970, 1965, 1956, 2018, 0, 1958, 1922, 0, 1958, 0, 0, 2020, 0, 0, 2020, 2015, 1992, 2003, 2014, 1988, 2009, 2005, 1988, 1997, 1994, 0, 2006, 1984, 2016, 1994, 1960, 1985, 2020, 2011, 0, 1964, 1993, 0, 2018, 2018, 0, 1980, 1983, 0, 1994, 2020, 2015, 1963, 2016, 0, 1982, 1995, 0, 1974, 2008, 0, 2005, 2013, 0, 2018, 1997, 0, 1988, 1967, 2019, 2012, 1932, 0, 1991, 0, 1988, 0, 1981, 0, 2013, 1992, 2014, 1986, 1975, 2020, 1981, 1989, 1961, 2003, 1982, 0, 2020, 2019, 2018, 1948, 1957, 0, 2017, 2018, 2020, 1965, 2018, 2018, 1978, 2017, 1993, 1981, 1981, 0, 1993, 1989, 2017, 2014, 2018, 0, 2002, 1995, 1992, 1960, 2018, 0, 2018, 2020, 0, 1972, 1989, 0, 2010, 2011, 2020, 2005, 1973, 0, 2016, 0, 1979, 0, 1980, 0, 2020, 0, 2010, 0, 2018, 0, 2010, 2015, 0, 2011, 1990, 0, 1972, 1963, 0, 1957, 2017, 0, 2015, 2018, 2013, 2018, 2005, 0, 2018, 1993, 0, 2018, 2018, 0, 2016, 1992, 2015, 2012, 2017, 0, 2016, 0, 0, 1951, 0, 0, 2018, 0, 1976, 0, 1985, 0, 1995, 1990, 0, 1988, 2018, 0, 2020, 1991, 0, 1998, 1947, 0, 1977, 2020, 1999, 2014, 1960, 0, 2015, 1989, 1974, 1998, 2020, 0, 1982, 2018, 1945, 1998, 1995, 0, 1993, 0, 2000, 0, 2004, 0, 2015, 2009, 0, 2013, 2016, 0, 2020, 0, 2016, 0, 2019, 0, 1946, 0, 1976, 0, 2015, 0, 1964, 0, 2017, 0, 2020, 0, 2020, 2011, 0, 2020, 1995, 0, 2015, 0, 2020, 0, 2014, 0, 2020, 0, 0, 2019, 0, 0, 2020, 0, 0, 2007, 0, 0, 2012, 0, 2001, 0, 2020, 0, 1996, 0, 0, 0, 0, 0, 1965, 0, 0, 2018, 0, 0, 1971, 0, 1957, 0, 1990, 0, 1983, 0, 0, 2020, 0, 0, 2019, 0, 0, 2020, 0, 0, 1995, 0, 0, 1985, 0, 0, 2009, 0, 0, 0, 0, 0, 2020, 0, 0, 2016, 0, 0, 2016, 0, 0, 1987, 0, 0, 1988, 0, 0, 0, 0, 0, 1982, 0, 2019, 0, 1984, 0, 1978, 0, 0, 2020, 0, 0, 2019, 0, 0, 2020, 0, 0, 1984, 0, 0, 2017, 0, 0, 1967, 0, 0, 0, 0, 0, 2017, 0, 0, 2017, 0, 0, 1994, 0, 0, 1955, 0, 0, 1994, 0, 0, 1984, 0, 0, 2018, 0, 0, 0, 0, 0, 2017, 0, 0, 0, 0, 0, 1974, 0, 0, 2011, 0, 0, 1991, 0, 0, 0, 0, 0, 2008, 0, 0, 2014, 0, 0, 2012, 0, 0, 2015, 0, 0, 2001, 0, 0, 2020, 0, 0, 2010, 0, 0, 0, 0, 0, 2020, 0, 0, 0, 0, 0, 1989, 0, 0, 2015, 0, 0, 1987, 0, 0, 0, 0, 0, 1990, 0, 0, 0, 0, 0, 1983, 0, 0, 1958, 0, 0, 1999, 0, 0, 2020, 0, 0, 2020, 0, 0, 0, 0, 0, 2006, 0, 0, 0, 0, 0, 2020, 2013, 0, 2020, 2019, 0, 2019, 0, 0, 0, 0, 0, 2020, 0, 0, 0, 0, 0, 1990, 0, 0, 1998, 0, 0, 2005, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1987, 0, 0, 2019, 0, 0, 1985, 0, 0, 2020, 0, 0, 2018, 0, 0, 2018, 0, 0, 2020, 0, 0, 0, 0, 0, 2020, 0, 1983, 0, 2020, 0, 2020, 0, 1971, 0, 2007, 0, 2020, 0, 1999, 0, 1957, 0, 2020, 0, 1982, 0, 1994, 0, 2004, 2013, 2020, 1978, 2020, 0, 2020, 0, 2020, 0, 2002, 0, 2014, 0, 0, 2018, 0, 0, 2002, 0, 1975, 0, 2020, 0, 2020, 0, 0, 2020, 0, 0, 1931, 1986, 1932, 1949, 2017, 0, 1921, 2014, 0, 1933, 2020, 0, 1935, 0, 0, 1967, 0, 0, 2020, 0, 2020, 0, 1953, 0, 2020, 0, 0, 1995, 0, 0, 1994, 0, 2014, 0, 1983, 0, 1992, 0, 0, 2008, 0, 0, 1936, 0, 0, 2020, 0, 0, 2009, 0, 0, 0, 0, 0, 2005, 0, 2009, 0, 2007, 0, 2010, 0, 0, 0, 0, 0, 2015, 0, 2015, 0, 2015, 0, 2014, 0, 1983, 0, 1989, 0, 0, 0, 0, 0, 0, 0, 1986, 0, 0, 0, 0, 0, 1939, 0, 0, 0, 0, 0, 2020, 0, 0, 0, 0, 0, 1969, 0, 0, 0, 0, 0, 2019, 0, 0, 2015, 0, 0, 2015, 0, 2020, 0, 2021, 0, 1979, 0, 1989, 0, 1981, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2018, 0, 0, 1987, 0, 0, 1988, 0, 1935, 0, 2020, 0, 1963, 0, 0, 0, 0, 0, 1987, 0, 0, 1972, 0, 0, 1958, 0, 0, 2021, 0, 0, 1940, 0, 0, 1975, 0, 0, 1940, 1951, 0, 2017, 1963, 0, 1940, 1961, 1934, 2008, 2014, 0, 2014, 0, 1992, 0, 2014, 0, 2015, 0, 2015, 0, 1969, 0, 2014, 0, 0, 1996, 0, 0, 2009, 0, 0, 2020, 0, 0, 1941, 0, 0, 1992, 0, 0, 2020, 0, 0, 0, 0, 0, 2014, 0, 2014, 0, 1961, 0, 2012, 0, 2010, 0, 2008, 0, 1999, 0, 0, 0, 0, 0, 2007, 0, 2012, 0, 2017, 0, 2012, 0, 0, 1979, 0, 0, 1942, 0, 0, 2021, 0, 0, 1956, 0, 0, 1959, 0, 0, 2007, 0, 0, 1956, 0, 0, 2011, 0, 0, 0, 0, 0, 1956, 0, 0, 2012, 0, 0, 2007, 0, 0, 1971, 0, 0, 2021, 2011, 1984, 2021, 1952, 0, 2020, 0, 0, 0, 0, 0, 1942, 2001, 0, 1956, 2002, 0, 2003, 0, 0, 2009, 0, 0, 2010, 0, 0, 0, 0, 0, 1999, 0, 0, 0, 0, 0, 2008, 0, 2005, 0, 1956, 0, 2021, 2005, 1952, 1942, 1938, 1943, 1923, 1942, 0, 1961, 2011, 0, 1991, 0, 0, 1984, 0, 0, 2003, 0, 2020, 0, 1952, 0, 1990, 0, 2009, 0, 2020, 0, 2013, 0, 2014, 0, 2020, 0, 1987, 0, 0, 1954, 0, 0, 2003, 0, 2002, 0, 1944, 0, 1949, 1943, 0, 1987, 2020, 0, 2010, 0, 0, 0, 0, 0, 2008, 0, 2009, 0, 2019, 0, 2021, 0, 0, 2020, 0, 0, 2010, 0, 2020, 0, 1989, 0, 2008, 0, 0, 1958, 0, 0, 2002, 1984, 0, 2019, 1984, 0, 0, 0, 0, 0, 0, 0, 1943, 0, 0, 1962, 0, 0, 1984, 0, 2009, 0, 1988, 0, 1979, 0, 2010, 0, 1994, 0, 2007, 1954, 0, 1999, 2021, 0, 2008, 1990, 2020, 2021, 1986, 0, 1990, 1977, 1979, 1953, 1968, 0, 1943, 2021, 2020, 1984, 2014, 0, 1944, 2020, 0, 2020, 1950, 0, 1981, 0, 0, 1985, 0, 0, 1991, 0, 0, 1968, 0, 0, 2009, 0, 0, 2010, 0, 0, 2020, 0, 2020, 0, 1990, 0, 1944, 2011, 1979, 2007, 2016, 0, 1944, 0, 1949, 0, 2019, 0, 2020, 0, 0, 0, 0, 0, 1981, 0, 0, 0, 0, 0, 1971, 0, 0, 2020, 0, 0, 1957, 0, 0, 0, 0, 0, 1946, 0, 2008, 0, 1980, 0, 1944, 0, 0, 2020, 0, 0, 2019, 2020, 0, 2019, 2001, 0, 0, 0, 0, 0, 0, 0, 2019, 0, 0, 2019, 0, 0, 1957, 0, 0, 0, 0, 0, 2020, 0, 0, 2020, 0, 0, 2020, 0, 0, 0, 0, 0, 2021, 0, 0, 2021, 0, 0, 2020, 0, 2020, 0, 2020, 0, 1981, 0, 0, 0, 0, 0, 2016, 0, 2009, 0, 1995, 0, 2006, 2010, 0, 2011, 1952, 0, 2006, 0, 0, 2007, 0, 0, 2008, 0, 2021, 0, 2009, 0, 2010, 0, 0, 0, 0, 0, 1945, 0, 2011, 0, 1983, 0, 1948, 0, 0, 2002, 0, 0, 2012, 0, 0, 0, 0, 0, 1991, 0, 0, 1996, 0, 0, 1986, 0, 0, 0, 0, 0];



// --- YEAR ENTRIES GRAPH --- //
// Create nulls
for (var i = daysTotal-1; i >= 0; i--) {    
    // Make Shape for year
    var newShape = myComp.layers.addShape();
    newShape.name = (1 + i) + " DAY ENTRIES SHAPE";
    newShape.label = 6;
    diaryEntriesShapes.push(newShape);
    
    // Make Null for year
    var newNull = myComp.layers.addNull(); // Create null
    newNull.enabled = false;
    newNull.name = (1 + i) + " ENTRIES NULL"; // Set null name to correct year
    newNull.label = 7;
    newNull.transform.position.dimensionsSeparated = true; // Separate dimensions
    var xPos = margin + ((graphWidth / (daysTotal - 1) * i));
    var yPos = myComp.height;
    newNull.transform("ADBE Position_0").setValue(xPos); // Set position values
    var myProperty = newNull.transform("ADBE Position_1");
    myProperty.setValueAtTime(0, yPos); // Set position values
    myProperty.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD); // Convert to HOLD Keyframe
    diaryEntriesNulls.push(newNull); // Add newNull to diaryEntriesNulls so we don't have to rely on layer index
    newNull.transform("ADBE Position_1").expression = "y = value\;\nh = thisComp.height - y\;\nu = thisComp.layer(\"NULL - GLOBAL CONTROLLER\").effect(\"Global Bar Height\")(\"Slider\")\nvalue = thisComp.height - (h * u)\;"
    "x = thisComp.layer(\"NULL - GLOBAL CONTROLLER\").effect(\"Global Bar Width\")(\"Slider\");\ny = 800;\nvalue = [x, y];";
}

diaryEntriesNulls.reverse(); // Reverse order of diaryEntriesNulls so that 1920 is 0
diaryEntriesShapes.reverse(); // And diaryEntriesShapes

// Create shapes
for (var i = diaryEntriesShapes.length - 1; i >= 0; i--) {
    var thisLayer = diaryEntriesShapes[i];
    // Create and transform shape
    var shapeGroup = thisLayer.property("Contents").addProperty("ADBE Vector Group");
    shapeGroup.name = "Bar";
    var pathGroup  = thisLayer.property("Contents").property("Bar").property("Contents").addProperty("ADBE Vector Shape - Rect");
    var fillGroup  = thisLayer.property("Contents").property("Bar").property("Contents").addProperty("ADBE Vector Graphic - Fill");
    // thisLayer.property("Contents").property("Bar").property("Contents").property("Rectangle Path 1").property("ADBE Vector Rect Size").setValue([barW, barH]);
    thisLayer.property("Contents").property("Bar").property("Contents").property("Rectangle Path 1").property("ADBE Vector Rect Size").expression = "x = thisComp.layer(\"NULL - GLOBAL CONTROLLER\").effect(\"Global Bar Width\")(\"Slider\");\ny = 800;\nvalue = [x, y];";
    thisLayer.property("Contents").property("Bar").property("Contents").property("Rectangle Path 1").property("ADBE Vector Rect Position").setValue([0, barH/2]);
    thisLayer.property("Contents").property("Bar").property("Contents").property("Rectangle Path 1").property("ADBE Vector Rect Roundness").setValue([barW/2]);
    thisLayer.property("Contents").property("Bar").property("Contents").property("Fill 1").property("ADBE Vector Fill Color").expression = 
"c1 = [0, 0.97, 0.33, 1]\;\nc2 = [0.25, 0.74, 0.95, 1]\;\nparentLayer = thisComp.layer(index-1)\;\ny = parentLayer.transform.position[1]\;\nlinear(y, 1152, 1104, c1, c2)\;"

    // Parent to NULL above
    parentLayer = myComp.layer(thisLayer.index - 1);
    thisLayer.parent = parentLayer;
    thisLayer.property("position").setValue([0,0]);

}

function addGlobalNullTag(name, effectType, effectValueType) {
    var a = globalNull.property("Effects").addProperty(effectType);
    a.name = name;
    globalNull.property("Effects").property(name).property(effectValueType).setValue(0);
}

// Create GLOBAL CONTROLLER NULL
var globalNull = myComp.layers.addNull();
globalNull.name = "NULL - GLOBAL CONTROLLER";
globalNull.label = 11;
var sliderBarWidth = globalNull.property("Effects").addProperty("ADBE Slider Control");
sliderBarWidth.name = "Global Bar Width";
var sliderBarHeight = globalNull.property("Effects").addProperty("ADBE Slider Control");
sliderBarHeight.name = "Global Bar Height";
globalNull.property("Effects").property("Global Bar Width").property("Slider").setValue(barW);
globalNull.property("Effects").property("Global Bar Height").property("Slider").setValue(barHeightUnit);

addGlobalNullTag("diaryEntryYear", "ADBE Slider Control", "Slider");


function tagKeyframe(thisTag, tag) {
    if (thisTag.indexOf(tag) > -1) {
        globalNull.property("Effects").property(tag).property("Checkbox").setValueAtTime(frame, 1);
        globalNull.property("Effects").property(tag).property("Checkbox").setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    } else {
        globalNull.property("Effects").property(tag).property("Checkbox").setValueAtTime(frame, 0);
        globalNull.property("Effects").property(tag).property("Checkbox").setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);      
    }
}

function incrementKeyframeVal(f, propertyPath) {
    myProperty = propertyPath;
    myPropertyVal = myProperty.valueAtTime(i, true);
    var newKeyframeVal = myPropertyVal - 1;
    myProperty.setValueAtTime(f, newKeyframeVal);
    myProperty.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
}

count = 0;

for (var i = 24; i < diaryListYear.length; i += 6) {
    if (diaryListYear[i] != "0") {
        var frame = i * myComp.frameDuration;
        var index = (i-24)/6;
        var thisDiaryNull = diaryEntriesNulls[index];
        count = 0;
        if (diaryListYear[i] != 0) {
            incrementKeyframeVal((i + 0) * myComp.frameDuration, thisDiaryNull.transform("ADBE Position_1"));
        }
        if (diaryListYear[i+1] != 0) {
            incrementKeyframeVal((i + 1) * myComp.frameDuration, thisDiaryNull.transform("ADBE Position_1"));
        }
        if (diaryListYear[i+2] != 0) {
            incrementKeyframeVal((i + 2) * myComp.frameDuration, thisDiaryNull.transform("ADBE Position_1"));
        }
        if (diaryListYear[i+3] != 0) {
            incrementKeyframeVal((i + 3) * myComp.frameDuration, thisDiaryNull.transform("ADBE Position_1"));
        }
        if (diaryListYear[i+4] != 0) {
            incrementKeyframeVal((i + 4) * myComp.frameDuration, thisDiaryNull.transform("ADBE Position_1"));
        }
        if (diaryListYear[i+5] != 0) {
            incrementKeyframeVal((i + 5) * myComp.frameDuration, thisDiaryNull.transform("ADBE Position_1"));
        }
    } 
}