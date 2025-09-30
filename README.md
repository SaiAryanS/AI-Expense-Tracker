# Noir Ledger

Clarity in Chaos. Your finances, simplified.

Noir Ledger is a minimalist expense tracker web application designed for speed, intuition, and clarity. It features a dark-themed, distraction-free user interface, allowing for frictionless data entry and clear visualization of spending habits.

## Features

- **Dashboard**: A central hub to view monthly and yearly spending totals, and a list of recent transactions.
- **Quick Expense Entry**: Seamlessly add new expenses with just a few clicks.
- **Transaction Management**: A comprehensive, paginated view of all expenses with powerful filtering by date and category.
- **AI-Powered Reports**: Visualize spending breakdowns with an interactive chart and gain deeper understanding with AI-generated insights and trends.
- **Settings**: Customize your display name and default currency.
- **Secure Authentication**: Email/Password and Google Sign-In options.

## Tech Stack

- **Framework**: Next.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI**: Google Gemini via Genkit

This project uses Next.js with Server Components and Server Actions, simulating a full-stack environment without a separate backend server.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (running locally or a connection string to a cloud instance)

### Environment Variables

Create a `.env` file in the root of the project and add the following variables.

```bash
# Obtain from your Google Cloud project
GOOGLE_API_KEY="YOUR_GOOGLE_AI_API_KEY"

# Your MongoDB connection string
# For a local MongoDB instance, this is typically:
MONGODB_URI="mongodb://localhost:27017/noir-ledger"
```

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/noir-ledger.git
    cd noir-ledger
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase.
