from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from keras.models import load_model
from waste_detector import process_frame

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['UPLOAD_FOLDER'] = 'uploads'

# Generate a secure secret key
secret_key = os.urandom(24)
app.secret_key = secret_key

db = SQLAlchemy(app)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def _repr_(self):
        return f"User('{self.username}', '{self.password}')"

class UserImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    image_path = db.Column(db.String(255), nullable=False)
    label = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"UserImage(username={self.username}, image_path={self.image_path}, label={self.label})"
    
@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    new_user = User(username=username, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Sign up successful"}), 200

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route("/image", methods=["POST"])
def handle_image_upload():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        # Default username
        username = "NidhiKadam"

        # Process the image and get recognized labels
        recognized_labels = process_image(file_path)

        # Create a new UserImage object and add it to the session
        new_image = UserImage(username=username, image_path=filename, label=", ".join(recognized_labels))
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "File uploaded successfully", "recognized_labels": recognized_labels}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5001)
