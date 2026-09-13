export type VideoTestimony = {
  name: string;
  role: string;
  src: string;
  poster: string;
  quote: string;
};

export const videoTestimonies: VideoTestimony[] = [
  {
    name: "Oseyi Martins",
    role: "Scholarship beneficiary",
    src: "/testimonies/oseyi-martins.mp4",
    poster: "/testimonies/oseyi-martins.jpg",
    quote:
      "This foundation sponsored me through my final year of SSCE and Bible school. I am grateful they will stand with me in university too.",
  },
  {
    name: "Patience Joshua",
    role: "Beneficiary",
    src: "/testimonies/patience-joshua.mp4",
    poster: "/testimonies/patience-joshua.jpg",
    quote:
      "Everybody needs help. God places people in our lives so we can lift one another — and I need help also.",
  },
];
