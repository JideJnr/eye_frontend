import { useEffect, useState } from 'react';
import { IonButton } from '@ionic/react';
import { useControl } from '../../../contexts/useControlContext';

const Offline = () => {
  const { eagleStatus, loading, error, toggleEngine } = useControl();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono w-full h-full p-4">
      <div className="flex flex-col h-fit my-auto">
        <div className="flex justify-center mb-6">
          <IonButton
            shape="round"
            size="large"
            disabled={loading}
            className={`w-32 h-32 rounded-full text-xl font-mono shadow-lg transition-all
              ${eagleStatus
                ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/30'
                : 'bg-gradient-to-br from-purple-500 to-indigo-700 shadow-purple-500/30'}
              ${loading ? 'animate-pulse' : ''}`}
            onClick={() => !loading && toggleEngine()}
          >
            {loading ? '...' : eagleStatus ? 'TERMINATE' : 'ACTIVATE'}
          </IonButton>
        </div>

        <div className="mt-4 flex justify-between text-xs text-slate-500">
          <div>
            STATUS:{' '}
            {eagleStatus ? (
              <span className="text-green-400">OPERATIONAL</span>
            ) : (
              <span className="text-red-400">OFFLINE</span>
            )}
            {loading && <span className="ml-2 text-yellow-400">CONNECTING...</span>}
          </div>
          <div>v2.4.0 | {time.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
