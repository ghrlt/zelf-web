$(function() {
	const AUTH_TOKEN = document.cookie.match('(^|;)\\s*' + "zelf_token" + '\\s*=\\s*([^;]+)')?.pop() || ''


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
	function loadAndDisplayCustomerCardBalances() {
		$.ajax({
			url: "/zelf-api/card/get-balances",
			method: "GET",
			data: AUTH_TOKEN,
			success: function(result) {
				if (result.status == -1) {
					alert(result.error)
				} else {
					$("#card-balance-text").text(result.data.bank + "€")
					$("#card-bonus-text").text(result.data.bonus + "€")
				}
			}

		})
	}
	function loadAndDisplayCustomerCardLimits() {
		$.ajax({
			url: "/zelf-api/card/get-limits",
			method: "GET",
			data: AUTH_TOKEN,
			success: function(result) {
				if (result.status == -1) {
					alert(result.error)
				} else {
					$("#limit-spent-text").text(result.data.spending.spent+"€")
					$("#limit-spentlimit-text").text(result.data.spending.limit+"€")
					$("#limit-topup-text").text(result.data.topup.topped_up+"€")
					$("#limit-topuplimit-text").text(result.data.topup.limit+"€")

					$("#limit-bonus-text").text(result.data.bonus.used+"€")
					$("#limit-bonuslimit-text").text(result.data.bonus.limit+"€")
				}
			}

		})
	}

	loadAndDisplayCustomerInfos()
	loadAndDisplayPartialCardDetails()
	loadAndDisplayCustomerCardBalances()

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


	$("#topup-btn").on('click', function() {
		$.ajax({
			url: "/zelf-api/card/request-topup-link",
			method: "GET",
			data: AUTH_TOKEN,
			success: function(result) {
				if (result.state == -1) {
					alert(result.error)
				} else {
					window.open(result.data, '_blank').focus();
				}
			}

		})
	})
	$("#limits-btn").on('click', function() {
		loadAndDisplayCustomerCardLimits()
		$("#limits-box").show()
	})
})