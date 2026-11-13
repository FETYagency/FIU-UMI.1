# DETACTOR — AI Content Authenticity Detector

DECTATOR is a full-stack AI-powered platform designed to detect misleading digital content using machine learning.

The application combines a **React frontend**, **FastAPI backend**, and multiple AI models to analyze different types of media:

- 📰 Fake News Detection
- 🎭 Deepfake Image Detection

The goal of DECTATOR is to help users evaluate the authenticity of online information and AI-generated content.

---

# Features

## 📰 Fake News Detection

- Analyzes text-based news articles.
- Uses Natural Language Processing (NLP).
- Converts text into numerical features using TF-IDF.
- Classifies articles using a Logistic Regression machine learning model.

## 🎭 Deepfake Detection

- Analyzes uploaded images.
- Uses a deep learning model based on the Xception architecture.
- Detects whether an image is likely real or AI-generated/fake.

## 💻 Full-Stack Application

- Modern React user interface.
- FastAPI REST API backend.
- Real-time communication between frontend and AI models.
- Prediction history and response-time tracking.

---

# 🎓Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Query
- Zustand

## Backend

- Python
- FastAPI
- Uvicorn

## Machine Learning

### Fake News Model

- TF-IDF Vectorization
- Logistic Regression
- Scikit-learn

### Deepfake Model

- TensorFlow / Keras
- Xception Architecture
- Image Classification

---

# 🛖Project Structure

```
FU-UMI.1/

├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...

├── backend/
│   ├── main.py
│   ├── model/
|   |   ├── deepfake
|   |   |   └── deepfake_xception.h5
│   │   ├── lr_model.jb
|   |   └── vectorizer.jb
│   ├── requirements.txt
|   ├── detector.py
│   └── ...

└── README.md
```

---

# 📲Installation

## 🧧Requirements

Make sure you have:

- Python 3.10+
- Node.js 18+
- npm

---

# 🧧🧧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the environment:

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🧧🧧NOTE: TRAINING MODELS🧧🧧
If you are planning to run the training files and train your own model, make sure to include the dataset folder provided in the link below:
```
【Deepfake】 training data : https://drive.google.com/drive/folders/149j40V7LJ0rkXlREcdrpUp3MUz0Y1CkV

【Deepfake】 validation data : https://drive.google.com/drive/folders/1Lxm2BbmTHXOGz0YblW5qVOgcq6h6axIO?usp=drive_link

---0---

【FAKE NEWS】 training data : https://drive.google.com/drive/folders/17MnJoJ_4Z3m9TkhpeGWiMvkGMBQukNf1?usp=drive_link
```
file structure:

```
FU-UMI.1/

├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── main.py
│   ├── model/
│   ├── requirements.txt
│   └── ...
├──DATASETS <-- CREATE NEW
|    ├──DATA-* <- CREATE & INCLUDE THE FOLDERS YOU FIND IN THE DRIVE
└── README.md
```
training path setup in `./training/train.py` for the deepfake model
```python
  TRAIN_DIR = "../DATASETS/DATA-DEEPFAKE_TRAINING" # Directory containing training images ("CHANGE THEM BASED ON YOUR DATASET")
  VAL_DIR = "../DATASETS/DATA-DEEPFAKE" # Directory containing validation images
  MODEL_SAVE_PATH = "../backend/model/deepfake/deepfake_xception.h5"
```
training path setup in `./training/app.ipynb` for the deepfake model
```python
  fake = pd.read_csv("../DATASETS/DATA-FAKE_NEWS/Fake.csv")
  true = pd.read_csv("../DATASETS/DATA-FAKE_NEWS/True.csv")
```


# 🧧🧧Deep fake Model Setup🧧🧧

The deepfake model file is not included in this repository because GitHub has a 100MB file size limit.

Download the model:

```
"deepfake_xception.h5" DOWNLOAD HERE ==> https://drive.google.com/file/d/16_vVNpzqr-qcf1vWzgakyN8AZeRKd-b-/view?usp=drive_link
```

Place it inside:

```
backend/model/deepfake
```

The backend will automatically load the model when starting the API.

---

# 🧧🧧Running the Backend🧧🧧

From the backend directory:

```bash
uvicorn main:app --reload
```

The API will start at:

```
http://127.0.0.1:8000
```

---

# 🧧🧧Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

 
## FAKE NEWS PREDICTIONS

🌟PASTE ARITICLES!

INTO THE ARTICLE FORM INPUT YOU CAN PASTE AN ARTICLE YOU SUSPECT OR WHAT IS PROVIDED IN THE EXAMPLE BELLOW AND LET THE MODEL DO ITS WORK

```
also TEST it using our testing data also🤩⚡ ==> https://drive.google.com/file/d/1ZtvFFqXPrRdN942wA7mLP01QNRKancMU/view?usp=drive_link
```

EXAMPLE

```
Electric Vehicle Manufacturers Face Growing Competition in International Markets

Competition in the electric vehicle industry has increased as manufacturers introduce new models and expand production capacity.

Companies are investing in battery technology, manufacturing efficiency, and charging infrastructure to attract customers. At the same time, differences in government incentives, import regulations, and consumer demand are influencing how manufacturers approach international markets.

Industry analysts expect competition to remain strong as established automotive companies and newer manufacturers attempt to reduce production costs and improve vehicle performance.
```

---

## DEEPFAKE PREDICTION
🌟UPLOAD IMAGES!

```
also TEST it using our testing data also 🤩⚡ ==> https://drive.google.com/drive/folders/1Lxm2BbmTHXOGz0YblW5qVOgcq6h6axIO?usp=drive_link
```

Input:

```
Image file
```

Returns:

```json
{
  "prediction": "FAKE",
  "confidence": 0.91
}
```

---

# Author

**巴德 1820252112&#x20;**

Computer Science Student | AI & Full-Stack Development

---

# License

This project is for educational and portfolio purposes.
