from flask import Flask, request, render_template, redirect, abort
import requests as req


app = Flask("ZelfWebDashboard")


@app.route('/')
def home():
	return render_template("index.html")

@app.route('/dashboard')
def dashboard():
	return render_template("dashboard/index.html")


app.run(port=80, debug=True)