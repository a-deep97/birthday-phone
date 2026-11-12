import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BatteryFull, Signal, Wifi, Camera, MessageCircle, Images, Clock3, Music2,
  StickyNote, Gamepad2, Heart, LockKeyhole, ChevronLeft, X, Bell, Sparkles,
  Play, Pause, Volume2, Trophy, Gift, Smile, ArrowRight, Star, Cake, Check,
} from "lucide-react";
import { birthday, gallery, memories, messages, notes, questions, playlist } from "./data";

type AppKey = "gallery" | "messages" | "memories" | "notes" | "music" | "games" | "about";

const APP_META: Record<AppKey, { label: string; icon: typeof Images; color: string; hint: string }> = {
  gallery: { label: "Gallery", icon: Images, color: "peach", hint: "little moments" },
  messages: { label: "Messages", icon: MessageCircle, color: "blue", hint: "a few words" },
  memories: { label: "Memories", icon: Clock3, color: "yellow", hint: "the story so far" },
  notes: { label: "Notes", icon: StickyNote, color: "pink", hint: "tiny reminders" },
  music: { label: "Music", icon: Music2, color: "purple", hint: "our soundtrack" },
  games: { label: "Birthday Game", icon: Gamepad2, color: "green", hint: "your big moment" },
  about: { label: "About You", icon: Heart, color: "coral", hint: "the birthday edition" },
};

function readProgress() {
  try { return JSON.parse(localStorage.getItem("birthday-phone-progress") || '{"unlocked":false,"visited":[],"completed":false,"score":0,"cakeBlown":false}'); }
  catch { return { unlocked: false, visited: [], completed: false, score: 0, cakeBlown: false }; }
}

