

import { useParams } from 'react-router-dom';
import { IonPage, IonContent, IonButton, IonBadge, IonSpinner } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { useControl } from '../../../../contexts/useControlContext';
import { useEffect, useState } from 'react';
import CustomHeader from '../../../../components/header/header';

const EngineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();
  const { engine, getEngineById, startEngineById, stopEngineById , loading } = useControl();
  const [actionState, setActionState] = useState<"idle" | "starting" | "stopping">("idle");

  useEffect(() => {
    if (id) {
      getEngineById(id);
    }
  }, [id]);

  const [activeTab, setActiveTab] = useState("metrics");

  const handleStart = async () => {
    if (!id) return;
    setActionState("starting");
    try {
      await startEngineById(id);
    } catch (error) {
      console.error("Failed to start engine:", error);
    } finally {
      setActionState("idle");
    }
  };

  const handleStop = async () => {
    if (!id) return;
    setActionState("stopping");
    try {
      await stopEngineById(id);
    } catch (error) {
      console.error("Failed to stop engine:", error);
    } finally {
      setActionState("idle");
    }
  };

  const tabList = [
    { id: "metrics", label: "Metrics" },
    { id: "bots", label: " Bots Performance" },
    { id: "activity", label: "Activity" },
  ];

  const engineStats = {
    totalBots: engine?.totalBots || 7,
    activeBots: engine?.activeBots || 5,
    winRate: engine?.winRate || 75,
    profit: engine?.profit || 24.5,
    roi: engine?.roi || 17,
    uptime: engine?.uptime || "4h 22m",
    status: engine?.status || "running"
  };

  const performanceData = [
    { id: 1, bot: "Bot A", winRate: 78, profit: 12.4 },
    { id: 2, bot: "Bot B", winRate: 66, profit: 8.2 },
    { id: 3, bot: "Bot C", winRate: 59, profit: 3.9 }
  ];

  const activityData = [
    { id: 1, time: "2 min ago", event: "Bet placed on Match X", odds: 3.5, status: "pending" },
    { id: 2, time: "15 min ago", event: "Bot D started", odds: null, status: "success" },
    { id: 3, time: "32 min ago", event: "Bet won on Match Y", odds: 2.8, status: "win" }
  ];
  
  console.log(engine)

  return (
    <IonPage>
      <IonContent className="w-full h-full text-green-400 bg-black font-mono">
        <CustomHeader />
        <div className="flex flex-col p-4 max-w-2xl mx-auto">
          
          <div className="flex items-center justify-between mb-6 p-3 bg-gray-900 border border-green-600 rounded-lg">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                engine.status ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`} />
              <h1 className="text-xl font-bold">
                {engine?.name || `Engine #${id}`}
              </h1>
            </div>
            
            
            <div className="flex ">
              <button
                onClick={engine.status ? handleStop : handleStart}
                disabled={loading}
                className={`px-4 py-2 border rounded-lg text-sm font-bold ${
                  !engine.status
                    ? "border-gray-700 text-gray-500 cursor-not-allowed"
                    : "border-red-500 text-red-400 hover:bg-red-900 hover:border-red-300"
                }`}
              >
                {engine.status ? (
                  actionState === "stopping" ? (
                    <span className="flex items-center">
                      <IonSpinner name="crescent" className="w-4 h-4 mr-2" />
                      TERMINATING
                    </span>
                  ) : (
                    "STOP ENGINE"
                  )
                ) : (
                  
                  actionState === "starting" ? (
                    <span className="flex items-center">
                      <IonSpinner name="crescent" className="w-4 h-4 mr-2" />
                      STARTING
                    </span>
                  ) : (
                    "START ENGINE"
                  )
                )}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 p-4 border border-green-600 rounded-lg">
              <p className="text-sm text-gray-300">Total Bots</p>
              <h2 className="text-xl font-bold">{engineStats.totalBots}</h2>
            </div>
            <div className="bg-gray-900 p-4 border border-green-600 rounded-lg">
              <p className="text-sm text-gray-300">Active Bots</p>
              <h2 className="text-xl font-bold">{engineStats.activeBots}</h2>
            </div>
            <div className="bg-gray-900 p-4 border border-green-600 rounded-lg">
              <p className="text-sm text-gray-300">Win Rate</p>
              <h2 className="text-xl font-bold">{engineStats.winRate}%</h2>
            </div>
            <div className="bg-gray-900 p-4 border border-green-600 rounded-lg">
              <p className="text-sm text-gray-300">Uptime</p>
              <h2 className="text-xl font-bold">{engineStats.uptime}</h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-green-600 mb-4 flex space-x-4">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                className={`pb-2 px-1 font-semibold text-sm md:text-base ${
                  activeTab === tab.id
                    ? "text-green-400 border-b-2 border-green-400"
                    : "text-gray-400 hover:text-green-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-900 p-4 border border-green-600 rounded-lg">
            {/* Metrics Tab */}
            {activeTab === "metrics" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Bot Performance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                      <span>Average Win Rate</span>
                      <span className="font-bold">72%</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                      <span>Best Strategy</span>
                      <span className="font-bold">3 shots in 20 mins</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Most Profitable Bot</span>
                      <span className="font-bold text-green-300">Bot A (+12.4u)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">System Metrics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">CPU Usage</p>
                      <p className="font-mono">32%</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">Memory</p>
                      <p className="font-mono">1.2/4GB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === "bots" && (
              <div className="space-y-4">
                <h3 className="font-semibold">Bots Details</h3>
                <ul className="space-y-3">
                  {performanceData.map((bot) => (
                    <li key={bot.id} className="border-b border-gray-700 pb-3 last:border-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{bot.bot}</span>
                        <IonBadge color={bot.winRate > 70 ? "success" : bot.winRate > 60 ? "warning" : "danger"}>
                          *
                        </IonBadge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mt-1">
                        <span>current activity : </span>
                      
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="space-y-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <ul className="space-y-3">
                  {activityData.map((activity) => (
                    <li key={activity.id} className="border-b border-gray-700 pb-3 last:border-0">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">{activity.time}</span>
                        {activity.odds && (
                          <span className="text-xs bg-gray-800 px-2 py-1 rounded">
                            {activity.odds} odds
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className={`mr-2 ${
                          activity.status === "win" ? "text-green-400" : 
                          activity.status === "pending" ? "text-yellow-400" : "text-gray-400"
                        }`}>
                          {activity.status === "win" ? "✔" : activity.status === "pending" ? "⏳" : "⚡"}
                        </span>
                        <span>{activity.event}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default EngineDetail;