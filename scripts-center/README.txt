*** Preprocess xlsx file ***
1. Fix the column names to Continent, Country, State, City, Name, CenterNumber, long, lat, Address, Zone, ContactPersonName, Mobile_1, Mobile_2, Landline, Email
2. Replace "\r" with ""
3. Replace "\n" with ""
4. Remove columns if empty
4. Save as csv.

*** Parse files and convert it to required format ***
node parse-centers.js -i 2021_04_23_WCSC_Centers.csv
Copy centers.geojson, sky-centers.json and sky-center-by-country.json to skyyoga folder.