export default function App() {
  const [progress, setProgress] = useState(readProgress);
  const [activeApp, setActiveApp] = useState<AppKey | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [notification, setNotification] = useState("A special delivery has arrived 💌");
  const [showNotification, setShowNotification] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => { localStorage.setItem("birthday-phone-progress", JSON.stringify(progress)); }, [progress]);

  const visitedCount = progress.visited.length;
  const allVisited = visitedCount >= 6;
  const currentQuestion = questions[questionIndex];
  const finalUnlocked = progress.completed || (allVisited && progress.score >= 1);

  const unlock = () => {
    setProgress((p: any) => ({ ...p, unlocked: true }));
    setNotification("Welcome in. Your birthday adventure awaits ✨");
    setShowNotification(true);
    window.setTimeout(() => setShowNotification(false), 3500);
  };

  const openApp = (key: AppKey) => {
    setActiveApp(key);
    setProgress((p: any) => ({ ...p, visited: p.visited.includes(key) ? p.visited : [...p.visited, key] }));
  };

  const closeApp = () => { setActiveApp(null); setPhotoIndex(null); };

  const submitAnswer = () => {
    if (selected === null) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    const correct = selected === currentQuestion.answer;
    setProgress((p: any) => ({ ...p, score: p.score + (correct ? 1 : 0) }));
  };

  const nextQuestion = () => {
    setSelected(null);
    if (questionIndex + 1 < questions.length) setQuestionIndex(questionIndex + 1);
    else {
      setProgress((p: any) => ({ ...p, completed: true }));
      setNotification("Birthday Champion unlocked! Your final surprise is ready 🎁");
      setShowNotification(true);
      window.setTimeout(() => setShowNotification(false), 4000);
    }
  };

  const resetGame = () => { setQuestionIndex(0); setSelected(null); setAnswers([]); setProgress((p: any) => ({ ...p, score: 0, completed: false })); };

  const launchFinal = () => { setShowFinal(true); setActiveApp(null); };
  const closeFinal = () => setShowFinal(false);

  return (
    <main className="scene">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="page-heading">
        <span className="eyebrow"><Sparkles size={13} /> A DIGITAL GIFT, MADE WITH LOVE</span>
        <h1>A little world <span>just for you.</span></h1>
        <p>Take your time. There are a few surprises hiding in here.</p>
      </header>

      <div className="phone-wrap">
        <div className="phone">
          <div className="phone-side side-left" /><div className="phone-side side-right" />
          <div className="screen">
            <div className="wallpaper-glow" />
            {!progress.unlocked ? (
              <motion.section className="lock-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="status"><span>9:41</span><span className="status-icons"><Signal size={13}/><Wifi size={13}/><BatteryFull size={16}/></span></div>
                <div className="lock-content">
                  <div className="lock-badge"><span>✦</span> {birthday.dateLabel}</div>
                  <div className="lock-clock">09:41</div>
                  <div className="lock-date">A very special day</div>
                  <div className="portrait-placeholder">
                    <div className="portrait-inner"><Smile size={48}/><span>Your photo goes here</span></div>
                    <span className="photo-spark spark-a">✦</span><span className="photo-spark spark-b">✧</span>
                  </div>
                  <h2>Hey, {birthday.recipient}!</h2>
                  <p>{birthday.greeting}</p>
                  <div className="lock-notification"><Bell size={15}/><div><b>One new surprise</b><span>Someone made something for you…</span></div><span className="notif-dot"/></div>
                </div>
                <button className="unlock-button" onClick={unlock}><span className="unlock-arrow">↑</span><span>Tap to unlock your surprise</span></button>
                <div className="home-indicator"/>
              </motion.section>
            ) : (
              <>
                <div className="status status-home"><span>9:41</span><span className="status-icons"><Signal size={13}/><Wifi size={13}/><BatteryFull size={16}/></span></div>
                <AnimatePresence>
                  {!activeApp && !showFinal && (
                    <motion.section className="home-screen" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }}>
                      <div className="home-welcome"><span>HAPPY BIRTHDAY ✦</span><h2>{birthday.recipient}</h2><p>Make yourself at home.</p></div>
                      <div className="app-grid">
                        {(Object.keys(APP_META) as AppKey[]).map((key, i) => {
                          const item = APP_META[key]; const Icon = item.icon;
                          return <motion.button key={key} className="app-shortcut" whileTap={{ scale: .92 }} onClick={() => openApp(key)}>
                            <span className={`app-icon ${item.color}`}><Icon size={23}/>{key === "messages" && <i className="app-badge"/>}</span>
                            <span className="app-label">{item.label}</span>
                          </motion.button>;
                        })}
                      </div>
                      <div className="home-widget">
                        <div className="widget-icon">✿</div><div><b>A note for today</b><span>You're someone's favourite plot twist.</span></div><Sparkles size={18}/>
                      </div>
                      <div className="dock">
                        <button onClick={() => openApp("messages")}><MessageCircle size={21}/></button>
                        <button onClick={() => openApp("gallery")}><Camera size={21}/></button>
                        <button onClick={() => openApp("games")}><Gamepad2 size={21}/></button>
                        <button onClick={() => setShowNotification(true)}><Bell size={21}/></button>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {activeApp && <motion.section className="app-view" key={activeApp} initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 25, opacity: 0 }} transition={{ type: "spring", stiffness: 330, damping: 30 }}>
                    <div className="app-topbar"><button onClick={closeApp}><ChevronLeft size={19}/> Home</button><span>{APP_META[activeApp].label}</span><button className="close-icon" onClick={closeApp}><X size={17}/></button></div>
                    <div className="app-content">
                      {activeApp === "gallery" && <Gallery onOpen={setPhotoIndex}/>}
                      {activeApp === "messages" && <Messages/>}
                      {activeApp === "memories" && <Memories/>}
                      {activeApp === "notes" && <Notes/>}
                      {activeApp === "music" && <Music playing={playing} setPlaying={setPlaying} playlist={playlist}/>}
                      {activeApp === "games" && <Games index={questionIndex} selected={selected} setSelected={setSelected} answers={answers} submit={submitAnswer} next={nextQuestion} reset={resetGame} completed={progress.completed} score={progress.score}/>}
                      {activeApp === "about" && <About/>}
                    </div>
                  </motion.section>}
                </AnimatePresence>

                {photoIndex !== null && <div className="modal-backdrop" onClick={() => setPhotoIndex(null)}><div className="photo-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setPhotoIndex(null)}><X/></button><PhotoCard index={photoIndex} large/><div className="photo-nav"><button onClick={() => setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)}>← Previous</button><button onClick={() => setPhotoIndex((photoIndex + 1) % gallery.length)}>Next →</button></div></div></div>}

                {showNotification && <motion.button className="floating-notification" initial={{ y: -70, opacity: 0 }} animate={{ y: 12, opacity: 1 }} exit={{ y: -70, opacity: 0 }} onClick={() => { setShowNotification(false); openApp("notes"); }}><span className="notif-icon"><Bell size={16}/></span><span><b>Birthday Phone</b><small>{notification}</small></span><X size={14} onClick={e => { e.stopPropagation(); setShowNotification(false); }}/></motion.button>}

                {!activeApp && !showFinal && <div className="phone-bottom"><span>{visitedCount}/6 apps explored</span><div className="progress-track"><i style={{width: `${Math.min(100, visitedCount / 6 * 100)}%`}}/></div><span className="tiny-heart">♥</span></div>}

                {showFinal && <FinalCelebration close={closeFinal} letterOpen={letterOpen} setLetterOpen={setLetterOpen} cakeBlown={progress.cakeBlown} setCakeBlown={(v: boolean) => setProgress((p: any) => ({...p, cakeBlown:v}))}/>}
              </>
            )}
          </div>
        </div>
        <div className="phone-shadow"/>
      </div>

      <aside className="outside-hint">
        <span className="hint-star">✳</span>
        <div><b>A tiny hint</b><p>Explore the apps, play the birthday game, and see what you unlock.</p></div>
      </aside>

      <footer className="page-footer"><span>MADE WITH ♥ FOR A VERY SPECIAL HUMAN</span><button onClick={() => setSoundOn(!soundOn)}><Volume2 size={14}/>{soundOn ? "Sound on" : "Sound off"}</button></footer>

      {finalUnlocked && !showFinal && <motion.button className="final-unlock" initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={launchFinal}><Gift size={17}/> Open your final surprise <ArrowRight size={16}/></motion.button>}
    </main>
  );
}

