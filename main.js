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

function ip2num(ip){
    ip = ip.split(".");
    return parseInt(ip[0])*256**3 + parseInt(ip[1])*256**2 + parseInt(ip[2])*256 + parseInt(ip[3]);
}

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
        if (data["next"] !== null) {
            loadData(pools, data["next"]);
        }

        data["results"].forEach(function (f) {
            var p = d2xy(2**32, ip2num(f["network"]));
            var network_size = (2**(32-parseInt(f["prefix_length"])))**0.5;
            poolsGroup.append("svg:rect")
                .attr("x", p.x)
                .attr("y", p.y)
                .attr("width", network_size)
                .attr("height", network_size)
                .style("opacity", 0.1);
        });

        var bbox = poolsGroup.node().getBBox();

        svgContainer.transition().attr("viewBox", bbox.x+" "+bbox.y+" "+bbox.width+" "+bbox.height);
    });
}

function zoomToPool(ip, prefix) {
    
}

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 500)
                                    .attr("height", 500)
                                    .attr("viewBox", "0 0 65535 65535")
                                    .attr("preserveAspectRatio" , "xMinYMin meet");

var poolsGroup = svgContainer.append("svg:g");

loadData([], 'https://nodes.wlan-si.net/api/v2/pool/ip/?limit=100');
