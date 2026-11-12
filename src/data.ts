// Personalize this file: names, photos, captions, memories, messages and quiz questions.
export const birthday = {
  recipient: "Birthday Superstar",
  sender: "Your Favourite Human",
  dateLabel: "TODAY IS YOUR DAY",
  greeting: "A whole little universe, just for you.",
  letter: `I hope this year brings you ridiculous amounts of happiness, unexpected adventures, good food, and people who make life feel lighter.

Thank you for being exactly the person you are. Here's to more stories, more laughter, and many more memories together.

Happy birthday! 💜`,
};

export const gallery = [
  { src: "/assets/gallery/memory-1.jpg", title: "The good old days", caption: "One of those moments that deserves its own little frame." },
  { src: "/assets/gallery/memory-2.jpg", title: "Peak chaos", caption: "No context needed. We both know." },
  { src: "/assets/gallery/memory-3.jpg", title: "A core memory", caption: "Would happily relive this one." },
  { src: "/assets/gallery/memory-4.jpg", title: "Just us being us", caption: "Proof that ordinary days can be the best ones." },
];

export const memories = [
  { date: "THE BEGINNING", title: "Where it all started", body: "Add the story of how you met, your first conversation, or the first time you knew this friendship was going to be special.", emoji: "🌱" },
  { date: "THE CHAOTIC ERA", title: "Questionable decisions", body: "Add a funny shared memory, an unforgettable trip, or an inside joke that still makes you laugh.", emoji: "🪩" },
  { date: "ALWAYS & ONGOING", title: "More stories to come", body: "The best part? There are still so many memories left to make.", emoji: "✨" },
];

export const messages = [
  { from: "You", time: "10:02 AM", text: "Important announcement: today is legally all about you 🎂" },
  { from: "Birthday Superstar", time: "10:03 AM", text: "As it should be." },
  { from: "You", time: "10:03 AM", text: "Correct answer. You may proceed to collect your birthday surprises." },
  { from: "You", time: "10:04 AM", text: "P.S. I made you a whole website. Please act impressed." },
];

export const notes = [
  { title: "A tiny reminder", body: "You make ordinary days a lot more entertaining. Never underestimate that." },
  { title: "Official review", body: "10/10 friend. Occasionally dramatic. Would recommend." },
  { title: "A wish for this year", body: "More spontaneous plans, fewer worries, excellent meals, and lots of reasons to smile." },
];

export const questions = [
  {
    type: "memory",
    question: "Which option best describes our friendship?",
    options: ["A perfectly organised operation", "A highly entertaining chaos machine", "A formal business partnership"],
    answer: 1,
    reaction: "Obviously. The chaos is part of the charm. 😌",
  },
  {
    type: "this-or-that",
    question: "Pick the ideal birthday plan.",
    options: ["Great food 🍜", "A spontaneous adventure 🗺️", "A cosy day doing absolutely nothing 🛋️"],
    answer: 0,
    reaction: "A very respectable choice. Snacks are always a good idea.",
  },
  {
    type: "memory",
    question: "What should we collect more of this year?",
    options: ["More shared memories", "More ridiculous photos", "More stories we'll tell forever"],
    answer: 2,
    reaction: "Correct in spirit. Let's make it happen. 💜",
  },
];

export const playlist = [
  { title: "Your birthday soundtrack", artist: "Add your song here", note: "Replace this with a song that means something to you both." },
  { title: "The friendship anthem", artist: "Another favourite", note: "A little soundtrack for the memories." },
];
