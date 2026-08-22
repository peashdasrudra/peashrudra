/**
 * ══════════════════════════════════════════════════════════════════
 * 🎵 PEASH PORTFOLIO & COPILOT SOUNDTRACK PLAYLIST CONFIGURATION
 * ══════════════════════════════════════════════════════════════════
 * 
 * You can add, edit, or remove songs anytime here.
 * 
 * HOW TO ADD A NEW SONG:
 * 1. Find the song on YouTube (e.g. https://www.youtube.com/watch?v=ApXoWvfEYVU)
 * 2. Copy the Video ID after "v=" (e.g. "ApXoWvfEYVU")
 * 3. Add a new object to the PLAYLIST array below:
 *    {
 *      id: "unique-id",
 *      title: "Song Title",
 *      artist: "Artist Name",
 *      tag: "Genre or OST",
 *      youtubeId: "VIDEO_ID_HERE",
 *      color: "#1ed760" // Neon accent color
 *    }
 */

export const MUSIC_SETTINGS = {
  defaultVolume: 65, // Volume from 0 to 100
  shuffleOnStart: true, // Set to true to start on a random song, false to start from the beginning
};

export const PLAYLIST = [
  {
    id: "sunflower",
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    tag: "Spider-Verse OST",
    youtubeId: "ApXoWvfEYVU", // Post Malone, Swae Lee - Sunflower
    color: "#f59e0b",
  },
  {
    id: "dracula",
    title: "Dracula",
    artist: "Tame Impala & JENNIE",
    tag: "Psychedelic Pop",
    youtubeId: "JHl1L0rBeOE", // Official Tame Impala & JENNIE - Dracula
    color: "#ec4899",
  },
  {
    id: "nirvana",
    title: "Something In The Way",
    artist: "Nirvana",
    tag: "The Batman OST",
    youtubeId: "4VxdufqB9zg", // Nirvana - Something In The Way
    color: "#06b6d4",
  },
  // Template to add more songs:
  {
    id: "starboy",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    tag: "Cyber Synth",
    youtubeId: "34Na4j8AVgA",
    color: "#ef4444",
  },
];
