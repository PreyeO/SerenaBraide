interface HeadingProps {
  className: string;
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ className, title }) => {
  return <h1 className={`${className} font-GeneralSans  `}>{title}</h1>;
};

export default Heading;
