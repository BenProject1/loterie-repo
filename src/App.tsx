import React from 'react';
import { RewardsGame } from './features/rewards/components/RewardsGame';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto shadow-xl">
        <RewardsGame />
      </div>
    </div>
  );
}

export default App;