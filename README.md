# 🌍 Geography Game

Welcome to the **Geography Game**! This interactive web application challenges players to test their geographical knowledge by guessing countries based on various attributes. Built with **Angular**, **TypeScript**, and styled with **Tailwind CSS**, it offers an engaging and educational experience.

---

## ✨ Features

- 🎯 **Interactive Country Guessing**: Guess countries based on multiple attributes
- 🔍 **Smart Autocomplete**: Intelligent country search with suggestions
- 📊 **Detailed Comparisons**: Compare countries across various metrics
- 🧭 **Directional Hints**: Get directional guidance to the target country
- 📝 **History Tracking**: Keep track of your guesses and progress
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 🖼️ **WordNap Integration**: Visual representation of geographical concepts

---

## 🛠️ Tech Stack

- **Frontend Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Angular Services
- **Animations**: CSS Transitions & Keyframes

---

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Step 1: Clone the Repository

```bash
git clone [your-repository-url]
cd Geography-Game
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Development Server

```bash
ng serve
```

The application will be available at `http://localhost:4200`

---

## 🎮 How to Play

1. **Start the Game**:

   - The game automatically selects a random country for you to guess
   - Use the autocomplete search to enter your country guess

2. **Compare Attributes**:

   - View detailed comparisons between your guess and the target country
   - Compare attributes like:
     - Name
     - Continent
     - Population
     - Average Temperature
     - Equator Position

3. **Get Directional Hints**:

   - Receive directional guidance (north, south, east, west)
   - Use these hints to narrow down your next guess

4. **Track Your Progress**:
   - View your guess history
   - See which attributes matched
   - Celebrate when you find the correct country!

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── autocomplete/
│   │   └── wordnap/
│   ├── dash-borad/
│   ├── history-log/
│   ├── win-dialog/
│   ├── data/
│   └── services/
```

### Key Components

- **Autocomplete Component**: Smart country search with suggestions
- **Dashboard Component**: Main game interface with comparisons
- **History Log**: Tracks and displays guess history
- **WordNap Component**: Visual geographical representation
- **Country Service**: Manages country data and operations

---

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on all devices
- **Smooth Animations**:
  - Fade-in effects for new content
  - Slide-up animations for history
  - Bounce effects for comparisons
  - Hover effects on interactive elements
- **Visual Feedback**:
  - Color-coded comparisons (green for matches, red for differences)
  - Directional arrows for numerical comparisons
  - Clear error messages for invalid inputs

---

## 🔧 Technical Implementation

### Key Features

1. **Autocomplete Search**:

   - Real-time filtering after 2 characters
   - Case-insensitive matching
   - Error handling for invalid inputs
   - Keyboard navigation support

2. **Country Comparison**:

   - Dynamic property comparison
   - Directional calculation based on coordinates
   - Visual indicators for matches/mismatches

3. **State Management**:
   - Angular services for data management
   - Component communication through events
   - Proper change detection handling

---

## 🗺️ Google Maps Integration

This project integrates Google Maps to provide a visual representation of the world and potentially enhance gameplay features in the future.

### Setup

1.  **Get a Google Maps API Key**: You need an API key from the Google Cloud Platform. Enable the "Maps JavaScript API" for your project.
2.  **Configure Environment Files**: Add your API key and optionally a Map ID to the environment files:

    - `src/environments/environment.ts` (for production)
    - `src/environments/environment.development.ts` (for development)

    Update the `googleMaps` object in these files:

    ```typescript
    export const environment = {
      production: false, // or true for production
      googleMaps: {
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        mapId: 'YOUR_OPTIONAL_MAP_ID',
      },
    };
    ```

### Usage

The map is currently displayed in the main application component (`AppComponent`) using the `<google-map>` component from `@angular/google-maps`. The API script is loaded dynamically when the component initializes.

---
