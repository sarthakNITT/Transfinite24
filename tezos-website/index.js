import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css'; // Add your styles here
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'; // Your main landing page
import Payment from './components/Payment'; // Payment page component
import Lending from './components/Lending'; // Lending page component
import NFT from './components/NFT'; // NFT marketplace component

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header with background */}
        <Header />

        {/* Main Content */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/payment" component={Payment} />
          <Route path="/lending" component={Lending} />
          <Route path="/nft" component={NFT} />
        </Switch>

        {/* Footer with background */}
        <Footer />
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
