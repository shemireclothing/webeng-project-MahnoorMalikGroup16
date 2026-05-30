# AI Prompts for UtilityComplaint 
## 1. Frontend — HTML & CSS


**Match a design exactly**
```
I have a website section that should look like this description:
- Purple/violet primary colour (#6c3db5)
- White cards with soft box-shadow
- Rounded corners (12px radius)
- A hero section with a heading, subheading, and two buttons side by side
- A stats bar below the hero showing 3 numbers with labels
Write the HTML and CSS for this section to match this design exactly.
```


---

## 2. JavaScript & Form Logic

**Fix the complaint submission form**
```
I have a complaint registration form in index.html that submits to register_complaint.php
via fetch(). The form has these fields: full_name, email, phone, complaint_type (select),
location, title, description, and a priority toggle (High/Medium/Low buttons).
After submission it should show a success toast with the returned complaint_id (e.g. CMP-007)
and reset the form. Here is my current JS function: [paste function here]
It is not showing the toast. What is wrong and how do I fix it?
```

**Add client-side form validation**
```
Add client-side validation to my complaint registration form in index.html before
it sends data to the PHP backend. Rules:
- full_name: required, minimum 3 characters
- email: required, must be a valid email format
- complaint_type: must not be the default empty option
- title: required, minimum 10 characters
- description: required, minimum 20 characters
Show red error messages directly under each invalid field. Do not use alert().
Only call the PHP fetch if all validations pass.
```


---

## 3. PHP Backend


**Debug a PHP endpoint**
```
My register_complaint.php is returning { "success": false, "message": "Failed to save" }
when I submit the complaint form. Here is the PHP file: [paste PHP here]
Here is the complaints table schema: [paste CREATE TABLE SQL here]
What could be causing the failure and how do I debug it step by step?
```


---

## 4. Database & phpMyAdmin

**Write a SQL query**
```
I have a MySQL database called utility_db with a complaints table.

Write a SQL query to add a new column called location to the complaints table.
The column should:
- Not allow NULL values
- Be added after the complaint_type column
Also explain what the query does and whether it will affect existing records.

---

## 5. Dashboard & Charts

**Update charts to use real data**
```
My dashboard.html has two Chart.js charts: a bar chart (complaints by type)
and a pie chart (complaints by status). Currently they use hardcoded data.
I fetch real complaints from get_complaints.php into an array called allComplaints.
Each item has a complaint_type and status field.
Rewrite the renderCharts() function to count types and statuses from allComplaints
and pass those counts to Chart.js dynamically. Destroy old chart instances before
re-creating them to avoid the "canvas already in use" error.
```


---

## 6. Track Complaint Page

**Improve the timeline display**
```
My track.html shows an activity timeline for a complaint. Currently the timeline
is generated from the complaint's status field using a buildTimeline() function.
Improve the timeline so that:
- Each step shows a relative time label like "3 days ago" or "just now"
- Completed steps have a solid green dot
- The current/latest step pulses with a CSS animation
- Future steps are greyed out
Here is the current buildTimeline() function: [paste function]
```

---

## 7. Map Page

**Show complaint counts by location on the map**

```
My map.html displays complaint locations fetched from get_complaints.php.

Instead of showing separate entries for every complaint, group complaints by location
and display the total number of complaints for each location on the map.

When a location is selected, show:
- Location name
- Total complaints count

Update the counts automatically whenever new complaint data is loaded.
```


---

## 8. Login & Signup

**Add "stay logged in" with sessions**
```
My login.php starts a PHP session and stores $_SESSION['user_id'] and $_SESSION['user_name'].
My dashboard.html currently has no session check — anyone can access it without logging in.
Write a PHP file called check_session.php that returns { "loggedIn": true, "name": "Ali" }
or { "loggedIn": false }. Then add a JavaScript check at the top of dashboard.html
that calls check_session.php on load and redirects to login.html if not logged in.
```

---