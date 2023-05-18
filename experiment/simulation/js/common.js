function verify_values(value, truevalue) {
    if ((truevalue == 0) && (value == truevalue)) {
        return true;
    }
    let calculated_value = Math.abs((truevalue - value) / truevalue * 100);
    if (calculated_value <= 4) {
        return true;
    }
    else {
        return false;
    }
}
function random(min, max) {
    let num = (max - min) * Math.random() + min;
    return num;
}
function std_deviation(num) {
    let std = num / 100.0;
    let dev = num - random(-std, std);
    return dev;
}
function regression_linear(x, y) {
    let sumx = 0;
    let sumy = 0;
    let sumxy = 0;
    let sumxx = 0;
    let n = x.length;
    for (let i = 0; i < n; i++) {
        sumx += x[i];
        sumy += y[i];
        sumxy += x[i] * y[i];
        sumxx += x[i] * x[i];
    }
    let pol = [];
    pol[0] = (sumx * sumy - n * sumxy) / (Math.pow(sumx, 2) - n * sumxx);
    pol[1] = (sumy - pol[0] * sumx) / n;
    return (pol);
}
function newton_raphson(a, b, c) {
    let root = 0.2;
    for (let i = 0; i <= 100; i++) {
        root = root - f(a, b, c, root) / df(a, b, c, root);
    }
    return root;
}
function f(a, b, c, x) {
    let fx = a * x - b * Math.pow(x, 2) * (1 - Math.exp(-1 / x)) - c;
    return fx;
}
function df(a, b, c, x) {
    let fx = a - b * x * 2 + b * Math.exp(-1 / x) + 2 * b * x * Math.exp(-1 / x);
    return fx;
}
var c = 32386.13959 / Math.pow(411.4789768, 2);
var a = 2;
var b = 2;
//# sourceMappingURL=common.js.map