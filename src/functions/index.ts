import * as he from 'he';

export function replaceUnicodeCharacters(inputString: string, replacement: string = ''): string {
    // Use a regular expression to match Unicode characters
    const regex = /[\u007F-\uFFFF]/g;
    return inputString.replace(regex, replacement);
}

export function replaceHTMLEntitiesWithCharacters(inputString: string): string {
    return he.decode(inputString);
}

export function getEmojiByCategoryName(categoryName: string): string | null {
    const emojiMap: { [key: string]: string } = {
        "General Knowledge": "🧠",
        "Entertainment: Books": "📚",
        "Entertainment: Film": "🎬",
        "Entertainment: Music": "🎵",
        "Entertainment: Musicals & Theatres": "🎭",
        "Entertainment: Television": "📺",
        "Entertainment: Video Games": "🎮",
        "Entertainment: Board Games": "🎲",
        "Science & Nature": "🌿",
        "Science: Computers": "💻",
        "Science: Mathematics": "🧮",
        "Mythology": "🏛️",
        "Sports": "⚽",
        "Geography": "🌍",
        "History": "📜",
        "Politics": "🏛️",
        "Art": "🎨",
        "Celebrities": "🌟",
        "Animals": "🐾",
        "Vehicles": "🚗",
        "Entertainment: Comics": "🦸",
        "Science: Gadgets": "📱",
        "Entertainment: Japanese Anime & Manga": "🇯🇵",
        "Entertainment: Cartoon & Animations": "📺",
    };

    const emoji = emojiMap[categoryName];

    if (emoji) {
        return emoji;
    } else {
        return null;
    }
}

export function getGeneralEmojiByDifficulty(difficulty: string): string | null {
    const emojiMap: { [key: string]: string } = {
      easy: "😊",
      medium: "😐",
      hard: "😫",
    };
  
    if (emojiMap[difficulty]) {
      return emojiMap[difficulty];
    } else {
      return null;
    }
  }