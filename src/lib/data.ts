import type { Pet, ForumPost, Article } from './types';

const allPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    size: 'Large',
    location: 'Chennai, TN',
    description: 'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He is great with kids and other dogs.',
    story: 'Buddy was found as a stray and brought to a local shelter. He has since been neutered, vaccinated, and is now ready for a loving forever home.',
    medicalHistory: 'No major health issues. All vaccinations are up to date.',
    vaccinationStatus: 'Up to date',
    specialNeeds: ['Requires a fenced yard'],
    energyLevel: 'High',
    compatibility: {
      withChildren: 'Good',
      withPets: 'Good',
    },
    images: [
      'https://images.unsplash.com/photo-1592769255412-dbce67b8c064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxkb2clMjBnb2xkZW4lMjByZXRyaWV2ZXJ8ZW58MHx8fHwxNzU0MjM0NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1611003229244-fa443d2a2a96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHBhcHB5JTIwZG9nfGVufDB8fHx8MTc1NDMxODIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1699726165307-862e978fe3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx3aGl0ZSUyMHNtYWxsJTIwcHVwcHl8ZW58MHx8fHwxNzU0MzE4ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    status: 'Available',
  },
  {
    id: '2',
    name: 'Lucy',
    species: 'Cat',
    breed: 'Siamese',
    age: '3 years',
    size: 'Medium',
    location: 'Coimbatore, TN',
    description: 'Lucy is a calm and affectionate Siamese cat who enjoys cuddling and napping in sunbeams. She would do best in a quiet home.',
    story: 'Lucy was surrendered by her previous owner who could no longer care for her. She is a sweet girl looking for a peaceful home.',
    medicalHistory: 'Has mild allergies, managed with diet.',
    vaccinationStatus: 'Up to date',
    specialNeeds: ['Requires a grain-free diet'],
    energyLevel: 'Low',
    compatibility: {
      withChildren: 'Unknown',
      withPets: 'Not Good',
    },
    images: [
      'https://images.unsplash.com/photo-1677509948444-e95d10981589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2F0JTIwc2lhbWVzZXxlbnwwfHx8fDE3NTQyMzQ2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8Y2F0fGVufDB8fHx8MTc1NDMxOTAxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    status: 'Available',
  },
  {
    id: '3',
    name: 'Max',
    species: 'Dog',
    breed: 'German Shepherd',
    age: '4 years',
    size: 'Large',
    location: 'Madurai, TN',
    description: 'Max is a loyal and intelligent German Shepherd. He is very active and would love a home with a large yard and an owner who enjoys training.',
    story: 'Max was rescued from an overcrowded shelter. He is a very smart dog who already knows several commands.',
    medicalHistory: 'Healthy and strong.',
    vaccinationStatus: 'Up to date',
    specialNeeds: [],
    energyLevel: 'High',
    compatibility: {
      withChildren: 'Good',
      withPets: 'Unknown',
    },
    images: [
      'https://images.unsplash.com/photo-1658749075623-dc8f5d15d18c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxkb2clMjBnZXJtYW4lMjBzaGVwaGVyZHxlbnwwfHx8fDE3NTQyMzQ2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1596594319248-ed6317858e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxkb2clMjBnZXJtYW4lMjBzaGVwaGVyZHxlbnwwfHx8fDE3NTQyMzQ2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1622507141724-8ead15590e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkb2clMjBnZXJtYW4lMjBzaGVwaGVyZHxlbnwwfHx8fDE3NTQyMzQ2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1666813382963-b4e7f58f5358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxkb2clMjBnZXJtYW4lMjBzaGVwaGVyZHxlbnwwfHx8fDE3NTQyMzQ2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    status: 'Available',
  },
  {
    id: '4',
    name: 'Whiskers',
    species: 'Other',
    breed: 'Rabbit',
    age: '1 year',
    size: 'Small',
    location: 'Chennai, TN',
    description: 'Whiskers is a curious and playful rabbit. He loves hopping around and munching on fresh vegetables.',
    story: 'Whiskers was found abandoned in a park. He is litter-trained and very clean.',
    medicalHistory: 'No issues.',
    vaccinationStatus: 'Up to date',
    specialNeeds: ['Needs a large, secure hutch.'],
    energyLevel: 'Medium',
    compatibility: {
      withChildren: 'Good',
      withPets: 'Not Good',
    },
    images: [
      'https://images.unsplash.com/photo-1659461670783-8f185934d532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8cmFiaXR8ZW58MHx8fHwxNzU0MjM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYWJpdHxlbnwwfHx8fDE3NTQyMzYxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    status: 'Available',
  },
  {
    id: '5',
    name: 'Bella',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: '1 year',
    size: 'Medium',
    location: 'Coimbatore, TN',
    description: 'Bella is a sweet and playful Labrador puppy. She is full of energy and love.',
    story: 'Bella was part of an unplanned litter. She is well-socialized and ready to join her new family.',
    medicalHistory: 'Healthy puppy.',
    vaccinationStatus: 'Up to date',
    specialNeeds: ['Typical puppy training needed.'],
    energyLevel: 'High',
    compatibility: {
      withChildren: 'Good',
      withPets: 'Good',
    },
    images: [
      'https://images.unsplash.com/photo-1566898366079-bfb480d669ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkb2clMjBsYWJyYWRvciUyMHJldHJpZXZlcnxlbnwwfHx8fDE3NTQyMzQ2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1517364875271-d5df5c419fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8QmVsbGElMjBpcyUyMGElMjBzd2VldCUyMGFuZCUyMHBsYXlmdWwlMjBMYWJyYWRvciUyMHB1cHB5LiUyMFNoZSUyMGlzJTIwZnVsbCUyMG9mJTIwZW5lcmd5JTIwYW5kJTIwbG92ZS58ZW58MHx8fHwxNzU0MjM2OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    status: 'Available',
  },
  {
    id: '6',
    name: 'Oreo',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '6 months',
    size: 'Small',
    location: 'Madurai, TN',
    description: 'Oreo is a playful and mischievous kitten with a beautiful black and white coat. He loves chasing toys and exploring.',
    story: 'Oreo was born at the shelter after his mother was rescued. He is a bundle of joy.',
    medicalHistory: 'Healthy and vaccinated.',
    vaccinationStatus: 'Up to date',
    specialNeeds: [],
    energyLevel: 'High',
    compatibility: {
      withChildren: 'Good',
      withPets: 'Good',
    },
    images: [
      'https://images.unsplash.com/photo-1551340793-2483028a2a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxraXR0ZW4lMjB3aXRoJTIwYSUyMGJlYXV0aWZ1bCUyMGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBjb2F0fGVufDB8fHx8MTc1NDIzNjQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1551340793-2483028a2a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxraXR0ZW4lMjB3aXRoJTIwYSUyMGJlYXV0aWZ1bCUyMGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBjb2F0fGVufDB8fHx8MTc1NDIzNjQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    status: 'Available',
  },
];

export function getPets(): Pet[] {
    return allPets;
}

export function getFeaturedPets(): Pet[] {
    return allPets.slice(0, 4);
}

export const forumPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'Adoption Success Story: Welcome home, Buddy!',
    author: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    date: '2 days ago',
    content: 'We just adopted Buddy and he is the most wonderful dog! The process with PetLink was so smooth. Here he is enjoying his new backyard. We are so in love!',
    replies: [
      {
        id: 'reply-1-1',
        author: 'Admin',
        avatar: 'https://placehold.co/40x40.png',
        date: '1 hour ago',
        content: 'That is wonderful to hear! Congratulations on your new family member.',
      }
    ],
    lastReply: {
      author: 'Admin',
      date: '1 hour ago',
    },
  },
  {
    id: 'post-2',
    title: 'Question about introducing a new cat to my resident dog',
    author: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    date: '1 day ago',
    content: 'I\'m thinking of adopting Lucy, but I have a 5-year-old beagle at home. Does anyone have tips for a slow and safe introduction? Any advice is appreciated!',
    replies: [
        {
            id: 'reply-2-1',
            author: 'CatExpert',
            avatar: 'https://placehold.co/40x40.png',
            date: '3 hours ago',
            content: 'Slow and steady wins the race! Keep them in separate rooms for a few days and let them get used to each other\'s scent.',
        }
    ],
    lastReply: {
      author: 'CatExpert',
      date: '3 hours ago',
    },
  },
  {
    id: 'post-3',
    title: 'Best food for a rabbit?',
    author: 'Emily White',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80',
    date: '5 days ago',
    content: 'Just brought home a lovely rabbit named Whiskers. What brand of pellets and types of hay do you all recommend for a healthy diet?',
    replies: [],
    lastReply: {
      author: 'BunnyLover',
      date: '22 hours ago',
    },
  },
];

export const articles: Article[] = [
  {
    slug: 'choosing-the-right-pet',
    title: 'How to Choose the Right Pet for Your Family',
    category: 'Adoption Tips',
    author: 'Dr. Anna Veterinaria',
    publishedDate: 'June 1, 2024',
    readingTime: '7 min read',
    summary: 'Finding the perfect pet involves considering your lifestyle, home environment, and personality. This guide walks you through the key factors to ensure a happy match for both you and your new companion.',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhZG9wdGlvbiUyMHRpcHMlMjBwZXR8ZW58MHx8fHwxNzU0NDQwMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    content: '...',
  },
  {
    slug: 'first-30-days-with-new-dog',
    title: 'The First 30 Days: A Guide to Bringing Your New Dog Home',
    category: 'Dog Care',
    author: 'Mark Dogtrainer',
    publishedDate: 'May 20, 2024',
    readingTime: '10 min read',
    summary: 'The initial period after adoption is crucial for building a strong bond. Learn how to manage the transition, establish routines, and make your new dog feel safe and loved.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkb2clMjBjYXJlJTIwcGV0fGVufDB8fHx8MTc1NDQ0MDM4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    content: '...',
  },
  {
    slug: 'cat-behavior-basics',
    title: 'Decoding Your Cat: Understanding Feline Behavior',
    category: 'Cat Care',
    author: 'FelineGood Magazine',
    publishedDate: 'May 15, 2024',
    readingTime: '8 min read',
    summary: 'Cats communicate in subtle ways. This article helps you understand common cat behaviors, from purring and kneading to tail flicking, so you can better connect with your feline friend.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXQlMjBjYXJlJTIwcGV0fGVufDB8fHx8MTc1NDQ0MDM4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    content: '...',
  },
];

    
