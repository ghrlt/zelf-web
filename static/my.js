$(function() {
	$("#login-tel-input").focus()

	$("#login-step-one-btn").on('click', function() {
		$('.text-error').each(function(i,obj) {$(this).text("")})

		// Only server-side check or local too?

		$.ajax({
			url: "/zelf-api/login/request-otp",
			method: "POST",
			data: {
				"phone_number": $("#login-tel-input").val()
			},
			success: function(result) {
				if (result.state == -1) {
					$("#login-error").text(result.error)
				} else {
					$("#login-step-one-btn").hide()
					$("#login-step-two-btn").show()

					$("#login-tel-input").addClass("input-disabled")
					$("#login-tel-text").addClass("text-disabled")
					$("#login-otp-input").removeClass("input-disabled")
					$("#login-otp-text").removeClass("text-disabled")

					$("#login-otp-input").removeAttr("tabindex")
					$("#login-tel-input").attr("tabindex", "-1")
				}
			}
		})
	})

	$("#login-step-two-btn").on('click', function() {
		$('.text-error').each(function(i,obj) {$(this).text("")})

		// Only server-side check or local too?

		$.ajax({
			url: "/zelf-api/login/confirm-otp",
			method: "POST",
			data: {
				"phone_number": $("#login-tel-input").val(),
				"otp_code": $("#login-otp-input").val()
			},
			success: function(result) {
				if (result.state == -1) {
					$("#login-error").text(result.error)
				} else {
					document.cookie = "zelf_token="+result.cookie+"; path=/"
					console.log(result.cookie)
					window.location.replace = "/dashboard"
				}
			}
		})
	})
})