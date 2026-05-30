# UtilityComplaint 🛠️

A fully responsive web application for reporting, tracking, and managing utility complaints (electricity, water, roads, waste, telecom, and more). Built with HTML, CSS, and JavaScript on the frontend, and PHP + MySQL (via XAMPP) on the backend.

---

## 📁 Project Structure

```
utility-complaint/
├── index.html                 # Homepage — hero, stats, Register Complaint form
├── dashboard.html             # Dashboard — live stats, charts, complaints table
├── track.html                 # Track complaint by ID with activity timeline
├── map.html                   # Interactive map with complaint pins (OpenStreetMap)
├── how-it-works.html          # 4-step guide explaining the process
├── faq.html                   # Searchable FAQ with category filters
├── login.html                 # User login form
├── signup.html                # User registration form
├── style.css                  # Shared stylesheet for all pages
│
├── db.php                     # Database connection (PDO)
├── register_complaint.php     # Submit a new complaint → saves to DB
├── get_complaints.php         # Fetch all complaints (with search & filter)
├── track_complaint.php        # Fetch a single complaint by ID
├── delete_complaint.php       # Delete a complaint by ID
├── signup.php                 # Create a new user account
├── login.php                  # Authenticate user & start session
│
└── README.md                  # This file
```

---

## ⚙️ Requirements

| Tool | Purpose | Download |
|------|---------|----------|
| XAMPP | Runs Apache + MySQL locally | https://www.apachefriends.org |
| VS Code | Code editor | https://code.visualstudio.com |
| Live Server (VS Code extension) | Hot-reload preview | Via VS Code Extensions panel |
| Modern browser | Chrome / Firefox / Edge | — |

---

## 🚀 Setup & Installation

### Step 1 — Install XAMPP

1. Download XAMPP from https://www.apachefriends.org
2. Run the installer and keep all defaults (install path: `C:\xampp`)
3. Open **XAMPP Control Panel** from the Start Menu
4. Click **Start** next to **Apache**
5. Click **Start** next to **MySQL**
6. Both should turn green ✅

### Step 2 — Place the Project

Copy your project folder into XAMPP's web root:

```
C:\xampp\htdocs\utility-complaint\
```

### Step 3 — Create the Database

1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click **New** in the left sidebar
3. Enter database name: `utility_db` → click **Create**
4. Click on `utility_db` in the sidebar → click the **SQL** tab
5. Paste the following and click **Go**:

