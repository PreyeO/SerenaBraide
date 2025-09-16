interface HeadingProps {
  className: string;
  title: string;
}

const Caption: React.FC<HeadingProps> = ({ className, title }) => {
  return <h4 className={`${className} font-GeneralSans  `}>{title}</h4>;
};

export default Caption;
