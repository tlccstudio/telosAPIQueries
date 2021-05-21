
function buildAllNodes()
{
    $('#api_nodes').html('');
    
    $.ajax({url: "./pscript/queryAll.php", success: function(res){
        if(res.success === 1)
        {
            var dArray = res.data;
            var sNodes = '';
            
            for(i = 0; i < dArray.length; i++)
            {
                sNodes = sNodes + singleHtmlNode(dArray[i].url, dArray[i].flags, dArray[i].active, dArray[i].type, i);
            }
            
            sNodes = sNodes + singleHtmlNode("", "", 0, "get", i, true);
            
            $('#api_nodes').html(sNodes);
        }
    }});
}

function buildAllTests()
{
    var sURL = $('.test_url').val();
    var sType = $('.test_type').val();
    var sFlags = $('.test_flags').val();
    
    var bH = (sFlags.search("h") !== -1);
    var bC = (sFlags.search("c") !== -1);
    var bS = (sFlags.search("s") !== -1);
    var bT = (sFlags.search("t") !== -1);
    
    var aVars = [];
    var sTests = '';
    
    //History Tests
    if(bH)
    {
        sTests = sTests + '<h5>History Tests</h5>';
        
        aVars = ["limit,5", "account,eosio", "skip,0"];
        sTests = sTests + singleHtmlTest("get_actions", urlAPIQuery(sURL, "get_actions", aVars, sType) , sType, aVars, 0);
       
        aVars = ["limit,5", "account,cinvestor.jc", "skip,0"];
        sTests = sTests + singleHtmlTest("get_actions", urlAPIQuery(sURL, "get_actions", aVars, sType) , sType, aVars, 1);
        
        aVars = ["id,55420e96a802428fb2c25fccfe46a442a16df30e7326f6393a3179f1c4be75cd"];
        sTests = sTests + singleHtmlTest("get_transaction", urlAPIQuery(sURL, "get_transaction", aVars, sType) , sType, aVars, 2);
        
    }
    
    if(bC)
    {
        sTests = sTests + '<h5>Chain Tests</h5>';
        aVars = ["code,revelation21", "symbol,HEART"];
        sTests = sTests + singleHtmlTest("get_currency_stats", urlAPIQuery(sURL, "get_currency_stats", aVars, sType) , sType, aVars, 2);
        aVars = ["block_num_or_id,1334444"];
        sTests = sTests + singleHtmlTest("get_block", urlAPIQuery(sURL, "get_block", aVars, sType) , sType, aVars, 3);
        aVars = ["account_name,eosio"];
        sTests = sTests + singleHtmlTest("get_account", urlAPIQuery(sURL, "get_account", aVars, sType) , sType, aVars, 4);
        aVars = ["code,eosio.token","account,eosio","symbol,TLOS"];
        sTests = sTests + singleHtmlTest("get_currency_balance", urlAPIQuery(sURL, "get_currency_balance", aVars, sType) , sType, aVars, 5);
        aVars = ["code,revelation21","json,true","limit,20","scope,revelation21","table,accounts"];
        sTests = sTests + singleHtmlTest("get_table_rows", urlAPIQuery(sURL, "get_table_rows", aVars, sType) , sType, aVars, 6);
 }
    
    $('#api_tests').html(sTests);
}

function saveNode(index)
{
    var iName = 'api_node_' + index;
    
    var sURL = document.getElementById(iName).value;
    var sActive = document.getElementById(iName + "_act").checked ? 1 : 0;
    var sH = document.getElementById(iName + "_h").checked;
    var sC = document.getElementById(iName + "_c").checked;
    var sS = document.getElementById(iName + "_s").checked;
    var sT = document.getElementById(iName + "_t").checked;
    var sFlags = '';
    var sType = document.getElementById(iName + "_type").checked ? "post" : "get";
    
    if(sH)
    { sFlags = sFlags + 'h,'; }
    if(sC)
    { sFlags = sFlags + 'c,'; }
    if(sS)
    { sFlags = sFlags + 's,'; }
    if(sT)
    { sFlags = sFlags + 't,'; }
    
    if(sFlags.length > 0)
    { sFlags = sFlags.substring(0, sFlags.length - 1); }
    
    var qURL = "./pscript/set.php?url=" + sURL + "&flags=" + sFlags + "&active=" + sActive + "&type=" + sType;
   
    $.ajax({url: qURL, success: function(res){
        if(res.success === 1)
        { console.log("node #" + index + " saved!"); }
        else
        { console.log("node #" + index + " failed to save!"); }
        buildAllNodes();
    }});
}

