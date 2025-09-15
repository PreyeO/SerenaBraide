interface ParagraphProps {
  className: string;
  content: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ className, content }) => {
  return <p className={`${className} font-GeneralSans  `}>{content}</p>;
};

export default Paragraph;
