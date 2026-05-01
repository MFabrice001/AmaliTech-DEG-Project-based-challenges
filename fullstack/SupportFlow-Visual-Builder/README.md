# SupportFlow Visual Builder

A custom-built, interactive node-based visual editor designed for creating and managing support workflows. This project was developed as part of the AmaliTech DEG Project-based challenge.

## 🚀 Features

* **Custom Drag-and-Drop Canvas:** Freely position workflow nodes across the canvas using a custom-built React state management system.
* **Dynamic SVG Routing:** Connection lines between nodes are generated using mathematically calculated Bezier curves that update in real-time as nodes are moved or connected.
* **Real-Time Editor Panel:** Select any node to instantly modify its title, message content, and interactive options.
* **Connection Management:** Seamlessly route node options to target nodes using an intuitive dropdown system, visually represented instantly on the canvas.
* **Zero-Dependency Core:** Built strictly without external graphing, charting, or drag-and-drop libraries to demonstrate strong proficiency in pure React state manipulation, DOM math, and SVG rendering.

## 🛠️ Tech Stack

* **Framework:** React 18 + Vite
* **Styling:** Tailwind CSS (v3)
* **Icons/Graphics:** Pure SVG & Tailwind utilities
* **State Management:** React `useState`

## 📦 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MFabrice001/AmaliTech-DEG-Project-based-challenges.git
   cd SupportFlow-Visual-Builder
