interface HeadingProps {
  className: string;
  title: string;
}

const Caption: React.FC<HeadingProps> = ({ className, title }) => {
  return <h3 className={`${className} font-GeneralSans  `}>{title}</h3>;
};

export default Caption;
