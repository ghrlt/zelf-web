from flask import Flask, request, render_template, redirect, abort, url_for, Response
import requests as req

from zelfapi import ZelfCustomApi


app = Flask("ZelfWebDashboard")
Zelf = ZelfCustomApi()

@app.route('/')
def home():
	return render_template("index.html")

@app.route('/dashboard')
def dashboard():
	return render_template("dashboard/index.html")


@app.route('/zelf-api/login/<action>', methods=['POST'])
def login(action):
	if not request.values.get('phone_number'):
		return {"state": -1, "error": "You must provide your phone number!"}

	if action == "request-otp":
		#r = Zelf.login(request.values.get('phone_number'))
		r = {}
		if r.get('error') is None:
			return {"state": 0, "error": None}
		else:
			return {"state": -1, "error": r['error']}

	elif action == "confirm-otp":
		#r = Zelf.login(request.values.get('phone_number'), request.values.get('otp_code'))
		r = {"cookie": "iamtoken"}
		if r.get('error') is None:
			return {"state": 0, "error": None, "cookie": r['cookie']}
		else:
			return {"state": -1, "error": r['error']}

	else:
		return abort(404)


@app.route('/zelf-api/customer/<action>', methods=['GET'])
def customer(action):
	if action == "get-infos":
		#r = Zelf.getAccountDetails()
		r = {
			"account": {
				"id": 10689304,
				"referral_id": "DAREFCODEX",
				"state": "Active",
				"type": "retail",
				"is_verified": False,
				"is_deleted": False,
				"has_card": True,
				"has_confirmed_phone": True,
				"has_accepted_terms": True,
				"is_junior": False,
				"avatar": "",
				"user": {
					"firstname": "Gaetan",
					"middlename": None,
					"lastname": "Herault",
					"gender": "M",
					"martial_status": None,
					"residence_country_code": "FR",
					"birth_infos": {
						"birth_date": None,
						"birth_country": None,
						"birth_place": None
					}
				},
				"achievements": [],
				"parent_id": None
			}
		}
		if r.get('error') is None:
			return {"state": 0, "error": None, "data": r['account']}
		else:
			return {"state": -1, "error": r['error']}

	elif action == "x":
		pass

@app.route('/zelf-api/card/<action>', methods=['GET'])
def card(action):
	if action == "get-details":
		#r = Zelf.getStrikedCardDetails()
		r = {
			"card": {
				"id": "66801",
				"is_active": True,
				"currency": "EUR",
				"owner": "Gaetan Herault",
				"striked_card_number": "5469********2346",
				"created_on": "03/22",
				"balance": "1326"
			}
		}

		if r.get('error') is None:
			return {"state": 0, "error": None, "data": r['card']}
		else:
			return {"state": -1, "error": r['error']}

	elif action == "get-details-full":
		#r = Zelf.getCardDetails()
		r = {
			"card": {
				"id": "66801",
				"is_active": True,
				"currency": "EUR",
				"owner": "Gaetan Herault",
				"striked_card_number": "5469********2346",
				"created_on": "03/22",
				"balance": "1326",

				"clear_number": "5469278594702346",
				"expiration_date": "03/25",
				"cvv": "643"
			}
		}
		# DATA IS OF COURSE NOT REAL ...

		if r.get('error') is None:
			return {"state": 0, "error": None, "data": r['card']}
		else:
			return {"state": -1, "error": r['error']}

	elif action == "request-topup-link":
		#r = Zelf.getCardTopupLink()
		r = {
			"url": "https://zelf.co/"
		}
		if r.get('error') is None:
			return {"state": 0, "error": None, "data": r['url']}
		else:
			return {"state": -1, "error": r['error']}

	elif action == "get-balances":
		#r = Zelf.getCardBalances()
		r = {
			"data": {
				"bank": 1382,
				"bonus": 197
			}
		}
		if r.get('error') is None:
			return {"state": 0, "error": None, "data": r['data']}
		else:
			return {"state": -1, "error": r['error']}


	elif action == "get-limits":
		#r = Zelf.getLimitsInfo()
		r = {
			"data": {
				"spending": {
					"spent": 549,
					"limit": 1500,
					"left": 951
				},
				"topup": {
					"topped_up": 257,
					"limit": 1500,
					"left": 1343
				},
				"bonus": {
					"used": 0,
					"limit": 0
				}
			}
		}
		if r.get('error') is None:
			return {"state": 0, "error": None, "data": r['data']}
		else:
			return {"state": -1, "error": r['error']}

	return abort(404)

app.run(port=80, debug=True)