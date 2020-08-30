Array.prototype.first = function() {
    return JSON.parse(JSON.stringify(this[0]));
}