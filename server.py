from flask import Flask, request, render_template, redirect, abort, url_for
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
		r = Zelf.login(request.values.get('phone_number'))
		if r.get('confirmation_method') == "OtpSms":
			return {"state": 0, "error": None}
		else:
			return {"state": -1, "error": r['error']}


app.run(port=80, debug=True)