import React from 'react';
import './App.css';
//history路由
// import { BrowserRouter as Router, Route, NavLink as Link, Switch } from 'react-router-dom'
//hash路由
import { HashRouter  as Router, Route, NavLink as Link, Switch } from 'react-router-dom'
import Home from './pages/home/home'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';


function App() {
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <nav className="tabs">
            <Link className="tab" to="/home">列表页面</Link>
          </nav>
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </ConfigProvider>
    </Router>
  );
}

export default App;
