function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {
  rotate: function (n, x, y) {
      if (y === 0) {
          if (x === 1) {
              this.x = n-1 - this.x;
              this.y = n-1 - this.y;
          }

          var t  = this.x;
          this.x = this.y;
          this.y = t;
      }
  }
};

function d2xy(n, d) {
    var p = new Point(0, 0);
    var rx = 0;
    var ry = 0;
    var t=d;

    for (var s=1; s<n; s*=2) {
        rx = 1 & (t/2);
        ry = 1 & (t ^ rx);
        p.rotate(s, rx, ry);
        p.x += s * rx;
        p.y += s * ry;
        t /= 4;
    }
    return p;
}

function xy2d(n, p){
        var rx;
        var ry;
        var d=0;
        for (var s=n/2; s>0; s/=2) {
            rx = (p.x & s) > 0;
            ry = (p.y & s) > 0;
            d += s * s * ((3 * rx) ^ ry);
            p.rotate(s, rx, ry);
        }
        return d;
}

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
    var groupedByPrefix = new Array(33).fill([]);
    data.forEach(function (t) {
        groupedByPrefix[10].push(t);
    });
    console.log(groupedByPrefix);
}

//loadData([], 'https://nodes.wlan-si.net/api/v2/pool/ip/?limit=100');