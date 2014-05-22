function Railo.Json 
has a variable:
escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\u0026\u002B]/g,

which should also include the characters \u0026 and \u002B  (& and +)
I found the + character was also breaking the parameter during testing.

Railo.ajaxProxy.invokeMethod = function (d, e, p) {
    var q = {};
    for (var g in p) {
        if (typeof (p[g]) == "object") {
            for (var l in p[g]) {
                q[l] = p[g][l]
            }
        } else {
//            if (p[g]) {
            if (p[g] || p[g] === 0) {
                q[g] = p[g]
            }
        }
    }
