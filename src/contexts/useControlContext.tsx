import { createContext, useContext, ReactNode, useState } from 'react';
import { useEngineStore } from '../stores/useEnginesStore';


const ControlContext = createContext<ControlContextType | undefined>(undefined);

export const ControlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    startEaglesEye,
    stopEaglesEye,
    getAllEngines,
    startEngineById,
    checkEngineStatus,
    stopEngineById,
    eyeStatus,
    loading: apiLoading,
    error,
  } = useEngineStore();

   
  const [eaglesEye, setEaglesEye] = useState(false);
  const [engine, setEngine] = useState<any[]>([]);
  const [engines, setEngines] = useState<any>(null);

  const wrappedStartEaglesEye = async () => {
    const response = await startEaglesEye();
    if (response?.success) {
      setEaglesEye(response.success);
    }

  };

  const wrappedStopEaglesEye = async () => {
    const response = await stopEaglesEye();
    if (response?.success) {
      setEaglesEye(false);
    }
  };

  const toggleEaglesEye = async () => {
    if (eyeStatus) {
      const response = await wrappedStopEaglesEye();
      if (response?.success) {
        setEaglesEye(false);
      }
    } else {
      const response = await wrappedStartEaglesEye();
      if (response?.success) {
        setEaglesEye(true);
      }
    }


  };

  const WrappedGetAllEngines = async () => {
    const response = await getAllEngines();
    if (response?.success) {
      setEngines(response.data || []);
    }
  };

  const wrappedStartEngineById = async (id: string) => {
    const response = await startEngineById(id);

  };

  const wrappedGetEngineStatusById = async (id: string) => {
    const response = await checkEngineStatus(id);
    if (response?.success) {
      const engineStatus = response.data || {};
      setEngine(engineStatus);
    }
  };

  const wrappedStopEngineById = async (id: string) => {
    const response = await stopEngineById(id);
  };

  return (
    <ControlContext.Provider
      value={{
        toggleEngine: toggleEaglesEye,
        getAllEngine: WrappedGetAllEngines,
        getEngineById: wrappedGetEngineStatusById,
        startEngineById: wrappedStartEngineById,
        stopEngineById: wrappedStopEngineById,
        eaglesEye,
        engine,
        engines,
        eyeStatus,
        loading: apiLoading,
        error,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

export const useControl = () => {
  const context = useContext(ControlContext);
  if (!context) throw new Error('useControl must be used within a ControlProvider');
  return context;
};
