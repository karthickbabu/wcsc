// For Developers / Data providers
 
1. Validate Input xslx sheet (eg. 2021_04_23_WCSC_Centers.xslx)
-- Remove empty columns
-- Replace "/r" with ""
-- Replace "/n" with ""
-- Validate Mandatory Column names (used for Map and Table) - Name, Country, State, City, long, lat, Address
-- Validate Optional Column names (may be used in future) - CenterNumber, Zone, ContactPersonName, Mobile_1, Mobile_2, Landline, Email
2. Open input xlsx file in Excel and "Save As" csv. (eg. 2021_04_23_WCSC_Centers.csv)
3. Open in Excel, Sort by three levels. Country, State, City.

// ******* To convert data for importing to spayee (for Developers) *******

4. Run "npm install"
5. Run "node parse-centers.js -i 2021_04_23_WCSC_Centers.csv"