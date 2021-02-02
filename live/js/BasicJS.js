// BasicJS.js
// Developed by TLCC Consultants Pte. Ltd.
// Company Website:  http://defi.tlccc.sg/
//
// FILE LICENSE: MIT License, applicable to this file, 2021
//
// Project Github: https://github.com/tlccstudio/telosAPIQueries
//
// 


// ******************* BASIC FUNCTIONS *********************** //
function _isObject(val)
{ if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') ); }

function _isInt(n)
{ return Number(n) === n && n % 1 === 0; }

function _isFloat(n)
{ return Number(n) === n && n % 1 !== 0; }
//*************************************************************//


// ****************** INPUT CORRECTION *********************** //

// function _cleanTelosUser(userName)
// This function is to help correct / sanitize 
//  user input when they provide a username.
// One way to make apps more friendly to assume users
//  input things wrongly, such as spaces before / after usernames.
//
// userName - string, Telos Blockchain Username given by user
//
// returns - string, with spaces and other characters removed
//           on error returns ""
function _cleanTelosUser(userName)
{
	if (typeof userName !== 'undefined')
	{
		if(userName !== "")
		{
			var sReturn = userName.replaceAll(" ", ""); //no spaces
			sReturn = sReturn.replaceAll("\\", "");
			sReturn = sReturn.replaceAll("/", "");
			sReturn = sReturn.replaceAll("\n", ""); //no newline character
			sReturn = sReturn.replaceAll("\t", ""); //no tab character
			sReturn = sReturn.replaceAll("\r", ""); //no return character
			sReturn = sReturn.replaceAll("\f", ""); //no formfeed character
			sReturn = sReturn.replaceAll("\"", ""); //no quote character
			sReturn = sReturn.replaceAll("'", ""); //no quote character
			sReturn = sReturn.replaceAll(":", ""); //no color character
			sReturn = sReturn.replaceAll(";", ""); //no semicolon character
			sReturn = sReturn.replaceAll("[", ""); 
			sReturn = sReturn.replaceAll("]", ""); 
			sReturn = sReturn.replaceAll("{", ""); 
			sReturn = sReturn.replaceAll("}", ""); 
			sReturn = sReturn.replaceAll("|", ""); 
			sReturn = sReturn.replaceAll("(", ""); 
			sReturn = sReturn.replaceAll(")", ""); 
			sReturn = sReturn.replaceAll(",", ""); 
			
			return sReturn;
		}
	}
	
	return "";
}
//*************************************************************//

