interface SubHeadingProps {
  className: string;
  title: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ className, title }) => {
  return <h2 className={`${className}  `}>{title}</h2>;
};

export default SubHeading;
