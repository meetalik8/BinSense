import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { Link } from "react-router-dom"; 
import { HTML5Backend } from "react-dnd-html5-backend";
import BinContainer from "./BinContainer";
import DraggableItem from "./DraggableItem";
import ItemTypes from "./ItemTypes";
import Wet from "./wet.png";
import Dry from "./dry.png";
import Logo from "./logo.png";
import Plastic from "./plastic.png";
import Bottle from "./plastic_bottle.png";
import "../components/style.css";
import Newspaper from "./newspaper.png";
import Box from "./cardboardbox.png";
import Wetwaste from "./wetwaste.png";
import Apple from "./apple.png"
import Sandwich from './sandwich.png';


const Game = () => {
  const [score, setScore] = useState(0);
  const [lastDroppedItemId, setLastDroppedItemId] = useState(null);

  const handleDrop = (itemId, binType) => {
    const itemType = itemId.split("-")[0];
    if (itemType === binType) {
      setScore(score + 1);
    }
    setLastDroppedItemId(itemId);
  };

  return (
    <div className="page">
      <nav>
        <div className="flex main-nav">
          <div className="logo-class flex">
            <Link to="/" className="company-logo img">
              <img src={Logo} alt="company-logo" />
            </Link>
            <h2 className="logo-name2">BinSense</h2>
          </div>
          <div className="nav-links">
            <ul className="flex">
              <li>
                <Link to="/" className="hover-link2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover-link secondary-button2">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover-link primary-button2">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <DndProvider backend={HTML5Backend}>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="game-cont"
        >
          <BinContainer
            accepts={[ItemTypes.DRAGGABLE_ITEM]}
            lastDroppedItemId={lastDroppedItemId}
            onDrop={(itemId) => handleDrop(itemId, "dry")}
          >
            <img src={Dry} alt="Dry Bin" />
          </BinContainer>
          <div>
            <p className="score">Score: {score}</p>
            <DraggableItem id="dry-item1" type="dry">
              <img src={Plastic} alt="Plastic Item" className="drag-items" />
            </DraggableItem>
            <DraggableItem id="wet-item1" type="wet">
              <img src={Apple} alt="Paper Item" className="drag-items" />
            </DraggableItem>
            <DraggableItem id="dry-item2" type="dry">
              <img src={Bottle} alt="Plastic Item" className="drag-items" />
            </DraggableItem>
            <DraggableItem id="wet-item1" type="wet">
              <img src={Wetwaste} alt="Vegetables" className="drag-items" />
            </DraggableItem>
            <DraggableItem id="dry-item2" type="dry">
              <img src={Box} alt="Plastic Item" className="drag-items" />
            </DraggableItem>
            <DraggableItem id="wet-item1" type="wet">
              <img src={Sandwich} alt="Vegetables" className="drag-items" />
            </DraggableItem>
            <DraggableItem id="dry-item2" type="dry">
              <img src={Newspaper} alt="Plastic Item" className="drag-items" />
            </DraggableItem>
          </div>
          <BinContainer
            accepts={[ItemTypes.DRAGGABLE_ITEM]}
            lastDroppedItemId={lastDroppedItemId}
            onDrop={(itemId) => handleDrop(itemId, "wet")}
          >
            <img src={Wet} alt="Wet Waste Bin" />
          </BinContainer>
        </div>
      </DndProvider>
    </div>
  );
};

export default Game;