function deleteNode(index)
{
    var iName = 'api_node_' + index;
    
    var sURL = document.getElementById(iName).value;
    
    var qURL = "./pscript/rem.php?url=" + sURL;
   
    $.ajax({url: qURL, success: function(res){
        if(res.success === 1)
        { console.log("node #" + index + " deleted!"); }
        else
        { console.log("node #" + index + " failed to delete!"); }
        buildAllNodes();
    }});
}

function addNode(index)
{
    var iName = 'api_node_' + index;
    
    var sURL = document.getElementById(iName).value;
    var sActive = document.getElementById(iName + "_act").checked ? 1 : 0;
    var sH = document.getElementById(iName + "_h").checked;
    var sC = document.getElementById(iName + "_c").checked;
    var sS = document.getElementById(iName + "_s").checked;
    var sT = document.getElementById(iName + "_t").checked;
    var sFlags = '';
    
    var sType = document.getElementById(iName + "_type").checked ? "post" : "get";
    
    
    if(sH)
    { sFlags = sFlags + 'h,'; }
    if(sC)
    { sFlags = sFlags + 'c,'; }
    if(sS)
    { sFlags = sFlags + 's,'; }
    if(sT)
    { sFlags = sFlags + 't,'; }
    
    if(sFlags.length > 0)
    { sFlags = sFlags.substring(0, sFlags.length - 1); }
    
    var qURL = "./pscript/add.php?url=" + sURL + "&flags=" + sFlags + "&active=" + sActive + "&type=" + sType;
   
    $.ajax({url: qURL, success: function(res){
        if(res.success === 1)
        { console.log("node #" + index + " added!"); }
        else
        { console.log("node #" + index + " failed to add!"); }
        buildAllNodes();
    }});
}

function upNode(index)
{
    var iName = 'api_node_' + index;
    
    var qURL = "./pscript/up.php?index=" + index;
   
    $.ajax({url: qURL, success: function(res){
        if(res.success === 1)
        { console.log("node #" + index + " moved!"); }
        else
        { console.log("node #" + index + " failed to move!"); }
        buildAllNodes();
    }});
}

function testNode(index)
{
    var iName = 'api_node_' + index;
    
    var sURL = document.getElementById(iName).value;
    var sActive = document.getElementById(iName + "_act").checked ? 1 : 0;
    var sH = document.getElementById(iName + "_h").checked;
    var sC = document.getElementById(iName + "_c").checked;
    var sS = document.getElementById(iName + "_s").checked;
    var sT = document.getElementById(iName + "_t").checked;
    var sFlags = '';
    var sType = document.getElementById(iName + "_type").checked ? "post" : "get";
    
    if(sH)
    { sFlags = sFlags + 'h,'; }
    if(sC)
    { sFlags = sFlags + 'c,'; }
    if(sS)
    { sFlags = sFlags + 's,'; }
    if(sT)
    { sFlags = sFlags + 't,'; }
    
    if(sFlags.length > 0)
    { sFlags = sFlags.substring(0, sFlags.length - 1); }
    
    $(".test_url").val(sURL);
    $(".test_type").val(sType);
    $(".test_flags").val(sFlags);
    $("#test_out").val('');
    
    buildAllTests();
}

function setResponseCode(index, code)
{
    var iName = 'api_test_' + index + "_code";
    
    if(code === 200)
    { document.getElementById(iName).innerHTML = "&nbsp;&nbsp;<span style='color: green;'><b>200</b></span>"; }
    else
    { document.getElementById(iName).innerHTML = "&nbsp;&nbsp;<span style='color: red;'><b>Error!</b></span>"; }
}

function apiNode(index)
{
    var iName = 'api_test_' + index;
    var sURL = document.getElementById(iName).value;
    var sType = $('.test_type').val();
    var aVars = JSON.parse(document.getElementById(iName + '_hidden').value);
    
    if(sType === "post")
    {
        apiQuery(sURL, '', sType, aVars, function(res) {$('#test_out').val(JSON.stringify(res)); console.log(res); setResponseCode(index, 200);}, function() {setResponseCode(index, 'error');});
    }
    
    if(sType === "get")
    {
        apiQuery(sURL, '', sType, aVars, function(res) {$('#test_out').val(JSON.stringify(res)); console.log(res); setResponseCode(index, 200);}, function() {setResponseCode(index, 'error');});
    }
}

