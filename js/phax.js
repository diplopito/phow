var phax = (function () {

    var version = '0.1';

    /* Ajax call in two steps: 
       Step 1: case 4 sends the request and receives response; 
       Step 2: case 2 sends the request but aborts it, like a ping
    */
    function xhrConnection (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {

            switch(this.readyState) {
                case 2:
                    if (callback === 'abort') {
                        this.abort();
                    }
                    break;
                
                //Receives the parameters for the queue or worker
                case 4: 
                    if (this.status === 200 && (typeof callback === 'function')) {
                        callback(xhr.response)
                    }
                    break;                
            }
        }
        
        xhr.open('POST', url);
        xhr.send((typeof data === "object") ? JSON.stringify(data) : data);
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
