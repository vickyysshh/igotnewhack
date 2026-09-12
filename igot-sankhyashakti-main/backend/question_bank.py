"""Curated demo questions, not LLM-generated. Answers stay server-side until submission."""
SQL = [
 ("Which SQL clause groups survey records by state?", ["ORDER BY", "GROUP BY", "WHERE", "DISTINCT"], 1, "GROUP BY aggregates records sharing the same state."),
 ("Which JOIN retains every record from the left survey table?", ["INNER JOIN", "CROSS JOIN", "LEFT JOIN", "RIGHT JOIN"], 2, "LEFT JOIN keeps all left-table records, including unmatched ones."),
 ("How do you count all rows in a labour survey table?", ["COUNT(*)", "SUM(*)", "TOTAL(rows)", "COUNT(NULL)"], 0, "COUNT(*) counts every row, including rows containing NULL fields."),
 ("Which clause filters grouped aggregate results?", ["WHERE", "ORDER BY", "SELECT", "HAVING"], 3, "HAVING filters after grouping; WHERE filters individual rows."),
 ("What does a primary key enforce?", ["Alphabetical sorting", "Unique, non-null row identity", "Automatic totals", "Data encryption"], 1, "A primary key uniquely identifies each row and cannot be NULL."),
 ("Which expression calculates average reported earnings?", ["SUM(earnings)", "COUNT(earnings)", "AVG(earnings)", "MEDIAN(*)"], 2, "AVG computes the arithmetic mean of non-null earnings."),
 ("How should missing earnings values be tested in SQL?", ["earnings IS NULL", "earnings = NULL", "earnings == empty", "earnings < 0"], 0, "NULL represents an unknown value and is tested with IS NULL."),
 ("Which keyword removes duplicate values from query output?", ["UNIQUE ROW", "GROUP", "ONLY", "DISTINCT"], 3, "SELECT DISTINCT returns unique result combinations."),
 ("What is the safest way to pass user input into a SQL query?", ["String concatenation", "Parameterized queries", "Removing spaces", "Uppercase conversion"], 1, "Bound parameters separate user data from executable SQL."),
 ("Which query ranks districts by unemployment rate?", ["WHERE rate DESC", "GROUP BY rate", "ORDER BY rate DESC", "HAVING rate"], 2, "ORDER BY rate DESC sorts the highest unemployment rates first."),
 ("Which operator selects records matching both conditions?", ["AND", "OR", "NOT", "UNION"], 0, "AND requires both conditions to evaluate as true."),
 ("Which SQL statement changes existing records?", ["INSERT", "CREATE", "DROP", "UPDATE"], 3, "UPDATE modifies existing rows, normally constrained with WHERE."),
 ("What is a foreign key used for?", ["Encrypting records", "Linking related tables", "Sorting strings", "Summing columns"], 1, "A foreign key references a key in another table."),
 ("Which function substitutes a value for NULL?", ["COUNT", "ROUND", "COALESCE", "SUBSTRING"], 2, "COALESCE returns the first non-null argument."),
 ("What does UNION ALL do?", ["Combines rows including duplicates", "Deletes duplicates", "Joins on primary keys", "Updates both tables"], 0, "UNION ALL stacks compatible query results without deduplication."),
 ("Which operation should surround a multi-table data update?", ["A chart", "A comment", "A view", "A transaction"], 3, "Transactions keep related changes atomic and consistent."),
 ("Which construct calculates within-group rankings without collapsing rows?", ["GROUP BY", "Window function", "DISTINCT", "LIMIT"], 1, "Window functions preserve individual rows while calculating over a partition."),
 ("Which data type is suitable for exact monetary values?", ["TEXT", "BOOLEAN", "DECIMAL", "FLOAT"], 2, "DECIMAL provides exact fixed-precision numeric representation."),
 ("Why add an index to a frequently searched district ID?", ["Improve lookup performance", "Make all data public", "Remove validation", "Increase duplicate records"], 0, "Indexes can improve selective lookup performance, with storage and write costs."),
 ("Which aggregate ignores NULL values in its argument?", ["COUNT(*) only", "Every WHERE clause", "ORDER BY", "AVG(column)"], 3, "AVG ignores NULL values rather than treating them as zero.")]

