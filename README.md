# simpleapi
Simple API with CRUD capabilities to update a SQLite Database.

## How To Run
 - clone repository with `git clone https://github.com/pjpatel12/simpleapi.git`
 - run `npm install` (if npm not installed, see https://www.npmjs.com/get-npm)
 - run `npm start`

## API Docs
### Database Details
The database (sqlite3) that is created is called *form*. The id is automatically generated upon new records being added. 
Each *form* contains records with the following properties:
 - title
 - email
 - body

### Endpoints
 - Read all records via `/api/forms`
 - Query single record via `/api/form/%id%`
 - Create new record via `/api/form/` with a body containing key-value pairs for each of the *form*'s properties
 - Update (PATCH) record via `/api/form/%id%` and body containing one or more of key-value pairs of the *form* object
 - Delete record via `/api/form/%id%`
