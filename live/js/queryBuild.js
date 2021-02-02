
//function urlAPIQuery(sURL, sCom, aVars)
// generates html for single node
//
// sURL - string, endpoint URL
// sCom - string, command at endpoint
// aVars - array of "variable,value"
// sType - "post" or "get"
// 
//
// returns - string, url interface for query
function urlAPIQuery(sURL, sCom, aVars, sType)
{
    if(sType === "post")
    {
        var sRet = sURL + sCom;
        
        return sRet;
    }
    
    var sRet = sURL + sCom + "?";
    
    for(i=0; i < aVars.length; i++)
    {
        sRet = sRet + aVars[i].split(",")[0] + "=" + aVars[i].split(",")[1] + "&";
    }
    
    if(aVars.length > 0)
    { sRet = sRet.slice(0, -1); }
    
    return sRet;
}

//function apiQuery(sURL, sCom, sType, aVars, funcCallback, errorCallback = function() {})
// performs get or post api query
//
// sURL - string, endpoint URL
// sCom - string, command at endpoint
// sType - "post" or "get"
// aVars - array of "variable,value"
// funcCallback(ret) - callback with data
// errorCallback() - callback if error
// 
//
// returns - nothing
function apiQuery(sURL, sCom, sType, aVars, funcCallback, errorCallback = function() {})
{
    
    if(sType === "post")
    {
        var qURL = urlAPIQuery(sURL, sCom, aVars, sType);
    
        var post_data = {};
        
        for(i=0; i < aVars.length; i++)
        { post_data[aVars[i].split(",")[0]] = aVars[i].split(",")[1]; }
        
        post_data = JSON.stringify(post_data);
        
        $.ajax({
        url: qURL,
        type: 'POST',
        data: post_data,
        success: function(data, status){
            var ret = {};
            ret.data = data;
            ret.status = status;
            
            funcCallback(ret);
        },
        error: function(status, data){
            var ret = {};
            ret.data = data;
            ret.status = status;
            
            errorCallback(ret);
        }
        });
        
        return;
    }
    
    var qURL = sURL;
    
    $.ajax({
        url: qURL,
        type: 'GET',
        success: function(data, status){
            var ret = {};
            ret.data = data;
            ret.status = status;
            
            funcCallback(ret);
        },
        error: function(status, data){
            var ret = {};
            ret.data = data;
            ret.status = status;
            
            errorCallback(ret);
        }
        });
}
