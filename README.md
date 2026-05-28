# Breathe ESG Dashboard

A full-stack ESG Governance Dashboard built using React and Django REST Framework.

## Features

* Upload ESG data using CSV or Excel files
* View ESG records in a corporate dashboard
* Approve or reject ESG metrics
* REST API integration
* Modern enterprise UI

## Tech Stack

### Frontend

* React
* Axios

### Backend

* Django
* Django REST Framework
* Pandas

## API Endpoints

### Get Records

GET `/api/records/`

### Upload File

POST `/api/upload/`

### Update Status

PATCH `/api/update/<id>/`

## Setup Instructions

### Backend

```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Sample CSV Format

| company_name | metric          | value |
| ------------ | --------------- | ----- |
| Tesla        | Carbon Emission | 120   |
| Google       | Water Usage     | 80    |

## Author

Anushka
