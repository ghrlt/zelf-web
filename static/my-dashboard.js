$(function() {
	const AUTH_TOKEN = document.cookie.match('(^|;)\\s*' + "zelf_token" + '\\s*=\\s*([^;]+)')?.pop() || ''
	console.log(AUTH_TOKEN)

	function loadAndDisplayPartialCardDetails() {
		$.ajax({
			url: "/zelf-api/card/get-details",
			method: "GET",
			data: AUTH_TOKEN,
			success: function(result) {
				if (result.status == -1) {
					alert(result.error)
				} else {
					card = result.data
					$("#card-holder").text(card.owner)
					$("#card-cvv").text("")
					$("#card-expi").text("")
					$("#card-number").text(card.striked_card_number)
					$("#card-number").css("cursor", "default")
				}
			}
		})
	}
	function loadAndDisplayCustomerInfos() {

		$.ajax({
			url: "/zelf-api/customer/get-infos",
			method: "GET",
			data: AUTH_TOKEN,
			success: function(result) {
				if (result.status == -1) {
					alert(result.error)
				} else {
					customer = result.data
					$("#customer-fn").text(customer.user.firstname)
					$("#customer-ln").text(customer.user.lastname)
					$("#customer-pp").attr("src", customer.avatar)
				}
			}
		})
	}

	loadAndDisplayPartialCardDetails()
	loadAndDisplayCustomerInfos()

	$("#reveal-card-details-btn").on('click', function() {		
		$.ajax({
			url: "/zelf-api/card/get-details-full",
			method: "GET",
			data: AUTH_TOKEN,
			success: function(result) {
				if (result.status == -1) {
					alert(result.error)
				} else {
					card = result.data
					$("#card-cvv").text(card.cvv)
					$("#card-expi").text(card.expiration_date)
					$("#card-number").text(card.clear_number)
					$("#card-number").css("cursor", "pointer")

					$("#reveal-card-details-btn").hide()
					$("#hide-card-details-btn").css('display', 'inline-block') //.show() use display: inline; resulting in the btn being higher
				}
			}
		})
	})
	$("#hide-card-details-btn").on('click', function() {		
		loadAndDisplayPartialCardDetails()
		$("#hide-card-details-btn").hide()
		$("#reveal-card-details-btn").show()
	})
	$(".card-details").each(function(i,obj) {
		$(this).on('click', function() {
			console.log('clicked')
			var temp = $("<div>")
			$("body").append(temp)
			temp.attr("contenteditable", true)
   			temp.html($(this).text()).select()
	    	temp.on("focus", function() {
	    		document.execCommand('selectAll',false,null)
	    	})
    		temp.focus()
			document.execCommand("copy")
			temp.remove()
		})
	})
})