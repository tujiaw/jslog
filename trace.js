'use strict';

function currentDate() {
    var date = new Date();
    var month = parseInt(date.getMonth()) + 1;
    var result = date.getFullYear() + '/' +
                 month + '/' +
                 date.getDate() + ' ' +
                 date.getHours() + ':' +
                 date.getMinutes() + ':' +
                 date.getSeconds() + '.' +
                 date.getMilliseconds();
    return result;
}

function callerInfo(index) {
    var errorObject = function() {
        try {throw Error('')} catch(err) { return err;}    
    }
    var line = errorObject().stack.split('\n')[index];
    var functionName = line.split("@")[0];
    var fileNameAndLineNumber = line.substring(line.lastIndexOf('/') + 1, line.lastIndexOf(':'));
    return '[' + fileNameAndLineNumber + ' ' + functionName + ']';
}

function trace() {    
    var content = currentDate();
    content = content + ' ' + callerInfo(3);
    for (var i=0; i<arguments.length; i++) {
        content = content + ' ' + arguments[i];
    }
    $.ajax({
        type:'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 3000,
        url: 'http://127.0.0.1:8888/log?data=' + content,
        success: function(data) {
            
        },
        error: function() {
            alert('error');
        }
    })
}