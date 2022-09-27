import SupportTicket from './lib/components/SupportTicket';

import './App.css';

function App() {
  return (
    <div style={{ display:'flex', 
              flexDirection:'column', 
              alignItems:'start', 
              justifyContent:'center', 
              gap:'1.5rem', 
              padding: '5rem' }}>
      <SupportTicket></SupportTicket>
    </div>
  );
}

export default App;
