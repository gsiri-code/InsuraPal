import numpy as np
import matplotlib.pyplot as plt

# user vector represents scaled features: [deductible, premium, vision, dental, hospital, mental health, telehealth]
user_vector = np.array([0.2, 0.8, 1, 1, 0.6, 1, 0.8])

plans = {
    "Plan A": np.array([0.1, 0.9, 1, 1, 0.7, 1, 0.9]),
    "Plan B": np.array([0.5, 0.4, 0, 0, 0.5, 0.2, 0]),
    "Plan C": np.array([0.2, 0.7, 0.8, 1, 0.6, 0.7, 0.5]),
    "Plan D": np.array([0.3, 0.6, 0.9, 0.9, 0.5, 0.6, 0.6])
}

# calculate dot product for scores
scores = {name: np.dot(user_vector, profile) for name, profile in plans.items()}

# visualize scores
names = list(scores.keys())
values = list(scores.values())

plt.figure(figsize=(8, 4))
plt.bar(names, values, color="coral")
plt.title("Insurance Plan Fit Scores")
plt.ylabel("Dot Product Score")
plt.xlabel("Plans")
plt.tight_layout()
plt.show()

# print results
for name, score in scores.items():
    print(f"{name}: {score:.2f}")

# # optionally normalize scores
# max_score = max(values)
# normalized = {k: v/max_score for k, v in scores.items()}
# print("normalized:", normalized)