function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return <><div className="section-intro"><span className="mini-label">YOUR LITTLE TIME CAPSULE</span><h2>Captured moments 📸</h2><p>Some days deserve to be kept forever.</p></div><div className="gallery-grid">{gallery.map((item, i) => <button className={`gallery-tile tile-${i}`} key={item.title} onClick={() => onOpen(i)}><PhotoArt index={i}/><span>{item.title}</span></button>)}</div><p className="content-footnote">Tap a photo to open the memory. Replace the placeholders with your own pictures.</p></>;
}

function PhotoArt({ index }: { index: number }) {
  const motifs = ["✿", "☀", "♡", "✦"];
  return <div className={`photo-art art-${index}`}><span className="art-motif">{motifs[index % motifs.length]}</span><span className="art-caption">PHOTO {String(index + 1).padStart(2, "0")}</span><span className="art-doodle">✧</span></div>;
}
function PhotoCard({ index, large = false }: { index: number; large?: boolean }) {
  const item = gallery[index];
  return <div className={`photo-card ${large ? "large" : ""}`}><div className="photo-placeholder"><PhotoArt index={index}/></div><h3>{item.title}</h3><p>{item.caption}</p></div>;
}

function Messages() {
  return <><div className="section-intro"><span className="mini-label">INBOX · 4 MESSAGES</span><h2>A little chat 💬</h2><p>Important birthday correspondence.</p></div><div className="chat-date">TODAY · THE MOST IMPORTANT DAY</div><div className="chat-list">{messages.map((m, i) => <div className={`chat-row ${m.from === "You" ? "mine" : ""}`} key={i}><div className="chat-bubble">{m.text}<small>{m.time}</small></div></div>)}</div><div className="chat-compose"><span>Write a reply…</span><span>☺</span><span className="send-dot">↑</span></div></>;
}
function Memories() {
  return <><div className="section-intro"><span className="mini-label">A TIMELINE OF US</span><h2>Remember when? ✨</h2><p>A few chapters in a story that's still being written.</p></div><div className="memory-timeline">{memories.map((m, i) => <div className="memory-item" key={m.title}><div className="memory-marker">{m.emoji}</div><div className="memory-card"><span>{m.date}</span><h3>{m.title}</h3><p>{m.body}</p></div></div>)}</div></>;
}
function Notes() {
  const [revealed, setRevealed] = useState<number[]>([0]);
  return <><div className="section-intro"><span className="mini-label">STICKY NOTES FROM YOUR PERSON</span><h2>Things to remember 📝</h2><p>Tap each note. Some feelings are easier to write down.</p></div><div className="notes-stack">{notes.map((n, i) => <button key={n.title} className={`note-card note-${i}`} onClick={() => setRevealed(r => r.includes(i) ? r : [...r, i])}><span className="note-pin"/><span className="note-title">{revealed.includes(i) ? n.title : "A note for you · tap to reveal"}</span>{revealed.includes(i) ? <p>{n.body}</p> : <span className="note-hidden">✧ ✧ ✧</span>}</button>)}</div></>;
}
function Music({ playing, setPlaying, playlist }: { playing: boolean; setPlaying: (v: boolean) => void; playlist: typeof import("./data").playlist }) {
  return <><div className="section-intro"><span className="mini-label">THE SOUNDTRACK</span><h2>Press play on joy 🎧</h2><p>A playlist for the main character.</p></div><div className="music-art"><div className="vinyl"><div/></div><span>THE BIRTHDAY MIX</span></div><div className="now-playing"><span className="mini-label">NOW PLAYING</span><h3>{playlist[0].title}</h3><p>{playlist[0].artist}</p><div className="fake-progress"><i/></div><div className="music-controls"><button onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}</button></div><small>{playing ? "Imagine your favourite song playing ✨" : "Add your own audio file to make this real."}</small></div><div className="playlist">{playlist.map((s, i) => <div key={s.title}><span className="track-no">0{i+1}</span><div><b>{s.title}</b><small>{s.artist}</small></div><span>♪</span></div>)}</div></>;
}
function Games({ index, selected, setSelected, answers, submit, next, reset, completed, score }: any) {
  const q = questions[index];
  if (completed) return <div className="game-complete"><div className="trophy-art"><Trophy size={48}/><span>✦</span></div><span className="mini-label">ROUND COMPLETE</span><h2>You did it! 🏆</h2><p>You scored {score} out of {questions.length}. But honestly, you're already a winner.</p><div className="score-pill"><Star size={16}/> {score} points earned</div><button className="primary-button" onClick={reset}>Play again <ArrowRight size={16}/></button><p className="game-unlock-note">Your final surprise may now be unlocked…</p></div>;
  return <><div className="section-intro"><span className="mini-label">THE BIRTHDAY SHOW · ROUND {index+1}/{questions.length}</span><h2>Let's see what you know! 🎮</h2><p>No pressure. Your reputation is only slightly on the line.</p></div><div className="game-progress"><div><span>YOUR PROGRESS</span><b>{index+1} / {questions.length}</b></div><div className="progress-track"><i style={{width:`${(index+1)/questions.length*100}%`}}/></div></div><div className="question-card"><span className="question-number">QUESTION 0{index+1}</span><h3>{q.question}</h3><div className="answer-list">{q.options.map((o: string, i: number) => <button key={o} className={selected === i ? "answer selected" : "answer"} onClick={() => setSelected(i)}><span>{String.fromCharCode(65+i)}</span>{o}{selected === i && <Check size={16}/>}</button>)}</div>{selected !== null && <div className="answer-reaction">{selected === q.answer ? "✨ " : "😄 "}{q.reaction}</div>}<button className="primary-button" disabled={selected === null} onClick={selected === null ? undefined : (answers.length === index ? submit : next)}>{answers.length === index ? "Lock in answer" : "Next question"} <ArrowRight size={16}/></button>{answers.length > index && <button className="text-button" onClick={next}>Continue</button>}</div></>;
}
function About() {
  return <><div className="about-hero"><div className="about-orbit">✦</div><div className="about-heart"><Heart size={36} fill="currentColor"/></div><span className="mini-label">THE BIRTHDAY EDITION</span><h2>One of a kind.</h2><p>Officially certified as a wonderful human being.</p></div><div className="compliment-list"><div>✦ Excellent company</div><div>✦ Collector of good memories</div><div>✦ Professionally unforgettable</div><div>✦ Deserves all the good things</div></div><p className="content-footnote">This list is scientifically accurate. No further questions.</p></>;
}
function FinalCelebration({ close, letterOpen, setLetterOpen, cakeBlown, setCakeBlown }: any) {
  return <motion.div className="final-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><button className="final-close" onClick={close}><X/></button><div className="confetti">✦　·　✧　✦　·　✧　✦</div><span className="mini-label">YOU FOUND THE FINAL SURPRISE</span><h2>Happy Birthday! <span>🎂</span></h2><p className="final-subtitle">Today, the universe gets to celebrate you.</p><div className="cake-wrap"><div className="cake-candles"><i/><i/><i/></div><div className="cake-top"/><div className="cake-body"><span>♥</span><span>♥</span><span>♥</span></div><div className="cake-plate"/></div><button className="primary-button cake-button" onClick={() => setCakeBlown(true)}>{cakeBlown ? "Wish made! ✨" : "Blow out the candles"}</button>{cakeBlown && <p className="wish-message">May this year be your brightest one yet. 💜</p>}<button className="letter-button" onClick={() => setLetterOpen(!letterOpen)}><Heart size={16}/> {letterOpen ? "Hide your letter" : "There's a letter for you"}</button><AnimatePresence>{letterOpen && <motion.div className="birthday-letter" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><span>DEAR {birthday.recipient.toUpperCase()},</span><p>{birthday.letter}</p><b>With lots of love,</b><strong>{birthday.sender} ♥</strong></motion.div>}</AnimatePresence><div className="final-footer">MADE WITH LOVE · JUST FOR YOU</div></motion.div>;
}
