import React from "react";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";
import Spin from "antd/lib/spin";
import "antd/lib/spin/style/css";
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

const topFive = ["GrahamCampbell", "fabpot", "weierophinney", "rkh", "josh"];

function App() {
  const [selectedUsername, setSelectedUsername] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [fetchingUser, setFetchingUser] = React.useState(false);

  React.useEffect(() => {
    if (!selectedUsername) {
      return;
    }
    setFetchingUser(true);
    fetch(`https://api.github.com/users/${selectedUsername}`)
      .then(r => r.json())
      .then(res => {
        setSelectedUser(res);
        setFetchingUser(false);
      });
  }, [selectedUsername]);

  return (
    <div className="App">
      <TransitionGroup component={null}>
        <CSSTransition timeout={300} classNames="page" key={selectedUsername}>
          {selectedUsername ? (
            <div className="detail-page">
              <div className="back-button-wrapper">
                <span
                  className="back-button"
                  onClick={() => setSelectedUsername(null)}
                >
                  <LeftOutlined /> Back
                </span>
              </div>
              {!fetchingUser && selectedUser ? (
                <div className="detail-wrapper">
                  <div className="avatar">
                    <img
                      alt="avatar"
                      width="100%"
                      src={selectedUser.avatar_url}
                    />
                  </div>
                  <div className="desc">
                    <div className="name">{selectedUser.name}</div>
                    <div className="location">{selectedUser.location}</div>
                  </div>
                </div>
              ) : (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )}
            </div>
          ) : (
            <div className="home-page">
              <h2>Top 5 GitHub Users</h2>
              <h4>Tap the username to see more information</h4>
              {topFive.map((username, i) => (
                <Button
                  type="primary"
                  style={{ marginLeft: i === 0 ? 0 : 5, marginTop: 5 }}
                  onClick={() => setSelectedUsername(username)}
                >
                  {username}
                </Button>
              ))}
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
