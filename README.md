# VipulType Pro 🚀

**A modern, interactive typing speed test application with glassmorphism design**

Built with ❤️ by **Vipul** | Showcasing modern web development skills

![VipulType Pro](https://img.shields.io/badge/VipulType-Pro%20v2.0-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.5-cyan?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 🎨 **Glassmorphism UI** with unique cyan-pink-purple gradient theme
- ⚡ **Real-time typing test** with WPM and accuracy tracking
- 🎯 **Difficulty levels** (Easy, Medium, Hard) with progressive text complexity
- 🎵 **Custom audio feedback** with A5 note frequency for pleasant typing sounds
- 📊 **Progress tracking** with session history and best performance stats
- ✏️ **Custom text mode** for personalized practice sessions
- 📱 **Mobile responsive** design for all devices
- 🌙 **Dark theme** with elegant animations and transitions

## 🎯 Unique Design Elements

- **Personal Branding**: "Built with ❤️ by Vipul" throughout the app
- **Custom Color Scheme**: Cyan-pink-purple gradient (not the typical blue/purple)
- **Signature Component**: Floating "VipulType v2.0" indicator
- **Personalized Content**: Custom text samples featuring Vipul's development philosophy
- **Enhanced Audio**: A5 note with triangle wave for better sound experience

## 🚀 Live Demo

**Deploy to Netlify in 3 clicks:**
1. Fork this repository
2. Connect to Netlify
3. Deploy automatically!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/vipultype-pro)

## 🛠️ Tech Stack

**Frontend:**
- React 18.3 with TypeScript
- Tailwind CSS with custom glassmorphism effects
- Radix UI components with shadcn/ui styling
- Framer Motion for smooth animations
- TanStack Query for state management
- Wouter for lightweight routing

**Backend:**
- Netlify Functions (Serverless)
- In-memory storage (no database required)
- RESTful API design

**Build Tools:**
- Vite for fast development and optimized builds
- PostCSS with Autoprefixer
- TypeScript for type safety

## 📦 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/vipultype-pro.git
cd vipultype-pro

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deploy to Netlify

1. **Fork this repository** to your GitHub account
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Netlify auto-detects the build settings
3. **Deploy**: Your VipulType Pro goes live instantly!

## 📁 Project Structure

```
vipultype-pro/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── stats-dashboard.tsx
│   │   ├── typing-area.tsx
│   │   ├── theme-provider.tsx
│   │   └── vipul-signature.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-typing-game.ts
│   │   └── use-toast.ts
│   ├── lib/                # Utility functions
│   │   ├── audio.ts        # Custom A5 note audio
│   │   ├── text-samples.ts # Typing practice texts
│   │   └── utils.ts
│   ├── pages/              # Application pages
│   │   └── typing-test.tsx
│   └── App.tsx             # Main application
├── netlify/functions/      # Serverless API
│   └── api.ts             # Backend API endpoints
├── shared/                 # Shared types and schemas
│   └── schema.ts
└── netlify.toml           # Netlify configuration
```

## 🎮 How to Use

1. **Choose Difficulty**: Start with Easy, Medium, or Hard text samples
2. **Start Typing**: Begin typing to automatically start the timer
3. **Real-time Feedback**: See your WPM, accuracy, and progress live
4. **Custom Text**: Upload your own text for personalized practice
5. **Track Progress**: View your session history and best performance

## 🎨 Customization

### Color Scheme
The app uses a unique cyan-pink-purple gradient. Colors can be customized in:
- `src/index.css` - CSS variables
- `tailwind.config.ts` - Tailwind configuration

### Text Samples
Add your own practice texts in `src/lib/text-samples.ts`:
```typescript
const customTexts = [
  "Your custom typing practice text here...",
  // Add more texts
];
```

### Audio Settings
Modify the typing sound in `src/lib/audio.ts`:
```typescript
oscillator.frequency.value = 880; // A5 note
oscillator.type = 'triangle';    // Wave type
```

## 🏆 Performance Features

- **Real-time Calculations**: WPM and accuracy updated every 100ms
- **Progress Tracking**: Visual progress bar and detailed statistics
- **Session History**: Recent typing sessions with timestamps
- **Best Performance**: Track your highest WPM and accuracy
- **Error Highlighting**: Red highlighting for incorrect characters

## 📊 API Endpoints

- `GET /api/sessions` - Fetch recent typing sessions
- `POST /api/sessions` - Save typing session results
- `GET /api/stats` - Get best performance statistics
- `GET /api/settings` - Fetch user preferences
- `PATCH /api/settings` - Update user settings

## 🔧 Environment Variables

No environment variables required! The app works out-of-the-box with in-memory storage.

For production with PostgreSQL (optional):
```env
DATABASE_URL=your_postgresql_connection_string
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Vipul** - Creator and Developer
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - For the amazing developer experience

## 📞 Contact

**Vipul** - Project Creator
- Portfolio: [Your Portfolio Link]
- LinkedIn: [Your LinkedIn]
- GitHub: [@yourusername](https://github.com/yourusername)

---

**VipulType Pro v2.0** | Built with ❤️ by Vipul | Showcasing modern web development

⭐ **Star this repository if you found it helpful!**