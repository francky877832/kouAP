# Academic Staff Application System

This project is a web-based system that enables academic job candidates to apply for open positions, jurors to evaluate those applications, and admins/managers to manage the entire process efficiently.

## 🚀 Project Overview

The system supports role-based functionalities for Applicants, Admins, Jurors, and the Manager. Candidates can apply for academic positions (Assistant Prof., Associate Prof., etc.), and their applications are evaluated by jurors selected by the admin. The manager acts as the backbone of the system by defining and updating core evaluation criteria used across the platform.

## 🛠️ Development Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **API Integrations**:
  - e-Devlet & Nüfus Müdürlüğü (via SOAP protocol)
  - Twilio (for SMS notifications)
  - Brevo (for email notifications)
  - Amazon S3 (file uploads)

## 📦 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/francky877832/kouAP.git

### 2. Start the backend
cd backend
npm install
nodemon server
###3. Start the frontend
cd frontend
npm install
npm start


4. Environment Variables : only for backend found in shared/.env

👤 User Roles
Applicant: Fills out and submits applications, generates PDFs, and tracks their status.

Admin: Posts announcements, assigns jurors, and monitors evaluations.

Juror: Evaluates applications and submits reports.

Manager: Defines evaluation criteria, category forms, points, and special case coefficients.

🔔 Notification System
Notifications are sent through:

- In-App Notifications: Stored in the database and shown per user role.
- SMS Notifications (Twilio): Integrated but requires a US/Turkish number for testing.
- Email Notifications (Brevo): Fully integrated and working.

Notifications are triggered:
- When a user submits an application (notifies the admin).
- When an announcement deadline passes (notifies the admin with total submissions).
- When jurors are assigned (notifies the juror).
- When a juror submits an evaluation (notifies the admin).
- When the final decision is made (notifies the applicant).

🧠 Point Calculation Logic
Each activity completed by an applicant is awarded points based on predefined rules:

- Categories A, B, C, and G allow selecting a special case (e.g., "AD", "LO1", "IY", etc.).
- If a special case is selected, the corresponding coefficients are fetched from the database (previously entered by the Manager).
- If no case is selected, coefficients are applied based on the number of authors.
- These coefficients and rules are defined by the Manager in the Case Coef Page.

📷 UI Screenshots
Application Form
![formReview3](https://github.com/user-attachments/assets/625fc7df-8cac-4ce5-af9b-933955e203ab)
![formReview2](https://github.com/user-attachments/assets/c7deec05-b256-4b00-947a-faf8eb624c91)
![formReview1](https://github.com/user-attachments/assets/a9b52d85-2ef2-4260-8d72-b96d9cd35f42)
![formL](https://github.com/user-attachments/assets/3cc5e07a-1779-4cb4-badf-bf4419c9a7ac)
![formA](https://github.com/user-attachments/assets/951c3fdd-20f2-4747-b845-1ba99e3ecd3e)

Admin Panel
![adnin2](https://github.com/user-attachments/assets/f741e087-399c-4f4f-9d10-21eeedaef965)
![admin1](https://github.com/user-attachments/assets/39975f86-f80c-4133-b982-a234266f9b99)

Juror Evaluation 
![jury-report](https://github.com/user-attachments/assets/89f52bfc-15db-41cc-a25e-b4c1eeaa0b87)
![jury-panel](https://github.com/user-attachments/assets/2a7a51bd-e94a-4430-8991-2b61b92488b0)

Manager Panel

![manager](https://github.com/user-attachments/assets/3026c587-7417-42ca-a845-2881af103747)

Built-in Notifications
![notif2](https://github.com/user-attachments/assets/62e46b28-2c95-42f4-9ed4-a0135c9777c6)
![notif1](https://github.com/user-attachments/assets/a7d41d16-78f8-4614-b387-8f9f82a3931d)





🧩 Key Features
Dynamic application forms (defined per category by the Manager)

Auto-generated PDF summaries of applications

Random juror assignment based on current workload (ensures fair evaluations)

Role-based panels and access control

📄 License
This project is open-source. License information to be added.
