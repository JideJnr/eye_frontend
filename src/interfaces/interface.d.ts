interface AnalyticsState {
  analytics: [];
  bot: [];
  loading: boolean;
  error: string | null;
  
  getOverview: () => Promise<void>;
  getBotMetrics: (id:string) => Promise<void>;
  getBotPredictions: (id:string) => Promise<void>;
}

interface AnalyticContextType {
  bot: any;
  bots :any;
  loading: boolean;
  error: string |null;
  

  getAll: () => Promise<void>;
  getBotById: (id: string) => Promise<void>;
}

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface EngineState {
  eaglesEye: boolean;
  engine: any;
  engines: any;
  eyeStatus: boolean;
  loading: boolean;
  error: string | null;

  startEaglesEye: () => Promise<void>;
  stopEaglesEye: () => Promise<void>;
  getAllEngines: () => Promise<void>;
  startEngineById: (id: string) => Promise<void>;
  checkEngineStatus: (id: string) => Promise<void>;
  stopEngineById: (id: string) => Promise<void>;
} 

interface ControlContextType {
  toggleEngine: () => Promise<void>;
  getAllEngine: () => Promise<void>;
  getEngineById: (id: string) => Promise<void>;
  startEngineById: (id: string) => Promise<void>;
  stopEngineById: (id: string) => Promise<void>;
  eaglesEye: any;
  engine: any;
  engines: any;
  eyeStatus: boolean;
  loading: boolean;
  error: string | null;
}

interface ControlContextProviderProps {
  children: React.ReactNode;
}




