var phax = (function () {

    var version = '0.1.2';

    /* Ajax call in two steps: 
       Step 1: case 4 sends the request and receives response; 
       Step 2: case 2 sends the request but aborts it, like a ping
    */
    function xhrConnection (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            //Step 1
            if (this.readyState === 4) {
                    if (this.status === 200 && (typeof callback === 'function')) {
                        callback(xhr.response);
                    }                
            }
        };
        
        xhr.open('POST', url);
        xhr.send((typeof data === "object") ? JSON.stringify(data) : data);
        
        //Step 2: leave worker running and continue
        if (callback === 'abort') {
            setTimeout(function() {
                xhr.abort();           
            }, 1000);
        }
        
    }

    function send(url, data) {
        xhrConnection(url, data, phing);
    }

    function phing(data) {
        var obj = JSON.parse(data),
            url = obj.url;
        xhrConnection(url, data, 'abort');
    }

    return {
        send: send
    }

})();
