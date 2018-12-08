# Production Schedule

## Dev Night 10/24 (Wed)

<div style="display: flex;">
<div style="flex: 1;">
<b>Frontend</b>
<ul>
<li>Finish Login/Signup integrated functionality</li>
<li>Merge parents advice page</li>
<li>Merge register/login pages</li>
<li>Continue quiz component functionality for specific quiz question (Merge by 10/29)</li>
<li>Start work on search page w/ dummy data (Merge by 10/29)</li>
<li>Start work on scaffolding for quiz components state related to completion (Merge by 10/29)</li>
</ul>
</div>
<div style="flex: 1;">
<b>Backend</b>
<ul>
<li>Start create quiz endpoint (Merge by 10/29)</li>
<li>Start get quiz endpoint (Merge by 10/29)</li>
<li>Get postgres tests working</li>
</ul>
</div>
</div>

## Dev Night 10/29 (Mon)

<div style="display: flex;">
<div style="flex: 1;">
<b>Frontend</b>
<ul>
<li>Merge in search page</li>
<li>Merge in quiz question</li>
<li>Merge in scaffolding for quiz components state related to completion</li>
<li>Start quiz page integration with backend (Merge by 10/31)</li>
<li>Start on ability to redo quiz</li>
</ul>
</div>
<div style="flex: 1;">
<b>Backend</b>
<ul>
<li>Start search page endpoint</li>
<li>Merge in create/get quiz endpoint</li>
<li>Start quiz results model/endpoints</li>
</ul>
</div>
</div>

## Dev Night 10/31 (Wed)

<div style="display: flex;">
<div style="flex: 1;">
<b>Frontend</b>
<ul>
<li>Finish quiz page integration</li>
<li>Start search page integration (Merge by 11/5)</li>
<li>Continue quiz component functionality (Merge by 11/5)</li>
</ul>
</div>
<div style="flex: 1;">
<b>Backend</b>
<ul>
<li>Merge search page endpoint</li>
<li>Merge in quiz results model</li>
<li>Continue on quiz results endpoints</li>
</ul>
</div>
</div>

## Dev Night 11/5 (Mon) INTEGRATION

<div style="display: flex;">
<div style="flex: 1;">
<b>Frontend</b>
<ul>
<li>Merge search page integration</li>
<li>Merge quiz component functionality</li>
<li>Integrate quiz results with backend</li>
</ul>
</div>
<div style="flex: 1;">
<b>Backend</b>
<ul>
<li>Merge in quiz results endpoints</li>
<li>Merge search page endpoint</li>
</ul>
</div>
</div>

## Dev Night 11/7 (Wed) CLEANUP

<div style="display: flex;">
<div style="flex: 1;">
<b>Frontend</b>
<ul>
<li>Tie up loose ends</li>
</ul>
</div>
<div style="flex: 1;">
<b>Backend</b>
<ul>
<li>Tie up loose ends</li>
</ul>
</div>
</div>

## All Hands 11/11 (Sun) MVP DEMO

FEATURES TO BUILD:
- Uploading quizzes, books, parent advice (mainly BE parsing, FE admin page)
- Account management (forgot password, change user fields)
- Profile (badges, view results history)
<!-- - Coach account (upload their own quizzes, associate with students' accounts) -->
- Styling, Usability

## Dev Night 11/12 (Mon)
### Frontend
- Admin upload process:
  - Upload book: Takes in CSV file (either 1 file with at least 1 book, or multiple files)
  - Upload quiz: UI to specify *which book*, and then upload CSV with Quiz (1 quiz per file)
- Upload process:
  - Provide CSV file for upload
  - Upload to S3
  - POST to BE with file link
- Account management page
- Profile page (badges, history)
- Usability: Alerts on server errors
- Usability: Decide when we post quiz results
- Styling: More coherence
### Backend
- Create book: Parse CSV file (row by row: Title, Author, Grade, Year)
- Create quiz: Passed in a book ID, Parse CSV file (row by row: Question, Correct option, ... Options)
- Reset password endpoint
- Modify user profile endpoint (name, badges, email, password)
- Add a Badge_array field to User model
- Badge model
- Internal code to check eligibility for earning a new badge

## Dev Night 11/14 (Wed)
### Frontend
### Backend

## Dev Night 11/26 (Mon)
### Frontend
### Backend

## Dev Night 11/28 (Wed)
### Frontend
### Backend

## Dev Night 12/03 (Mon)
### Frontend
### Backend

## Dev Night 12/05 (Wed)
### Frontend
### Backend

## All Hands 12/09 (Sun) PRODUCT SHOWCASE

## Dev Night 12/10 (Mon) CLEANUP, NO NEW FUNCTIONALITY
### Frontend
### Backend

## Dev Night 12/12 (Wed) CLEANUP, NO NEW FUNCTIONALITY
### Frontend
### Backend
