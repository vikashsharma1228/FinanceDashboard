# 💰 Finance Dashboard <p align="center">
  <a href="https://financedashboard-kappa.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge" />
  </a>
</p>


A high-performance, responsive, and feature-rich **Personal Finance Management Dashboard** built with **React.js** and **Tailwind CSS v4**.

This project is designed with an **R&D mindset**, focusing on:

* **Data integrity**
* **User-centric insights**
* **Role-based interactions**

It aims to help users not only track their finances but also **understand their financial behavior through meaningful insights**.

---

## 🚀 Overview

This project simulates a real-world financial dashboard where users can:

* View overall financial summary
* Track transactions
* Analyze spending patterns
* Gain insights into financial behavior

The focus of this project is not just UI design, but also **user understanding, data visualization, and interaction design**.

---

## ✨ Features

### 📊 Dashboard Overview

* Total Balance, Income, and Expense summary cards
* Dynamic balance trend visualization
* Clean and minimal layout

### 📋 Transactions Management

* View all transactions with:

  * Date
  * Category
  * Amount
  * Type (Income/Expense)
* Search functionality for quick filtering
* Color-coded transaction types
* Admin controls for managing data

### 🔐 Role-Based UI

* **Viewer Mode**

  * Can only view data
* **Admin Mode**

  * Add new transactions
  * Delete existing transactions

Role switching is implemented on the frontend for demonstration purposes.

---

## 🧠 Smart Insights

* Savings rate calculation
* Top spending category detection
* Dynamic analysis messages
* Edge case handling (e.g., division by zero)

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS v4
* **State & Logic:** React Hooks (useState, useMemo, useEffect)
* **Feedback:** React Hot Toast
* **Storage:** Browser LocalStorage

---

## 📂 Project Structure

```
src/
 ├── components/      # UI Modules (Cards, Charts, Table, Insights)
 ├── data/            # Mock datasets
 ├── App.jsx          # Core logic
 └── index.css        # Tailwind + global styles
```

---

## 🚀 Setup & Installation

1. Clone the repository

```
git clone https://github.com/vikashsharma1228/FinanceDashboard.git
```

2. Install dependencies

```
npm install
```

3. Run the development server

```
npm run dev
```

---

## 📌 Key Highlights

* Focused on **user-centric design**
* Implemented **role-based interaction**
* Generated **meaningful insights instead of raw data**
* Handled **edge cases for better reliability**
* Clean and scalable project structure

---

⭐ If you find this project helpful, don’t forget to star the repository!
