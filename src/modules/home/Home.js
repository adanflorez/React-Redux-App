import React from "react";
import { Divider } from "semantic-ui-react";

const Home = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <h1>StoreApp</h1>
      <Divider />
      <p>Basic App in charge of the CRUD of two entities.</p>
      <ul>
        <li>Store</li>
        <li>Items</li>
      </ul>
      <h3>Tecnologies</h3>
      <Divider />
      <p>This app is served with Nginx in a ubuntu machine.</p>

      <p>
        <b>Fontend:</b>
      </p>
      <ul>
        <li>
          ReactJs
          <ul>
            <li>React redux </li>
            <li>React-router-dom</li>
            <li>Redux-saga</li>
            <li>Axios</li>
            <li>React-image-crop</li>
            <li>Redux</li>
          </ul>
        </li>
        <li>Semantic UI</li>
        <li>Semantic UI React</li>
      </ul>
      <p>
        <b>BackEnd:</b>
      </p>
      <ul>
        <li>
          Flask Python
          <ul>
            <li>SqlAlchemy</li>
            <li>Marshmallow</li>
            <li>cloudinary</li>
            <li>Flask-Cors</li>
            <li>Flask-JWT-Extended</li>
            <li>Flask-RESTful</li>
            <li>Flask-Migrate</li>
          </ul>
        </li>
      </ul>
      <p>
        <b>Database:</b>
      </p>
      <ul>
        <li>Postgresql</li>
      </ul>
      <p>
        <b>Cloud:</b>
      </p>
      <ul>
        <li>Cloudinary (Images)</li>
      </ul>

      <p>
        <b>Cloud:</b>
      </p>
      <ul>
        <li>Errors login form</li>
        <li>Password enc</li>
        <li>Define jwt enpoints</li>
      </ul>
    </div>
  );
};

export default Home;
