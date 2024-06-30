const Card = ({ label, value, Icon }: any) => {
  return (
    <div className="flex w-1/4 rounded-2xl bg-emerald-900 p-8 items-start gap-6">
      <div>{Icon}</div>
      <div className="flex flex-col justify-center items-start">
        <div>{label}</div>
        <div className="text-4xl font-semibold">{value}</div>
      </div>
    </div>
  );
};

export default Card;
