const http = require('http');

const sessions = new Map();
const SQL_BANK = [
  ['Which SQL clause groups survey records by state?', ['ORDER BY', 'GROUP BY', 'WHERE', 'DISTINCT'], 1, 'GROUP BY aggregates records sharing the same state.'],
  ['Which JOIN retains every record from the left survey table?', ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'RIGHT JOIN'], 2, 'LEFT JOIN keeps all left-table records, including unmatched ones.'],
  ['How do you count all rows in a labour survey table?', ['COUNT(*)', 'SUM(*)', 'TOTAL(rows)', 'COUNT(NULL)'], 0, 'COUNT(*) counts every row, including rows containing NULL values.'],
  ['Which clause filters grouped aggregate results?', ['WHERE', 'ORDER BY', 'SELECT', 'HAVING'], 3, 'HAVING filters after grouping; WHERE filters individual rows.'],
  ['What does a primary key enforce?', ['Alphabetical sorting', 'Unique, non-null row identity', 'Automatic totals', 'Data encryption'], 1, 'A primary key uniquely identifies each row and cannot be NULL.'],
  ['Which expression calculates average reported earnings?', ['SUM(earnings)', 'COUNT(earnings)', 'AVG(earnings)', 'MEDIAN(*)'], 2, 'AVG computes the arithmetic mean of non-null earnings.'],
  ['How should missing earnings values be tested in SQL?', ['earnings IS NULL', 'earnings = NULL', 'earnings == empty', 'earnings < 0'], 0, 'NULL represents an unknown value and is tested with IS NULL.'],
  ['Which keyword removes duplicate values from query output?', ['UNIQUE ROW', 'GROUP', 'ONLY', 'DISTINCT'], 3, 'SELECT DISTINCT returns unique result combinations.'],
  ['What is the safest way to pass user input into a SQL query?', ['String concatenation', 'Parameterized queries', 'Removing spaces', 'Uppercase conversion'], 1, 'Bound parameters separate user data from executable SQL.'],
  ['Which query ranks districts by unemployment rate?', ['WHERE rate DESC', 'GROUP BY rate', 'ORDER BY rate DESC', 'HAVING rate'], 2, 'ORDER BY rate DESC sorts the highest unemployment rates first.'],
  ['Which operator selects records matching both conditions?', ['AND', 'OR', 'NOT', 'UNION'], 0, 'AND requires both conditions to evaluate as true.'],
  ['Which SQL statement changes existing records?', ['INSERT', 'CREATE', 'DROP', 'UPDATE'], 3, 'UPDATE modifies existing rows, normally constrained with WHERE.'],
  ['What is a foreign key used for?', ['Encrypting records', 'Linking related tables', 'Sorting strings', 'Summing columns'], 1, 'A foreign key references a key in another table.'],
  ['Which function substitutes a value for NULL?', ['COUNT', 'ROUND', 'COALESCE', 'SUBSTRING'], 2, 'COALESCE returns the first non-null argument.'],
  ['What does UNION ALL do?', ['Combines rows including duplicates', 'Deletes duplicates', 'Joins on primary keys', 'Updates both tables'], 0, 'UNION ALL stacks compatible query results without deduplication.'],
  ['Which operation should surround a multi-table data update?', ['A chart', 'A comment', 'A view', 'A transaction'], 3, 'Transactions keep related changes atomic and consistent.'],
  ['Which construct calculates within-group rankings without collapsing rows?', ['GROUP BY', 'Window function', 'DISTINCT', 'LIMIT'], 1, 'Window functions preserve individual rows while calculating over a partition.'],
  ['Which data type is suitable for exact monetary values?', ['TEXT', 'BOOLEAN', 'DECIMAL', 'FLOAT'], 2, 'DECIMAL provides exact fixed-precision numeric representation.'],
  ['Why add an index to a frequently searched district ID?', ['Improve lookup performance', 'Make all data public', 'Remove validation', 'Increase duplicate records'], 0, 'Indexes can improve selective lookup performance, with storage and write costs.'],
  ['Which aggregate ignores NULL values in its argument?', ['COUNT(*) only', 'Every WHERE clause', 'ORDER BY', 'AVG(column)'], 3, 'AVG ignores NULL values rather than treating them as zero.']
];
const GENERAL_BANK = [
  ['Why split data into training and test sets?', ['Reduce sample size', 'Measure generalization', 'Remove all outliers', 'Guarantee perfect accuracy'], 1, 'A held-out test set evaluates performance on unseen observations.'],
  ['What is a stratified sample?', ['The first available records', 'Only urban households', 'Samples drawn within defined subgroups', 'A census of all records'], 2, 'Stratification ensures representation across meaningful population subgroups.'],
  ['Which practice protects respondents in published microdata?', ['Anonymization and disclosure control', 'Publishing names', 'Sharing exact addresses', 'Removing survey weights'], 0, 'Disclosure control reduces the risk of identifying respondents.'],
  ['What does overfitting mean?', ['Too little training data storage', 'Perfect real-world performance', 'No model parameters', 'Learning noise rather than generalizable patterns'], 3, 'Overfit models perform well on training data but poorly on unseen data.'],
  ['Which metric is useful for an imbalanced classification problem?', ['Training time alone', 'Precision and recall', 'File size', 'Column count'], 1, 'Precision and recall reveal performance when class frequencies differ.'],
  ['Why are survey weights applied?', ['To hide missing data', 'To make files larger', 'To account for unequal selection probabilities', 'To sort responses'], 2, 'Weights help population estimates reflect the sampling design.'],
  ['Which action helps prevent data leakage?', ['Fit preprocessing only on training data', 'Train on test labels', 'Mix all datasets', 'Remove the test set'], 0, 'Preprocessing must not learn from held-out test observations.'],
  ['What is a confidence interval?', ['A guaranteed range for every record', 'A model score', 'A data identifier', 'An interval from a procedure with stated long-run coverage'], 3, 'Confidence describes the long-run coverage of the estimation procedure.'],
  ['What should happen before deploying an AI model for official statistics?', ['Skip documentation', 'Validate accuracy, fairness and governance', 'Publish all private data', 'Remove human oversight'], 1, 'Public-sector models require validation, governance and appropriate oversight.'],
  ['What is metadata?', ['Only missing values', 'Encrypted passwords', 'Information describing a dataset and its methods', 'A prediction model'], 2, 'Metadata describes definitions, collection methods, quality and structure.']
];
const course = {
  id: 'sql-fundamentals',
  title: 'SQL Fundamentals',
  competency: 'SQL',
  category: 'Technical',
  provider: 'iGOT Karmayogi',
  duration: 4,
  difficulty: 'Beginner',
  rating: 4.7,
  completion_rate: 95,
  language: 'English / Hindi',
  department: 'Labour Statistics',
  prerequisites: 'None',
  description: 'Learn relational data, filtering, sorting and SQL queries.',
  modules: ['Relational tables', 'SELECT queries', 'Filtering records', 'Sorting results'],
  status: 'Completed',
  prereq: 'None',
  completed_modules: [0, 1, 2, 3],
};
const pathwayCourses = [
  course,
  { id: 'sql-analysis', title: 'SQL for Statistical Data Analysis', competency: 'SQL', provider: 'iGOT Karmayogi', duration: 8, difficulty: 'Intermediate', rating: 4.8, status: 'In Progress', prereq: 'SQL Fundamentals', gap: 25, completed_modules: [0], modules: ['Statistical datasets'] },
  { id: 'applied-ml', title: 'Applied Machine Learning', competency: 'AI / Machine Learning', provider: 'NSSTA', duration: 10, difficulty: 'Intermediate', rating: 4.8, status: 'Not Started', prereq: 'Foundational statistical analysis', gap: 33, completed_modules: [], modules: ['Preparing training data'] },
  { id: 'ai-statistics', title: 'AI Applications in Official Statistics', competency: 'AI / Machine Learning', provider: 'iGOT Karmayogi / NSSTA', duration: 6, difficulty: 'Intermediate', rating: 4.9, status: 'Not Started', prereq: 'Applied Machine Learning', gap: 33, completed_modules: [], modules: ['AI in statistical production'] },
];

