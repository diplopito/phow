var phax = (function () {

    var version = '0.1';

    function xhrConnection (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {

            switch(this.readyState) {
                case 2:
                    if (callback === 'abort') {
                        this.abort();
                    }
                    break;
                
                case 4: 
                    if (this.status = 200 && (typeof callback === 'function')) {
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
