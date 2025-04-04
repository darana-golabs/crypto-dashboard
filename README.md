# Crypto Dashboard

A real-time cryptocurrency price tracking dashboard built with Remix, featuring authentication, dark mode, and drag-and-drop functionality.

## Features

- 🔐 Secure authentication system
- 🌓 Dark/Light mode toggle
- 🔄 Real-time price updates with configurable intervals
- 🔍 Search cryptocurrencies by name or symbol
- 🎯 Drag-and-drop reordering of cryptocurrency cards
- 📱 Responsive design
- ⚡ Fast and optimized performance

## Prerequisites

- Node.js 18 or later
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
COINGECKO_API_KEY=your_api_key_here
COINGECKO_API_URL=https://api.coingecko.com/api/v3
SESSION_SECRET=your_session_secret_here
```

You can get a CoinGecko API key by registering at [CoinGecko](https://www.coingecko.com/api/pricing).

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

## Usage

1. **Login**
   - Visit the application
   - Use the demo credentials:
     - Email: `demo@example.com`
     - Password: `password`

2. **Dashboard Features**
   - View real-time cryptocurrency prices
   - Search for specific cryptocurrencies
   - Drag and drop cards to reorder them
   - Toggle between dark and light modes
   - Set auto-refresh intervals

3. **Controls**
   - Search bar: Filter cryptocurrencies by name or symbol
   - Refresh button: Manually update prices
   - Auto-refresh dropdown: Set automatic update intervals
   - Theme toggle: Switch between dark and light modes
   - Logout button: Sign out of the application

## Tech Stack

- [Remix](https://remix.run/) - Full stack web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [@dnd-kit](https://dnd-kit.com/) - Drag and drop functionality
- [CoinGecko API](https://www.coingecko.com/api/documentation) - Cryptocurrency data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
