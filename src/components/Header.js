import React from "react";

export default function Header(props) {
  return (
    <header className="header">
      <div className="header-text">
        <h1 className="h1">{props.title}</h1>
        <h6 className="subhead">React with Tone.js</h6>
        <p>
          Try using the keyboard! Play white keys with <i>a</i>, <i>s</i>,
          <i>d</i>, <i>f</i>... and black keys with <i>w</i>, <i>e</i>,<i>t</i>,
          <i>y</i>, and <i>u</i>.
        </p>
      </div>
    </header>
  );
}
