var os = require("os");
module.exports = {
	getLabel: function() {
		return "<i class=\"fa fa-tasks\"></i> " + (~~b2m(totalMem - os.freemem()) / 1024).toFixed(2) + "/" + m2g(b2m(totalMem));
	}
};
var totalMem = os.totalmem();

function b2m(val) {
	return val / 1048576;
}

function m2g(val) {
	return val / 1024;
}