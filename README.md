# Company Chatbot
This is a simple chatbot application that allows users to retrieve details about companies from a JSON dataset. The application consists of a backend built with Flask and a frontend created with React.

## Features
- Users can ask for specific details about a company, such as its address, contact, description, reviews, or website.
- The backend uses Flask to serve data from a static JSON file.
- The frontend provides a simple interface for querying company details.

## Project Structure
- app.py: The Flask backend that handles requests and queries the JSON dataset.
- dataw.json: The JSON file containing static data about companies.
- src/App.js: The main component for the React frontend.
- src/App.css: Basic styling for the frontend.

## Prerequisites
- Node.js and npm (for the React frontend)
- Python 3 (for the Flask backend)
- Flask and Flask-CORS Python packages
- Axios (included with React for API requests)

## Setup Instructions
- Step 1: Clone the Repository
``` bash
git clone [<repository-url>](https://github.com/Farhaan114/Chatbot-for-VC.git)
cd Chatbot-for-VC
```
- Step 2: Set Up the Backend (Flask)
Navigate to the backend directory (where app.py is located).

Install required Python packages.

```bash

pip install flask flask-cors
```
Ensure that dataw.json is present in the same directory as app.py.

- Start the Flask server.

``` bash

python app.py
```
The server should now be running at http://localhost:5000.

- Step 3: Set Up the Frontend (React)
Navigate to the React frontend directory (typically src or the project root if you have both frontend and backend together).

Install required npm packages.

```bash

npm install
Start the React development server.
```
```bash
npm start
```
The frontend should now be running at http://localhost:3000.

## Usage Instructions
Enter a query in the text box on the frontend. Example queries include:

- "Give me the address of the company XYZ"
- "Give me the contact of the company ABC"
Click Submit to send the query.

- The chatbot will respond with the requested information if available.

## Example Queries
- Give me the address of the company XYZ
- Give me the website of the company ABC
- Provide contact information for XYZ company
## Troubleshooting
- Error: CORS Policy Issue
-  Make sure Flask-CORS is installed and enabled in app.py.
- Error: Cannot fetch data
- Ensure the backend is running on http://localhost:5000 and the frontend on http://localhost:3000.
- Double-check the JSON file and make sure it is properly formatted.
## License
This project is open-source and available under the MIT License.
