import TipCard from "@/molecules/TipCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-cloudWhite p-6 font-poppins">
      <h1 className="text-4xl font-bold text-primary mb-6">Dashboard</h1>
      <div className="flex space-x-4">
        <TipCard
          text="Boost your fiber with a morning oatmeal bowl."
          icon={"Fa500Px"}
        />
        <TipCard
          text="Stay hydrated—aim for 8 cups of water today."
          icon={"Fa500Px"}
        />
      </div>
    </div>
  );
}
