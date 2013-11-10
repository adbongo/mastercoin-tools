$(document).ready(function () {

    var myURLParams = BTCUtils.getQueryStringArgs();
    console.log(myURLParams);


    var tx = myURLParams['tx'];
    var currency = myURLParams['currency'];


    //Ajax call so I can see transactionType from JSON
    var url = '/tx/' + tx + '.json';
    $.ajax({
	url: url,
	type: 'get',
	success: function (data) {
	    //successfull callback, forward user to original_url
	    //  window.location = url;
	    var url = "";

	    var response = data;
	    console.log(response);
	    console.log(response[0].transactionType);
	    var transactionType = response[0].transactionType;
	    if (transactionType == '00000000') {
		//it is simplesend
		url += "simplesend.html?tx=";
	    }
	    else if (transactionType == '00000014') {
		//it is a sell offer
		url += "selloffer.html?tx=";
	    }
	    else if (transactionType == '00000016') {
		//it is a sell accept
		url += "sellaccept.html?tx=";
	    }
	    else {
		//no transactionType - it is btc payment.
		url += "btcpayment.html?tx=";
	    }

	    url += tx + "&currency=" + currency;

	    console.log(url);
	    window.location = url;
	},
	error: function () {
	    console.log('Error');
	}
    });
});