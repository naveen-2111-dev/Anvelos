import { Authenticator } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="dashboard-container">
          <nav className="glass-nav">
            <div className="nav-brand">
              <div className="logo-orb"></div>
              <h1>Anvelos Drive</h1>
            </div>
            <div className="nav-actions">
              <span className="user-email">{user?.signInDetails?.loginId || user?.username}</span>
              <button className="sign-out-btn" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </nav>
          
          <main className="dashboard-main">
            <div className="hero-section">
              <h2 className="gradient-text">Secure Cloud Storage</h2>
              <p className="subtitle">Upload, manage, and share your files effortlessly with AWS Amplify & Amazon S3.</p>
            </div>

            <div className="upload-card glass-card fade-in-up">
              <div className="card-header">
                <h3>Upload Files</h3>
                <p>Drag and drop your files here, or click to browse.</p>
              </div>
              
              <div className="storage-manager-wrapper">
                <StorageManager
                  acceptedFileTypes={['image/*', 'application/pdf', 'application/zip', 'text/plain']}
                  path="public/"
                  maxFileCount={10}
                  isResumable
                  components={{
                    Container({ children }) {
                      return <div className="custom-storage-container">{children}</div>;
                    }
                  }}
                />
              </div>
            </div>
          </main>
          
          <div className="background-elements">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
