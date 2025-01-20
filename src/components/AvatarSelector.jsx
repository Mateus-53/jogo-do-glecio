import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

const AvatarSelector = ({ avatarsList, onSelected }) => {

   const onWheel = (apiObj, ev) => {
      const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    
      if (isThouchpad) {
        ev.stopPropagation();
        return;
      }
    
      if (ev.deltaY < 0) {
        apiObj.scrollNext();
      } else if (ev.deltaY > 0) {
        apiObj.scrollPrev();
      }
    }
    
  return (
    <div>
      <span className="text-darkGray text-sm">Escolha um avatar</span>
      <ScrollMenu onWheel={onWheel}>
        {avatarsList.map((avatar) => (
          <div key={avatar.id} itemID={avatar.id} title={avatar.id} className="w-16 mr-2">
            <button onClick={() => onSelected(avatar.id)}>
              <img
                className="w-full"
                src={avatar.path_256px}
                alt={`Avatar ${avatar.id}`}
              />
            </button>
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default AvatarSelector;