```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complaints table
CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_id VARCHAR(20) UNIQUE NOT NULL,
  user_id INT,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  complaint_type VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'Medium',
  status VARCHAR(50) DEFAULT 'Submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### Step 4 — Run the Website

Open your browser and go to:

```
http://localhost/utility-complaint/index.html
```

✅ Your site is live and connected to the database.

---

## 🌐 Pages Overview

### Home (`index.html`)
- Hero section with call-to-action buttons
- Live stats bar (total complaints, resolved, in progress)
- **Register Complaint** form — submits directly to `register_complaint.php`
- On success, displays a unique tracking ID (e.g. `CMP-007`)

### Dashboard (`dashboard.html`)
- **Live stat cards** — Total, Pending, In Progress, Resolved (pulled from DB)
- **Bar chart** — complaints by type
- **Pie chart** — complaints by status
- **Complaints table** — searchable, filterable by status
- Add new complaint via modal, delete existing ones
- Export complaints list as CSV

### Track Complaint (`track.html`)
- Enter any complaint ID to see its full details and activity timeline
- Timeline is generated automatically from the complaint's current status
- Recent complaints panel loads the latest 6 from the database
- Supports `?id=CMP-XXX` URL parameter (used by Dashboard → View button)

### Map (`map.html`)
- Interactive OpenStreetMap with pins for each complaint location
- Filter pins by complaint type

### How It Works (`how-it-works.html`)
- Visual 4-step guide: Submit → Review → Assign → Resolve

### FAQ (`faq.html`)
- Accordion-style questions, searchable, with category filters

### Login & Sign Up (`login.html`, `signup.html`)
- Login authenticates against the `users` table (bcrypt passwords)
- Sign Up creates a new account with hashed password storage
- On success, redirects to the dashboard

---

## 🔌 API Endpoints (PHP)

| File | Method | Description |
|------|--------|-------------|
| `register_complaint.php` | POST | Submit a new complaint. Returns `{ success, complaint_id }` |
| `get_complaints.php` | GET | Fetch all complaints. Supports `?status=` and `?search=` params |
| `track_complaint.php` | GET | Fetch one complaint. Requires `?id=CMP-XXX` |
| `delete_complaint.php` | GET | Delete a complaint. Requires `?id=<numeric_id>` |
| `signup.php` | POST | Register a new user account |
| `login.php` | POST | Authenticate user, starts a PHP session |

---

## 🗄️ Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | INT | Auto increment, primary key |
| first_name | VARCHAR(100) | Required |
| last_name | VARCHAR(100) | |
| email | VARCHAR(150) | Unique |
| phone | VARCHAR(20) | |
| password | VARCHAR(255) | bcrypt hashed |
| created_at | TIMESTAMP | Auto set |

### `complaints`
| Column | Type | Notes |
|--------|------|-------|
| id | INT | Auto increment, primary key |
| complaint_id | VARCHAR(20) | e.g. CMP-001, unique |
| user_id | INT | FK → users.id (nullable) |
| full_name | VARCHAR(150) | Submitter's name |
| email | VARCHAR(150) | |
| phone | VARCHAR(20) | |
| complaint_type | VARCHAR(100) | Electricity, Water, Roads, etc. |
| location | VARCHAR(255) | Area / address |
| title | VARCHAR(255) | Brief summary |
| description | TEXT | Full details |
| priority | VARCHAR(20) | High / Medium / Low |
| status | VARCHAR(50) | Submitted → In Progress → Resolved |
| created_at | TIMESTAMP | Auto set |
| updated_at | TIMESTAMP | Auto updated |

---

## 🎨 Features

- ✅ Fully responsive — works on mobile, tablet, and desktop
- ✅ Dark mode toggle on every page
- ✅ Real-time complaint submission with auto-generated tracking IDs
- ✅ Live dashboard with dynamic charts (Chart.js)
- ✅ Interactive map (OpenStreetMap via Leaflet.js)
- ✅ Activity timeline on complaint tracking
- ✅ CSV export of complaint data
- ✅ Secure password hashing (bcrypt via PHP)
- ✅ SQL injection protection (PDO prepared statements)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Charts | Chart.js 4.4 |
| Map | Leaflet.js + OpenStreetMap |
| Backend | PHP 8 (PDO) |
| Database | MySQL (via XAMPP) |
| DB Manager | phpMyAdmin |
| Dev Server | XAMPP Apache |

---

## 🔒 Security Notes

- All user passwords are hashed with `password_hash()` (bcrypt) — never stored in plain text
- All database queries use PDO prepared statements to prevent SQL injection
- User input is sanitized with `htmlspecialchars()` and `FILTER_SANITIZE_EMAIL`
- Sessions are managed server-side via PHP `session_start()`

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Page shows but form doesn't submit | Make sure Apache & MySQL are **Started** (green) in XAMPP Control Panel |
| `Connection error` on submit | Confirm the project is in `C:\xampp\htdocs\utility-complaint\` (not the Desktop) |
| `Database connection failed` | Open phpMyAdmin and confirm `utility_db` database exists with both tables |
| Map not loading | Requires internet connection (loads Leaflet.js from CDN) |
| Charts not showing | Requires internet connection (loads Chart.js from CDN) |
| Blank dashboard / 0 complaints | Submit a complaint from the homepage first, then revisit the dashboard |

---

## 📄 License

This project is for educational and personal use.

---

*Built with ❤️ using HTML, CSS, JavaScript, PHP & MySQL*