function makeOverview(state) {
  const overall = state.competencies.reduce((acc, item) => acc + item.current, 0) / state.competencies.length;
  return {
    overall: Math.round(overall),
    critical_gaps: state.competencies.filter(item => item.gap >= 20).length,
    hours: 38.5,
    courses_completed: state.learning && Object.values(state.learning).filter(item => item.status === 'Completed').length,
    categories: [
      { name: 'Statistical', current: 74, required: 82 },
      { name: 'Technical', current: 64, required: 80 },
      { name: 'Digital', current: 46, required: 66 },
      { name: 'Behavioural', current: 82, required: 90 },
    ],
  };
}

function generateQuestionSet(competency, count, questionType) {
  const bank = competency === 'SQL' ? SQL_BANK : GENERAL_BANK;
  const limit = Math.min(count, bank.length);
  return bank.slice(0, limit).map(([text, options, correct, explanation], index) => {
    let finalText = text;
    let finalOptions = options;
    let finalCorrect = correct;
    if (questionType === 'True/False') {
      const isTrue = index % 2 === 0;
      finalText = `${text} The correct answer is: ${options[isTrue ? correct : (correct + 1) % 4]}.`;
      finalOptions = ['True', 'False'];
      finalCorrect = isTrue ? 0 : 1;
    } else if (questionType === 'Scenario-based') {
      finalText = `You are reviewing a Labour Statistics analysis workflow. ${text}`;
    }
    return { id: String(index + 1), text: finalText, options: finalOptions, correct: finalCorrect, explanation, competency, type: questionType };
  });
}

