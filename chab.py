from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import json
import random

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load JSON data
with open('dataw.json', 'r') as file:
    data = json.load(file)

# Function to search for a company by name
def get_company_details(company_name):
    for entry in data:
        if entry['data']['venture_name'].lower() == company_name.lower():
            return entry
    return None

# Function to handle specific requests like address, contact, etc.
def get_specific_data(company, request_type):
    if not company:
        return "Company not found."
    
    if request_type.lower() == "address":
        return company['data']['address']
    elif request_type.lower() == "contact":
        return company['data']['contact']
    elif request_type.lower() == "description":
        return company['data']['description']
    elif request_type.lower() == "reviews":
        return random.choice([f"{review['username']}: {review['comment']}" for review in company['reviews']])
    elif request_type.lower() == "website":
        return company['data']['homepages']
    else:
        return "I didn't understand the request. Please ask for address, contact, description, reviews, or website."

# Route to send an introductory message on reload
@app.route("/intro", methods=["GET"])
def intro():
    return jsonify({"response": "Welcome! I am your company information assistant. You can ask me for details like address, contact, description, reviews, or website of any company."})

# Route for handling user queries
@app.route("/", methods=["POST"])
def home():
    result = ""
    if request.method == "POST":
        user_query = request.json.get("user_query", "").strip().lower()  # Use JSON data

        # Check for greeting message "hi"
        if user_query == "hi":
            return jsonify({"response": "Hello! I am your assistant. Ask me about any company details like address, contact, description, or reviews."})

        # Extract company name and specific data requested
        parts = user_query.split(" of the company ")
        
        if len(parts) < 2:
            result = "Please provide the company name."
        else:
            # Keep spaces in company name for matching
            company_name = parts[1].strip()
            request_type = parts[0].replace('give me the ', '').strip()

            company = get_company_details(company_name)
            result = get_specific_data(company, request_type)

    # Return the response as JSON
    return jsonify({"response": result})

# Run the Flask app
if __name__ == "__main__":
    app.run()
