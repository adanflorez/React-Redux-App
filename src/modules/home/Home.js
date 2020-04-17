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
            <li>axios</li>
            <li>react-hook-form</li>
            <li>react-image-crop</li>
            <li>react-router-dom</li>
            <li>sweetalert2</li>
            <li>React redux </li>
            <li>redux-saga</li>
            <li>react-dropzone</li>
            <li>moment</li>
            <li>i18next</li>
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
            <li>requests</li>
            <li>Flask-Babel</li>
            <li>Flask-marshmallow</li>
            <li>Flask-Script</li>
            <li>Flask-SQLAlchemy</li>
            <li>Jinja2</li>
            <li>passlib</li>
            <li>python-dotenv</li>
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
        <li>Mailgun (Email)</li>
      </ul>
    </div>
  );
};

export default Home;