function stateFor(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      role: 'employee',
      profile: { name: 'Ananya Sharma', designation: 'Deputy Director', department: 'Labour Statistics', location: 'New Delhi', experience: 8, education: 'M.Sc. Statistics', expertise: 'Statistical analysis and data validation', responsibilities: 'Lead statistical reporting and capability building.', summary: 'Local demonstration workspace.' },
      competencies: [
        { id: 'sql', name: 'SQL', category: 'Technical', current: 55, required: 80, gap: 25, priority: 'High', confidence: 88, last_assessed: '2026-09-10' },
        { id: 'python', name: 'Python', category: 'Technical', current: 62, required: 80, gap: 18, priority: 'Medium', confidence: 92, last_assessed: '2026-09-10' },
        { id: 'data-visualization', name: 'Data Visualization', category: 'Technical', current: 65, required: 80, gap: 15, priority: 'Medium', confidence: 92, last_assessed: '2026-09-10' },
        { id: 'ai-machine-learning', name: 'AI / Machine Learning', category: 'Digital', current: 32, required: 65, gap: 33, priority: 'High', confidence: 88, last_assessed: '2026-09-10' },
        { id: 'gis', name: 'GIS', category: 'Digital', current: 40, required: 60, gap: 20, priority: 'Medium', confidence: 88, last_assessed: '2026-09-10' },
      ],
      learning: { 'sql-fundamentals': { completed: [0, 1, 2, 3], status: 'Completed' } },
      results: [],
      documents: [],
      programmes: [],
      notifications_read: false,
      history: [{ month: 'Jan', competency: 52, hours: 8, score: 58, gap: 45, courses: 2 }, { month: 'Feb', competency: 58, hours: 16, score: 65, gap: 40, courses: 5 }, { month: 'Mar', competency: 64, hours: 24, score: 72, gap: 36, courses: 8 }, { month: 'Apr', competency: 69, hours: 31, score: 77, gap: 33, courses: 10 }, { month: 'May', competency: 74, hours: 38.5, score: 81, gap: 31, courses: 12 }],
      assessments: [],
      notifications: [],
    });
  }
  const state = sessions.get(sessionId);
  state.competencies = state.competencies || [];
  state.learning = state.learning || {};
  state.results = state.results || [];
  state.documents = state.documents || [];
  state.programmes = state.programmes || [];
  state.notifications = state.notifications || [];
  state.assessments = state.assessments || [];
  return { ...state, overview: makeOverview(state), courses: pathwayCourses, recommendations: pathwayCourses.slice(0, 2), training_programmes: [], notifications: state.notifications }; 
}

function send(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Headers': 'Content-Type, X-Demo-Session', 'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS' });
  response.end(JSON.stringify(body));
}

