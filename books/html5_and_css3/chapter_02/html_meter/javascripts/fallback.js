function noMeterSupport() {
	return true;
	// return (document.createElement('meter').max === undefined)
}

if (noMeterSupport()) {
	var fakeMeter, fill, label, labelText, max, meter, value;

	meter = $("pledge_goal");
	value = meter.attr("value");
	max = meter.attr("max");
	labelText = "$" + meter.val();

	fakeMeter = $("<div></div>");
	fakeMeter.addClass("meter");
	label = $("<span>" + labelText + "</span>");
	label.addClass("label");
	meter.replaceWith(fakeMeter);
}