import { Routes, Route, Link } from 'react-router-dom';
import { MessageList } from './components/MessageList';
import { NewMessageForm } from './components/NewMessageForm';
import { OtherPage } from './components/OtherPage';

export default function App() {
  return (
    <div>
      <nav>
        <div style={{display: 'flex', backgroundColor: '#dcccdf', justifyContent: 'space-between', width: '130px', margin: '4px 8px', padding: '4px 8px', borderRadius: '8px'}}>
          <Link to="/">Messages</Link>
          <Link to="/other">Other</Link>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NewMessageForm />
              <MessageList />
            </>
          }
        />
        <Route
          path="/other"
          element={
            <>
              <OtherPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}