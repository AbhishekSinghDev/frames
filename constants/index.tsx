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
