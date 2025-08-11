import { create } from 'zustand'
import * as api from '../services/api' 

interface EngineState {
  eagleStatus: boolean
  data: any
  loading: boolean
  error: string | null
  message: string | null
  startEaglesEye: () => Promise<void>
  stopEaglesEye: () => Promise<void>
  checkEyeStatus: () => Promise<void>
  getAllEngines: () => Promise<void>
  startEngineById: (id: string) => Promise<void>
  stopEngineById: (id: string) => Promise<void>
  checkEngineStatus: (id: string) => Promise<void>
}

export const useEngineStore = create<EngineState>((set) => ({
  data: null,
  loading: false,
  error: null,
  message: null,
  eagleStatus: false,
  bot:null,

  startEaglesEye: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.startEaglesEye()

        if (!res.success) {
          if (res.status === "ENGINE_ALREADY_RUNNING") {
            set({ loading: false , message: res.message , error: null, eagleStatus: true });
          } else {
            set({ loading: false, error: res.error, message: res.message });
          }
        }
        if (res.success) {
            set({loading: false , message: res.message , error: null, eagleStatus: true })
        }

  
        
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },

  stopEaglesEye: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.stopEaglesEye()

        if (!res.success) {
            set({loading: false , error: res.error || 'Failed to stop engine' , message: res.message})
        }
        if (res.success) {
            set({  loading: false , message: res.message , error: null, eagleStatus: false })
        }

        
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },

  checkEyeStatus: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.checkEyeStatus()

        if (!res.success) {
            set({loading: false , error: res.error  , message: res.message})
        }
        if (res.success) {
            set({  loading: false , message: res.message , error: null  })
        }

        
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },

  getAllEngines: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.getAllEngines()
        if (!res.success) {
            set({loading: false , error: res.error  , message: res.message})
        }
        if (res.success) {
            set({  loading: false , message: res.message , error: null })
        }

        return res || [];

        
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },

  startEngineById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const res = await api.startEngineById(id)
        if (!res.success) {
          if (res.status !== "ENGINE_ALREADY_RUNNING") {
            set({ loading: false, error: res.error, message: res.message });
          } else {
            set({ loading: false, error: res.error, message: res.message });
          }
        }

        if (res.success) {
            set({  loading: false , message: res.message , error: null })
        }
        return res || {};
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },

  stopEngineById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const res = await api.stopEngineById(id)

        if (!res.success) {
            set({loading: false , error: res.error  , message: res.message})
        }
        if (res.success) {
            set({ eyeStatus: true, loading: false , message: res.message , error: null })
        }
      set({ loading: false })
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },

  checkEngineStatus: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const res = await api.checkEngineStatus(id)
        if (!res.success) {
          
            set({loading: false , error: res.error  , message: res.message})
        }
        if (res.success) {
            set({ loading: false , message: res.message , error: null })
        }
        return res || {};
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false })
    }
  },
}))
