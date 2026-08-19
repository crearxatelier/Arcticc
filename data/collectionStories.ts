export type CollectionStory = {
  handle: string;
  number: string;
  subtitle: string;
  meaningTitle: string;
  blurb: string;
  description: string;
};

export const collectionStories: CollectionStory[] = [
  {
    handle: "ursine-edition-i",
    number: "01",
    subtitle: "Relating to bears",
    meaningTitle: "The Story of Belonging",
    blurb: "Different names. Same stars.",
    description:
      "Inspired by the northern sky shared by different cultures and generations. Different names, different perspectives, yet the same stars above us — reminding us that connection exists beyond language and borders.",
  },
  {
    handle: "clutch",
    number: "02",
    subtitle: "Critical moments",
    meaningTitle: "The Story of Connection",
    blurb: "Some moments bring us together.",
    description:
      "Inspired by the moments that bring people together. The shared excitement, traditions, and memories created when communities gather around something they love.",
  },
  {
    handle: "polaris",
    number: "03",
    subtitle: "The North Star",
    meaningTitle: "The Story of Direction",
    blurb: "Look up. Find your North.",
    description:
      "Inspired by the North Star — a constant guide through uncertainty. A reminder that even when the path changes, there is always something steady guiding us forward.",
  },
  {
    handle: "campcode",
    number: "04",
    subtitle: "Code of cottage life",
    meaningTitle: "The Story of Simplicity",
    blurb: "Some memories need no words.",
    description:
      "Inspired by the quiet signals of northern life — nature, tradition, and moments shared without needing words. A reminder to slow down and appreciate what truly matters.",
  },
];

export function getCollectionStory(handle: string): CollectionStory | undefined {
  return collectionStories.find((story) => story.handle === handle);
}
