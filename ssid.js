module.exports = {
	updateInterval: 10000,
	getLabel: function() {
		return "<i class=\"fa fa-wifi\"></i> " + ssid;
	}
};
var ssid = "";
refreshSSID();
setInterval(refreshSSID, 10000);

function refreshSSID() {
  //OS X
	require('child_process').exec("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}'", function (err, stdout, stderr){
    if (err) {
      console.log("child processes failed with error code: " +
        err.code);
    }
    ssid = stdout;
	});
}