'use client';

export function ThreeValueCards() {
  const cards = [
    {
      emoji: "📦",
      title: "Browse Tools",
      description: "Discover 2,200+ MCPs, workflows, and rules",
      stat: "2,200+",
      statLabel: "Resources",
      buttonText: "Browse Now",
      buttonAction: () => {
        const el = document.getElementById('full-directory');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      emoji: "💰",
      title: "Earn 80%",
      description: "List your resources and keep most of the revenue",
      stat: "80%",
      statLabel: "Commission",
      buttonText: "Start Listing",
      buttonAction: () => window.location.href = '/submit'
    },
    {
      emoji: "👥",
      title: "Join Community",
      description: "Connect with 500+ creators building the future",
      stat: "500+",
      statLabel: "Creators",
      buttonText: "View Profiles",
      buttonAction: () => window.location.href = '/members'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
      {cards.map((card) => (
        <div 
          key={card.title} 
          className="border border-white/10 rounded-lg p-6 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
        >
          <div className="text-4xl mb-4">{card.emoji}</div>
          <h3 className="font-bold text-xl mb-2 text-white">{card.title}</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">{card.description}</p>
          <div className="mb-4">
            <div className="font-black text-3xl text-blue-400">{card.stat}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{card.statLabel}</div>
          </div>
          <button
            onClick={card.buttonAction}
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors active:scale-95 uppercase tracking-wider text-sm"
          >
            {card.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}