GENERAL = [
 ("Why split data into training and test sets?", ["Reduce sample size", "Measure generalization", "Remove all outliers", "Guarantee perfect accuracy"], 1, "A held-out test set evaluates performance on unseen observations."),
 ("What is a stratified sample?", ["The first available records", "Only urban households", "Samples drawn within defined subgroups", "A census of all records"], 2, "Stratification ensures representation across meaningful population subgroups."),
 ("Which practice protects respondents in published microdata?", ["Anonymization and disclosure control", "Publishing names", "Sharing exact addresses", "Removing survey weights"], 0, "Disclosure control reduces the risk of identifying respondents."),
 ("What does overfitting mean?", ["Too little training data storage", "Perfect real-world performance", "No model parameters", "Learning noise rather than generalizable patterns"], 3, "Overfit models perform well on training data but poorly on unseen data."),
 ("Which metric is useful for an imbalanced classification problem?", ["Training time alone", "Precision and recall", "File size", "Column count"], 1, "Precision and recall reveal performance when class frequencies differ."),
 ("Why are survey weights applied?", ["To hide missing data", "To make files larger", "To account for unequal selection probabilities", "To sort responses"], 2, "Weights help population estimates reflect the sampling design."),
 ("Which action helps prevent data leakage?", ["Fit preprocessing only on training data", "Train on test labels", "Mix all datasets", "Remove the test set"], 0, "Preprocessing must not learn from held-out test observations."),
 ("What is a confidence interval?", ["A guaranteed range for every record", "A model score", "A data identifier", "An interval from a procedure with stated long-run coverage"], 3, "Confidence describes the long-run coverage of the estimation procedure."),
 ("What should happen before deploying an AI model for official statistics?", ["Skip documentation", "Validate accuracy, fairness and governance", "Publish all private data", "Remove human oversight"], 1, "Public-sector models require validation, governance and appropriate oversight."),
 ("What is metadata?", ["Only missing values", "Encrypted passwords", "Information describing a dataset and its methods", "A prediction model"], 2, "Metadata describes definitions, collection methods, quality and structure."),
 ("What is the purpose of cross-validation?", ["Estimate performance across multiple splits", "Publish sensitive records", "Delete observations", "Guarantee causality"], 0, "Cross-validation evaluates robustness across different held-out subsets."),
 ("Which problem can non-response introduce?", ["Automatic accuracy", "A larger population", "Perfect coverage", "Bias when respondents differ from non-respondents"], 3, "Systematic differences in response can bias population estimates."),
 ("What does a confusion matrix compare?", ["File formats", "Predicted and actual classes", "Database sizes", "Dates and times"], 1, "A confusion matrix summarizes true and false predictions by class."),
 ("Which sampling method gives each unit equal selection probability?", ["Convenience sampling", "Quota sampling", "Simple random sampling", "Purposive sampling"], 2, "Simple random sampling selects units with equal probability."),
 ("Why document model limitations?", ["Support responsible interpretation", "Increase prediction certainty", "Hide bias", "Replace all assessment"], 0, "Limitations clarify appropriate uses, uncertainty and risks."),
 ("What is supervised learning?", ["Training without any data", "Manual sorting only", "Database backups", "Learning from labelled examples"], 3, "Supervised learning uses input-output examples to learn a mapping."),
 ("Which indicator describes data completeness?", ["Chart colour", "Proportion of required values present", "Model name", "Number of users"], 1, "Completeness measures the presence of expected records or values."),
 ("Why should estimates include uncertainty?", ["To avoid transparency", "To replace methodology", "To support sound interpretation", "To imply absolute precision"], 2, "Uncertainty helps users understand the precision and limitations of estimates."),
 ("Which practice improves reproducibility?", ["Versioned code and documented methods", "Undocumented edits", "Deleting source definitions", "Untracked spreadsheets"], 0, "Versioned workflows and documentation enable independent reproduction."),
 ("What should be checked when using administrative data?", ["Only the file name", "Only the software vendor", "Only chart design", "Coverage, definitions and fitness for statistical use"], 3, "Administrative sources must be assessed for coverage, concepts and quality.")]

def generate_questions(competency, count, question_type):
    bank = SQL if competency == "SQL" else GENERAL
    questions = []
    for i, (text, options, correct, explanation) in enumerate(bank[:count]):
        if question_type == "True/False":
            is_true = i % 2 == 0
            text = f"{text} The correct answer is: {options[correct if is_true else (correct + 1) % 4]}."
            options, correct = ["True", "False"], 0 if is_true else 1
        elif question_type == "Scenario-based":
            text = "You are reviewing a Labour Statistics analysis workflow. " + text
        questions.append({"id": str(i + 1), "text": text, "options": options, "correct": correct, "explanation": explanation, "competency": competency, "type": question_type})
    return questions