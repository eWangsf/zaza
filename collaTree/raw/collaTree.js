var svg,
    g,
    width,
    height,
    interval = 80;

var colla;

var r = 4.5;
var count = 1;

window.onload = function () {
    svg = document.getElementsByTagName('svg')[0];
    g = svg.getElementsByTagName('g')[0];
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    colla = new collaTree(data, g);
    colla.collapse(this.data);
    colla.start();

    var nodes = g.getElementsByTagName('g');
    // console.log(colla.data);

    for(var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function () {
            var name = this.getElementsByTagName('text')[0].innerHTML;
            colla.toggle(colla.data, name);
            colla.start();
        }
    }

}

function collaTree(data, g) {
    this.data = data;
    this.container = g;
}

collaTree.prototype.start = function () {
    this.container.innerHTML = '';
    var root = this.data;
    root.x0 = height / 2;
    root.y0 = 0;
    root.y = root.y0;
    root.x = root.x0;
    root.depth = 0;
    root.id = 1;
    root.num = 0;
    console.log(root);
    this.update(root);
    this.render(root);
};

collaTree.prototype.collapse = function (o) {
    if (o.children) {
      o._children = o.children;
      for(var i = 0; i < o._children.length; i++) {
        this.collapse(o._children[i]);
      }
      o.children = null;
    }
}

collaTree.prototype.getNum = function (source) {
    if(!source.children) {
        source.num = 1;
        return 1;
    }
    var children = source.children;
    for(var i = 0; i < children.length; i++) {
        source.num += this.getNum(children[i]);
    }
    return source.num;
}

collaTree.prototype.update = function (source) {
    if(!source.children) {
        source.children = source._children;
        source._children = null;
    }

    source.num = this.getNum(this.data);
    // console.log(source);
    var children = source.children;
    var thisobj;
    for(var i = 0, j = - (source.num - 1) / 2; i < children.length; i++, j++) {
        thisobj = children[i];
        thisobj.depth = source.depth + 1;
        thisobj.y = thisobj.depth * 180;
        if(!thisobj.id) {
            thisobj.id = ++count;
        }
        thisobj.x0 = source.x0;
        thisobj.y0 = source.y0;
        if(!thisobj.parents) {
            thisobj.parents = [];
        }
        thisobj.parents.push(source);
        thisobj.x = source.x + ((height / source.num) > interval ? interval : (height / source.num)) * j;
        // thisobj.x = source.x + (interval) * j;
    }    
}

collaTree.prototype.render = function (source) {
    if(!source.children) {
        return ;
    }
    var children = source.children;
    
    // links
    var linksStr = '';
    for(var i = 0; i < children.length; i++) {
        thisobj = children[i];
        var dy = thisobj.y - source.y;
        // linksStr += '<path class="link" d="M' + source.y + ' ' + source.x 
        //         + ' C' + source.y + ' ' + (2 * source.x / 3 + (thisobj.x - source.x) / 3) 
        //         + ' ' + source.y + ' ' + (source.x / 3 + 2 * (thisobj.x - source.x) / 3) 
        //         + ' ' +  thisobj.y + ' ' + thisobj.x + ' " />';
        linksStr += '<path class="link" d="M' + source.y + ' ' + source.x 
                + ' C' + (source.y + dy / 3) + ' ' + (source.x)
                + ' ' + (source.y + 2 * dy / 3) + ' ' + (thisobj.x) 
                + ' ' +  thisobj.y + ' ' + thisobj.x + ' " />';
    }
    this.container.innerHTML += linksStr;

    // nodes
    var nodesStr = '';
    nodesStr += '<g class="node" transform="translate(' + source.y + ', ' + source.x + ')">'
            + '<circle r="4.5" style="fill: ' + (source.children || source._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + source.name + '</text>'
            + '</g>';
    var thisobj;
    for(var i = children.length - 1; i >= 0; i--) {
        thisobj = children[i];
        nodesStr += '<g class="node" transform="translate(' + thisobj.y + ', ' + thisobj.x + ')">'
            + '<circle r="4.5" style="fill: ' + (thisobj.children || thisobj._children ? 'rgb(176, 196, 222)' : 'rgb(255, 255, 255)') + ';"></circle>'
            + '<text x="-10" dy=".35em" text-anchor="end" style="fill-opacity: 1;">' + thisobj.name + '</text>'
            + '</g>';
    }
    this.container.innerHTML += nodesStr;


    for(var i = 0; i < source.children.length; i++) {
        this.render(source.children[i]);
    }
}

collaTree.prototype.toggle = function (obj, name) {
    // console.log(obj);
    if(obj.name === name) {
        if(obj.children) {
            obj._children = obj.children;
            obj.children = null;
        } else {
            obj.children = obj._children;
            obj._children = null;
        }
        // console.log(this.data);
        return true;
    }
    

    if (!obj.children) {
        return ;
    }

    for(var i = 0; i < obj.children.length; i++) {
        this.toggle(obj.children[i], name);
    }
}

