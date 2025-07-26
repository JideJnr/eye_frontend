import { useIonRouter } from "@ionic/react";
import { useControl } from "../../../contexts/useControlContext";
import { useEffect } from "react";

const Bots = () => {
  const router = useIonRouter();
  const { getAllEngine, engines, loading, error } = useControl();

  console.log('Engines:', engines);

  useEffect(() => {
    getAllEngine();
  }, []);


  return (
    <div className="bg-black text-green-400 font-mono w-full h-full p-4">
      <h2 className="text-lg font-bold mb-4">Available Bots</h2>
      <div className="grid gap-4">
        {engines?.map((engine: any) => (
          <div
            key={engine.id}
            onClick={() => router.push(`/engine/${engine.id}`, 'forward', 'push')}
            className="cursor-pointer border border-green-700 hover:bg-green-900 hover:text-black p-3 rounded transition-all"
          >
            {engine.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bots;
