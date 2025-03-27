import pandas as pd
import numpy as np

def generate_fd_dataset(num_rows=10000, output_file="fd_dataset.csv"):
    age_groups = {
        "18-25": {
            "Age Range": (18, 25),
            "Deposit Amount": (10000, 500000),
            "Deposit Tenure": (1, 120),
            "Deposit Type": ["Regular FD"],
            "Payout Frequency": ["Quarterly", "Annually", "Maturity"],
            "Premature Withdrawal Option": "Allowed with penalty",
            "Repo Rate Impact": "High impact",
            "Inflation Rate Impact": "High impact",
            "Competitor Bank Rates": (6.0, 7.0),
            "Interest Rate Options": [
                3.50, 5.50, 6.25, 6.50, 6.80, 7.10, 7.25, 7.00, 6.75, 6.50
            ],
        },
        "26-60": {
            "Age Range": (26, 60),
            "Deposit Amount": (50000, 20000000),
            "Deposit Tenure": (1, 120),
            "Deposit Type": ["Regular FD", "Tax-Saving FD", "Special FD"],
            "Payout Frequency": ["Monthly", "Quarterly", "Annually", "Maturity"],
            "Premature Withdrawal Option": "Allowed with penalty",
            "Repo Rate Impact": "Medium impact",
            "Inflation Rate Impact": "Medium impact",
            "Competitor Bank Rates": (6.5, 7.5),
            "Interest Rate Options": [
                3.50, 5.50, 6.25, 6.50, 6.80, 7.10, 7.25, 7.00, 6.75, 6.50
            ],
        },
        "60+": {
            "Age Range": (60, 80),
            "Deposit Amount": (50000, 10000000),
            "Deposit Tenure": (1, 120),
            "Deposit Type": ["Senior Citizen FD"],
            "Payout Frequency": ["Monthly", "Quarterly", "Annually", "Maturity"],
            "Premature Withdrawal Option": "Allowed with reduced penalty",
            "Repo Rate Impact": "Low impact",
            "Inflation Rate Impact": "Low impact",
            "Competitor Bank Rates": (7.0, 8.5),
            "Interest Rate Options": [
                7.50, 7.75, 8.00, 8.25
            ],
        },
    }

    data = []
    for _ in range(num_rows):
        age_group = np.random.choice(list(age_groups.keys()), p=[0.2, 0.6, 0.2])
        features = age_groups[age_group]
        random_age = np.random.randint(*features["Age Range"])

        row = {
            "Age": random_age,
            "Deposit Amount (₹)": np.random.randint(*features["Deposit Amount"]),
            "Deposit Tenure (Months)": np.random.randint(*features["Deposit Tenure"]),
            "Deposit Type": np.random.choice(features["Deposit Type"]),
            "Payout Frequency": np.random.choice(features["Payout Frequency"]),
            "Premature Withdrawal Option": features["Premature Withdrawal Option"],
            "Repo Rate Impact": features["Repo Rate Impact"],
            "Inflation Rate Impact": features["Inflation Rate Impact"],
            "Competitor Bank Rates (%)": round(np.random.uniform(*features["Competitor Bank Rates"]), 1),
            "Interest Rate (%)": np.random.choice(features["Interest Rate Options"]),
        }
        data.append(row)

    df = pd.DataFrame(data)
    df.to_csv(output_file, index=False)
    print(f"Dataset saved to {output_file}")

generate_fd_dataset()