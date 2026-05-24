# Job App Tracker
- Project Description
The Job App Tracker is a full-stack React app that allows users to manage their job applications in one place. Users can create an account, log in securely with Supabase Authentication, and perform full CRUD operations on job entries.

The app help users organize their job their job search by tracking:
- company name, position, job status, location, date applied
Users can also sort their applications by:
- company name, status, or application date

## Features
Authentication
- Users can: sign up, login, logout
The app is protected using Supabase Auth. Users must be logged in to access the app.
CRUD Functionality
- CREATE- Users can add new job app using a form
- READ- All submitted job apps are displayed on the jobs page
- UPDATE- Users can edit an existing job entry & update job information
- DELETE- Users can remove job apps from the database
Sorting 
Users can sort job entries by: company name, status, date applied
Sorting is handled using React state and array sorting methods.

### How Data Works in the App
The app uses Supabase as the backend database.
Data Flow:
1. User submits form
2. React sends data to Supabase
3. Supabase stores the data
4. React fetches the updated data
5. Data is rendered on the page
Routing:
React Router DOM is used to create multiple pages and protected Routes
Users who are not authenticated are redirected to the login page

#### Installation
1. Install Dependencies:
npm install 
2. Install React Router:
npm install react-router
3. Install Supabase:
npm install @supabase/supabase-js
4. Create Environment Variables:
copy & paste .env file
5. Create Supabase Client:
copy & paste supabase file
6. Start the Server:
npm run dev
