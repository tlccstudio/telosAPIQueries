# telosAPIQueries - Developer Branch
Open source code project for managing Telos Public Blockchain API Queries.

Presently just used for testing API nodes for history and chain queries.

## Usage (html,javascript,jquery,php) - no live database needed
Put folders in a web server directory, navigate to the /sys folder.  Presently works of the index.html file.

![Telos API Manager v0.80b](https://i.imgur.com/KIavxVN.png)

💾 Save Icon - Saves / Updates the entry inside the telosAPIList.json file

❌ Delete Icon - Deletes the entry from telosAPIList.json file

🔺 Arrow Up - Moves to top, the entry to be first in telosAPIList.json file

⛏ Build Icon - Selects this specific API for testing using interface below under "Selected API Interface"

## Modifying for your own testing needs
Line 24 of file /sys/js/buildNodeMenu.js begins the function buildAllTests()

This function looks at the presently selected API node, paying attention to its flags of whether it is a history endpoint, chain endpoint, etc.

This function then builds out different tests to perform by using 2 lines of code:

```
aVars = ["code,eosio.token","account,eosio","symbol,TLOS"];
sTests = sTests + singleHtmlTest("get_currency_balance", urlAPIQuery(sURL, "get_currency_balance", aVars, sType) , sType, aVars, 5);
```
### aVars
An array of string elements ["...", "...", "...", ...] , each element of the string is separated by a comma "," .  The first half preceeding the comma is the name of the variable.  The second half of the string following the comma is the value of the variable for the API Query.  Adding more elements to the array, creates more variables to query.

### function singleHtmlTest(test_name, url, type, vars, index)
```
// generates html for single node test
//
// test_name - string, name of test
// url - string, test url
// type - "post" or "get"
// vars - array of strings, each element: "varName,varVal"
// index - integer, index
//
// returns - string, html of interface for each node test
```
