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