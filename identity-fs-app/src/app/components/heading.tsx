
type HeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

const Heading = ({
  title,
  description,
}: HeadingProps) => {


  return (
    <>
      <div className="text-lg font-bold">{title}</div>
    </>
  );
};

export default Heading;