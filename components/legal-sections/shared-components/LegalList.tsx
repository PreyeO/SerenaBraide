interface LegalListProps {
  items: { list: string }[];
}

const LegalList = ({ items }: LegalListProps) => {
  return (
    <ul className="list-disc ml-8 text-sm leading-5.5 text-[#6F6E6C]">
      {items.map((item, index) => (
        <li key={index}>{item.list}</li>
      ))}
    </ul>
  );
};

export default LegalList;