function body(request) {
  return new Promise(resolve => {
    let value = '';
    request.on('data', chunk => { value += chunk; });
    request.on('end', () => resolve(value ? JSON.parse(value) : {}));
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  const sessionId = request.headers['x-demo-session'] || 'local-demo-session';
  const url = new URL(request.url, 'http://localhost:8000');
  if (url.pathname === '/api/' && request.method === 'GET') return send(response, 200, { name: 'iGOT Sankhyashakti', environment: 'local demonstration' });
  if (url.pathname === '/api/state' && request.method === 'GET') return send(response, 200, stateFor(sessionId));
  if (url.pathname === '/api/auth/demo' && request.method === 'POST') {
    const payload = await body(request);
    const state = stateFor(sessionId);
    state.role = payload.role;
    sessions.set(sessionId, state);
    return send(response, 200, { role: payload.role, mode: 'demo' });
  }
  if (url.pathname === '/api/courses' && request.method === 'GET') return send(response, 200, pathwayCourses);
  if (url.pathname === '/api/recommendations' && request.method === 'GET') return send(response, 200, pathwayCourses.slice(0, 2));
  if (url.pathname === '/api/profile' && request.method === 'GET') return send(response, 200, stateFor(sessionId).profile);
  if ((url.pathname === '/api/assessment/generate' || url.pathname === '/api/quiz/generate') && request.method === 'POST') {
    const payload = await body(request);
    const state = stateFor(sessionId);
    const competency = payload.competency || 'SQL';
    const count = Number(payload.count || 10);
    const questionType = payload.question_type || 'MCQ';
    const questions = generateQuestionSet(competency, count, questionType);
    const assessment = { id: `local-${Date.now()}-${Math.random().toString(16).slice(2)}`, session_id: sessionId, competency, count: questions.length, question_type: questionType, questions, document_id: payload.document_id || null, submitted: false, created_at: new Date().toISOString() };
    state.assessments = state.assessments || [];
    state.assessments.push(assessment);
    sessions.set(sessionId, state);
    return send(response, 200, { id: assessment.id, competency, count: assessment.count, questions: assessment.questions.map(({ correct, explanation, ...q }) => q), mode: 'simulated' });
  }
  if (url.pathname === '/api/assessment/submit' && request.method === 'POST') {
    const payload = await body(request);
    const state = stateFor(sessionId);
    const assessment = (state.assessments || []).find(item => item.id === payload.assessment_id && item.session_id === sessionId);
    if (!assessment) return send(response, 404, { detail: 'Assessment not found' });
    const answers = payload.answers || {};
    let correct = 0;
    for (const question of assessment.questions) {
      const chosen = answers[String(question.id)];
      if (chosen === question.correct) correct += 1;
    }
    const total = assessment.questions.length;
    const accuracy = Math.round((correct / total) * 100);
    const comp = state.competencies.find(item => item.name === assessment.competency);
    if (!comp) return send(response, 404, { detail: 'Competency not found' });
    const previous = Number(comp.current || 0);
    const improvement = Math.max(0, Math.round((accuracy - previous) * 0.52));
    const current = Math.min(100, previous + improvement);
    comp.current = current;
    comp.gap = Math.max(0, comp.required - current);
    comp.confidence = 95;
    comp.last_assessed = new Date().toISOString().slice(0, 10);
    const result = {
      id: `result-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      assessment_id: assessment.id,
      competency: comp.name,
      score: correct,
      total,
      accuracy,
      previous,
      current,
      improvement,
      previous_gap: Math.max(0, comp.required - previous),
      new_gap: Math.max(0, comp.required - current),
      date: new Date().toISOString(),
      breakdown: [{ name: comp.name, score: accuracy }],
      review: assessment.questions.map(question => ({ ...question, selected: typeof answers[String(question.id)] === 'number' ? Number(answers[String(question.id)]) : null })),
    };
    state.results = state.results || [];
    state.results.push(result);
    state.history = state.history || [];
    state.history.push({ month: `Assessment ${state.results.length}`, competency: makeOverview(state).overall, hours: makeOverview(state).hours, score: accuracy, gap: Math.max(0, 31 - Math.round(state.results.reduce((sum, item) => sum + item.improvement, 0) / Math.max(1, state.results.length))), courses: makeOverview(state).courses_completed });
    assessment.submitted = true;
    sessions.set(sessionId, state);
    return send(response, 200, result);
  }
  if (url.pathname === '/api/progress' && request.method === 'GET') {
    const state = stateFor(sessionId);
    return send(response, 200, { history: state.history, results: state.results, overview: state.overview });
  }
  return send(response, 404, { detail: 'Local API route not implemented.' });
});

server.listen(8000, '127.0.0.1', () => console.log('Local API listening at http://localhost:8000'));