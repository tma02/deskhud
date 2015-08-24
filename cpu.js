var os = require("os");
module.exports = {
  updateInterval: 200,
  getLabel: function() {
    var endMeasure = cpuAverage();
    averages.push(endMeasure);
    if (averages.length > 50) {
      startMeasure = averages.shift();
    }
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
    return "<i class=\"fa fa-cog fa-spin\"></i> " +percentageCPU + "%";
  }
};
//https://gist.github.com/bag-man/5570809
//Modified to show average from last 10 seconds
function cpuAverage() {
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();
  for (var i = 0, len = cpus.length; i < len; i++) {
    var cpu = cpus[i];
    for(type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}
var startMeasure = cpuAverage();
var averages = [];