//function singleHtmlNode(url, flags, active, index)
// generates html for single node
//
// url - string, url beginning with http:// or https://
// flags - string, comma separated such as "h,c,s,t"
//          represents flags which api node has
//          h = history, c = chain, s = state, t = transact
// active - integer, 0 or 1
// type - 'get' or 'post'
// index - integer, 0 and up, whole number
// toAdd - boolean, true means this is to add new entries
//
// returns - string, html of interface for each node
function singleHtmlNode(url, flags, active, type, index, toAdd = false)
{
    var ret = '';
    var iName = 'api_node_' + index;
    
    if( active )
    { ret = ret + '<input type="checkbox" id="' + iName + '_act" name="' + iName + '_act" value="active" checked> <label for="' + iName + '_act"> Active?</label> &nbsp; '; }
    else
    { ret = ret + '<input type="checkbox" id="' + iName + '_act" name="' + iName + '_act" value="active"> <label for="' + iName + '_act"> Active?</label> &nbsp; '; }
    
    ret = ret + 'node ' + index + ':&nbsp;';
    ret = ret + '<input type="text" id="' + iName + '" name="' + iName + '" value="' + url + '" ' + ((toAdd) ? '' : 'readonly') + '>';
  
    if( flags.indexOf("h") !== -1 )
    { ret = ret + '<input type="checkbox" id="' + iName + '_h" name="' + iName + '_h" value="history" checked> <label for="' + iName + '_h"> H</label>'; }
    else
    { ret = ret + '<input type="checkbox" id="' + iName + '_h" name="' + iName + '_h" value="history"> <label for="' + iName + '_h"> H</label>'; }
    
    if( flags.indexOf("c") !== -1 )
    { ret = ret + '<input type="checkbox" id="' + iName + '_c" name="' + iName + '_c" value="chain" checked> <label for="' + iName + '_c"> C</label>'; }
    else
    { ret = ret + '<input type="checkbox" id="' + iName + '_c" name="' + iName + '_c" value="chain"> <label for="' + iName + '_c"> C</label>'; }

    if( flags.indexOf("s") !== -1 )
    { ret = ret + '<input type="checkbox" id="' + iName + '_s" name="' + iName + '_s" value="state" checked> <label for="' + iName + '_s"> S</label>'; }
    else
    { ret = ret + '<input type="checkbox" id="' + iName + '_s" name="' + iName + '_s" value="state"> <label for="' + iName + '_s"> S</label>'; }

    if( flags.indexOf("t") !== -1 )
    { ret = ret + '<input type="checkbox" id="' + iName + '_t" name="' + iName + '_t" value="trans" checked> <label for="' + iName + '_t"> T</label>'; }
    else
    { ret = ret + '<input type="checkbox" id="' + iName + '_t" name="' + iName + '_t" value="trans"> <label for="' + iName + '_t"> T</label>'; }

    if( type === "post" )
    { ret = ret + '<input type="checkbox" id="' + iName + '_type" name="' + iName + '_type" value="post" checked> <label for="' + iName + '_type"> Post?</label>'; }
    else
    { ret = ret + '<input type="checkbox" id="' + iName + '_type" name="' + iName + '_type" value="post"> <label for="' + iName + '_type"> Post?</label>'; }

    if(toAdd === false)
    { ret = ret + ' &nbsp; <button id="' + iName + '_save" onclick="saveNode(' + index + ')" title="Save">&#128190;</button>'; }
    else
    { ret = ret + ' &nbsp; <button id="' + iName + '_add" onclick="addNode(' + index + ')" title="Add">&#128190;</button>'; }
    
    if(toAdd === false)
    { ret = ret + ' &nbsp; <button id="' + iName + '_remove" onclick="deleteNode(' + index + ')" title="Delete">&#10060;</button>'; }
    
    if(toAdd === false)
    { ret = ret + ' &nbsp; <button id="' + iName + '_up" onclick="upNode(' + index + ')" title="Move to Top">&#128314;</button>'; }

    if(toAdd === false)
    { ret = ret + ' &nbsp; <button id="' + iName + '_test" onclick="testNode(' + index + ')"  title="Test">&#9935;</button>'; }
   
    ret = ret + '<br>';

    return ret;
}

//function singleHtmlTest(test_name, url, index)
// generates html for single node test
//
// test_name - string, name of test
// url - string, test url
// type - "post" or "get"
// vars - array of strings, each element: "varName,varVal"
// index - integer, index
//
// returns - string, html of interface for each node test
function singleHtmlTest(test_name, url, type, vars, index)
{
    var ret = '';
    var iName = 'api_test_' + index;
    
    ret = ret + test_name + '&nbsp;<input type="text" id="' + iName + '" name="' + iName + '" value="' + url + '" style="width: 60%;" readonly>';
    ret = ret + '<span id="' + iName + '_code"></span>';
    ret = ret + ' &nbsp; <button id="' + iName + '_api" onclick="apiNode(' + index + ')"  title="Test">&#9881;</button>';
    ret = ret + '<input type="hidden" id="' + iName + '_hidden" name="' + iName + '_hidden" value=\'' + JSON.stringify(vars) + '\'><br>';
   
    return ret;
}

