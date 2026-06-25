# Project 2 - Data Classification Using AI

This project is part of the **DecodeLabs Artificial Intelligence Internship**.

## 📌 Project Goal

Build a basic classification model using a small dataset.

## ✅ Key Requirements

- Load and understand a dataset
- Split data into training and testing sets
- Apply a simple classification algorithm
- Train and test the model
- Validate output using accuracy, F1-score, and confusion matrix

## 🧠 Key Skills

- Data handling
- Supervised learning basics
- Model training
- Feature scaling
- K-Nearest Neighbors classification
- Model evaluation

## 📊 Dataset

The project uses the famous **Iris Dataset**, which contains:

- 150 samples
- 3 classes: Setosa, Versicolor, Virginica
- 4 dimensions/features:
  - Sepal length
  - Sepal width
  - Petal length
  - Petal width

## 🤖 Algorithm Used

**K-Nearest Neighbors (KNN)**

KNN classifies a new data point by checking the majority class among its nearest neighbors.

## 🛠 Technologies Used

- Python
- Pandas
- Scikit-learn
- Matplotlib
- Seaborn

## ▶️ How to Run in VS Code

### 1. Open the folder in VS Code

```bash
Project-2-Data-Classification-AI
```

### 2. Create virtual environment

```bash
python -m venv venv
```

### 3. Activate virtual environment

For Windows PowerShell:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the project

```bash
python app.py
```

## 📈 Output

The program will display:

- Dataset overview
- Accuracy score
- F1 score
- Confusion matrix
- Classification report
- Prediction for a new Iris flower sample

A confusion matrix image will also be saved inside:

```bash
screenshots/confusion_matrix.png
```

## 📁 Folder Structure

```text
Project-2-Data-Classification-AI/
│
├── app.py
├── requirements.txt
├── README.md
└── screenshots/
    └── confusion_matrix.png
```

## 🎯 Conclusion

This project demonstrates the complete supervised learning workflow from raw data to intelligent decision-making using the KNN classification algorithm.
