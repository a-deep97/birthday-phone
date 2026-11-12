# The Birthday Phone 🎂

A playful, interactive birthday website built as a personalized smartphone. Explore the gallery, messages, memories, notes, music player, and birthday game show. Completing the games and exploring the apps unlocks the final birthday celebration.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Personalize it

Most content lives in **`src/data.ts`**. Edit the recipient/sender names, greeting, birthday letter, gallery captions, memories, chat messages, notes, playlist, and quiz questions there.

### Add real photos

Place images in `public/assets/`:

```text
public/
  assets/
    profile/
      recipient.jpg
    gallery/
      memory-1.jpg
      memory-2.jpg
      memory-3.jpg
      memory-4.jpg
    music/
      birthday-song.mp3
```

The current starter uses designed placeholder artwork for gallery images and the lock-screen portrait. To use your own photos, update `PhotoArt`/`PhotoCard` in `src/App.tsx` to render the corresponding `gallery[i].src`, and add a `profileImage` field to `birthday` in `src/data.ts` for the lock-screen image. The starter's gallery `src` values are already set to the paths above.

### Edit quiz questions

Each object in `questions` in `src/data.ts` has:
- `question`: the prompt.
- `options`: answer choices.
- `answer`: zero-based index of the correct answer.
- `reaction`: response shown after choosing.

Add or remove question objects without changing the quiz component.

### Change the final letter

Edit `birthday.letter` and `birthday.sender` in `src/data.ts`.

## Progress and reset

The website stores unlock state, visited apps, game score, and cake interaction in localStorage under:

```text
birthday-phone-progress
```

To replay from the beginning, open browser DevTools → Application → Local Storage and delete that key, then refresh.

## Notes

- This is a frontend-only project. No backend, account, or API key is required.
- Music playback is intentionally not wired to an arbitrary external track. Add a user-supplied or properly licensed audio file and connect it to the player if desired.
- The current gallery art is placeholder artwork; replace it with personal photos before sharing.
- The birthday game currently uses sample questions. Personalize them in `src/data.ts`.
