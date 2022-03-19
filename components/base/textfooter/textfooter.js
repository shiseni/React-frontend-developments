import React from "react";

export const TextFooter = () => {
  let text;
  return (
    <div className="bw-doc" id="text-footer">
      <div className="text-footer">
        {text_footer.map((element) => {
          element.link !== undefined
            ? (text = (
                <a href={element.link} target="blank">
                  {element.name}
                </a>
              ))
            : (text = <span>{element.name}</span>);
          return (
            <p key={element.id} className="text-contacts">
              {text}
            </p>
          );
        })}
      </div>
    </div>
  );
};
