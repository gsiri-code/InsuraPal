import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import seaborn as sns

# pretend we scraped these insurance plan summaries from websites
documents = [
    "our gold plan offers low deductible options, includes dental and vision, ideal for families",
    "basic emergency-only coverage with low monthly premium, no routine care included",
    "silver tier coverage includes preventive services, specialist copays, and some mental health",
    "high deductible health plan with health savings account (hsa) compatibility, low premiums",
    "premium dental and vision benefits, includes telehealth and mental wellness support"
]

# pretend this is a parsed user profile string
user_query = "i am looking for a plan that gives me good dental and vision, also i want therapy and not too high premiums"

# vectorizing using tf-idf
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(documents + [user_query])

# cosine similarity between user profile and each plan
scores = cosine_similarity(X[-1], X[:-1])
print("similarity scores:", scores.flatten())

# visualize scores
plt.figure(figsize=(10, 4))
sns.barplot(x=[f"Plan {i+1}" for i in range(len(scores.flatten()))], y=scores.flatten())
plt.title("Similarity of Insurance Plans to User Preferences")
plt.ylabel("Cosine Similarity")
plt.show()

print("best match:", documents[np.argmax(scores)])

# # example: exporting vectors for inspection
# feature_names = vectorizer.get_feature_names_out()
# dense_vec = X.toarray()
# for i, vec in enumerate(dense_vec):
#     print(f"Doc {i} vector:")
#     print(dict(zip(feature_names, vec)))
