function loadData(pools, url) {
    $.getJSON( url, function( data ) {
        if (data["next"] === null) {
            pools = pools.concat(data["results"]);
            processData(pools);
        }
        else{
            pools = pools.concat(data["results"]);
            loadData(pools, data["next"]);
        }
    });
}

function processData(data) {
    console.log(data)
}

loadData([], 'https://nodes.wlan-si.net/api/v2/pool/ip/?limit=100');