$(function() {
	$("#login-tel-input").focus()

	$("#login-step-one-btn").on('click', function() {
		$.ajax({
			url: "/zelf-api/login/request-otp",
			data: {
				"phone_number": $("#login-tel-input").val()
			},
			success: function(result) {
				if (result.state == -1) {
					// Display result.error
				} else {
					$(this).hide()
					$("#login-step-two-btn").show()

					$("#login-tel-input").addClass("input-disabled")
					$("#login-otp-input").removeClass("input-disabled")
				}
			}
		})
	})

	$("#login-step-two-btn").on('click', function() {
		$.ajax({
			url: "/zelf-api/login/confirm-otp",
			data: {
				"phone_number": $("#login-tel-input").val(),
				"otp_code": $("#login-otp-input").val()
			},
			success: function(result) {
				if (result.state == -1) {
					// Display result.error
				} else {
					// Set cookies
					// Then redirect to dashboard
				}
			}
		})
	})
})