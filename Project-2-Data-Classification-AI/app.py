"""
DecodeLabs Internship - Artificial Intelligence Project 2
Project: Data Classification Using AI
Algorithm: K-Nearest Neighbors (KNN)
Dataset: Iris Dataset

This project demonstrates a complete supervised learning workflow:
1. Load dataset
2. Understand features and target classes
3. Split data into training and testing sets
4. Apply feature scaling
5. Train KNN classification model
6. Evaluate using accuracy, confusion matrix, and F1-score
7. Predict new flower samples
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, f1_score


def load_dataset():
    """Load Iris dataset and convert it into a pandas DataFrame."""
    iris = load_iris()

    data = pd.DataFrame(iris.data, columns=iris.feature_names)
    data["target"] = iris.target
    data["species"] = data["target"].map({
        0: "setosa",
        1: "versicolor",
        2: "virginica"
    })

    return data, iris


def train_model(data):
    """Train KNN classifier using train-test split and StandardScaler."""
    X = data.drop(["target", "species"], axis=1)
    y = data["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = KNeighborsClassifier(n_neighbors=5)
    model.fit(X_train_scaled, y_train)

    predictions = model.predict(X_test_scaled)

    return model, scaler, X_test, y_test, predictions


def evaluate_model(y_test, predictions, iris):
    """Print evaluation results and save confusion matrix image."""
    accuracy = accuracy_score(y_test, predictions)
    f1 = f1_score(y_test, predictions, average="weighted")
    cm = confusion_matrix(y_test, predictions)

    print("\n================ MODEL EVALUATION ================")
    print(f"Accuracy Score: {accuracy * 100:.2f}%")
    print(f"F1 Score: {f1 * 100:.2f}%")

    print("\nConfusion Matrix:")
    print(cm)

    print("\nClassification Report:")
    print(classification_report(y_test, predictions, target_names=iris.target_names))

    plt.figure(figsize=(7, 5))
    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        cmap="Blues",
        xticklabels=iris.target_names,
        yticklabels=iris.target_names
    )
    plt.title("DecodeLabs Project 2 - Confusion Matrix")
    plt.xlabel("Predicted Class")
    plt.ylabel("Actual Class")
    plt.tight_layout()
    plt.savefig("screenshots/confusion_matrix.png", dpi=160)
    plt.close()


def predict_new_sample(model, scaler, iris):
    """Predict species for a new Iris flower sample."""
    sample = pd.DataFrame(
        [[5.1, 3.5, 1.4, 0.2]],
        columns=iris.feature_names
    )

    scaled_sample = scaler.transform(sample)
    prediction = model.predict(scaled_sample)[0]
    probability = model.predict_proba(scaled_sample)[0]

    print("\n================ NEW SAMPLE PREDICTION ================")
    print("Sample Data:")
    print(sample)
    print(f"Predicted Species: {iris.target_names[prediction]}")
    print("Prediction Probabilities:")

    for species, prob in zip(iris.target_names, probability):
        print(f"{species}: {prob * 100:.2f}%")


def main():
    print("DecodeLabs Internship - AI Project 2")
    print("Project Title: Data Classification Using AI")
    print("Algorithm: K-Nearest Neighbors")

    data, iris = load_dataset()

    print("\n================ DATASET OVERVIEW ================")
    print("First 5 Rows:")
    print(data.head())

    print("\nDataset Shape:", data.shape)
    print("Classes:", list(iris.target_names))
    print("Features:", list(iris.feature_names))

    model, scaler, X_test, y_test, predictions = train_model(data)
    evaluate_model(y_test, predictions, iris)
    predict_new_sample(model, scaler, iris)

    print("\nProject completed successfully.")
    print("Confusion matrix saved at: screenshots/confusion_matrix.png")


if __name__ == "__main__":
    main()
