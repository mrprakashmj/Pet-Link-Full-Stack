
export type AppUser = {
    uid: string;
    email: string;
    displayName: string;
    firstName: string;
    lastName: string;
    photoURL: string;
};

export type Pet = {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed: string;
  age: string;
  size: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  location: string;
  description: string;
  story: string;
  medicalHistory: string;
  vaccinationStatus: 'Up to date' | 'Needs updates';
  specialNeeds: string[];
  energyLevel: 'Low' | 'Medium' | 'High';
  compatibility: {
    withChildren: 'Good' | 'Not Good' | 'Unknown';
    withPets: 'Good' | 'Not Good' | 'Unknown';
  };
  images: string[];
  status: 'Available' | 'Pending' | 'Adopted';
};

export type ForumReply = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
};

export type ForumPost = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  replies: ForumReply[];
  lastReply: {
    author: string;
    date: string;
  };
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  summary: string;
  image: string;
  content: string;
};
