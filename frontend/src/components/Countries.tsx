interface props {
  name: string;
  emoji: string;
}

export default function Countries({ name, emoji }: props) {
  return (
    <div className="country">
      <h2>{name}</h2>
      <p>{emoji}</p>
    </div>
  );
}
