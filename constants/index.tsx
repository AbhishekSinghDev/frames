import Feather from "@expo/vector-icons/Feather";

type IconProps = {
  color: string;
  size?: number;
};

export const icon = {
  index: (props: IconProps) => <Feather name="home" size={24} {...props} />,
  favorites: (props: IconProps) => (
    <Feather name="heart" size={24} {...props} />
  ),
  grids: (props: IconProps) => <Feather name="grid" size={24} {...props} />,
};

export const filters = [
  { id: "1", text: "backgrounds" },
  { id: "2", text: "fashion" },
  { id: "3", text: "nature" },
  { id: "4", text: "science" },
  { id: "5", text: "education" },
  { id: "6", text: "feelings" },
  { id: "7", text: "health" },
  { id: "8", text: "people" },
  { id: "9", text: "religion" },
  { id: "10", text: "places" },
  { id: "11", text: "animals" },
  { id: "12", text: "industry" },
  { id: "13", text: "computer" },
  { id: "14", text: "food" },
  { id: "15", text: "sports" },
  { id: "16", text: "transportation" },
  { id: "17", text: "travel" },
  { id: "18", text: "buildings" },
  { id: "19", text: "business" },
  { id: "20", text: "music" },
];
