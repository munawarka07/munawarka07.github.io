# Question bank part 4: additional senior (level 4) and strategic (level 5) scenarios
from common import Q

# ---- payroll ----
Q('pay',4,'any',"A bonus plan pays on 'company EBITDA and individual rating'. After payout, finance restates EBITDA down 4%. Payouts were 6% too high in aggregate. What should HR recommend?",
  "Apply the plan's own adjustment or clawback terms",
  ["Recover the excess from every employee's next salary straight away",
   "Leave the payouts in place, since employees acted in good faith",
   "Reduce next year's bonus pool by 6% for everyone to offset it"],
  "The plan document governs restatements. If it has adjustment or clawback terms, apply them through governance; unilateral salary deductions or silent offsets are hard to defend.")
Q('pay',5,'any',"The CFO proposes moving all allowances into basic salary to 'simplify payroll'. What is the most important consequence to quantify first?",
  "The rise in entitlements calculated on basic pay",
  ["The time saved each month by processing fewer pay elements",
   "The change in how payslips look to employees after the move",
   "The number of employees who would prefer the simpler structure"],
  "Entitlements calculated on basic pay grow with it. The long-term liability, not admin time, usually decides whether this is affordable.")
Q('pay',5,'any',"A sales commission plan led to record revenue but margins fell sharply. What design flaw is most likely?",
  "Commission rewards revenue with no link to margin",
  ["The commission rate is too low to motivate the right behaviour",
   "Payout frequency is quarterly rather than monthly for the team",
   "Too few sales employees are eligible to join the plan each year"],
  "People optimise what the plan pays for. Paying on revenue alone encourages heavy discounting.")

# ---- operations ----
Q('ops',4,'any',"An HR system vendor proposes a configuration change that will fix a bug but alters how leave accrual is calculated mid-year. What should you insist on first?",
  "Parallel testing on real accrual data before release",
  ["A written guarantee from the vendor that employees will not notice",
   "Release at year-end only, with no testing needed in the meantime",
   "An email to all staff explaining the bug before the fix goes live"],
  "Calculation changes need evidence on real cases before release. Guarantees and timing alone don't prove the outcome.")
Q('ops',5,'any',"After an acquisition, the acquired company keeps its own HR policies 'for now'. Two years later, nothing has changed. What is the main risk to escalate?",
  "Unequal treatment and legal exposure across the workforce",
  ["Higher licence costs for running two sets of HR system configurations",
   "Confusion for HR staff who need to remember two sets of policies",
   "A drop in employer brand ratings on public review sites over time"],
  "Long-term dual policies create inconsistent treatment and claims risk. Admin cost and confusion matter less than fairness and exposure.")
Q('ops',5,'any',"HR is asked to cut its operating cost by 20% while keeping service levels. Which approach is most sustainable?",
  "Remove failure demand and waste before cutting capacity",
  ["Reduce HR headcount by 20% and set the same service targets",
   "Move all HR services to a lower-cost outsourced provider",
   "Stop all HR projects until the cost target has been met"],
  "Cutting capacity while the same failure demand flows in degrades service. Removing waste first lowers the work, then the cost.")

# ---- lifecycle ----
Q('life',4,'any',"A strong performer asks for a fully remote arrangement after relocating abroad. The role is home-country based. What should HR check before anything else?",
  "Tax, immigration and local-law implications of the move",
  ["Whether the manager is comfortable supervising someone remotely",
   "Whether other team members have made similar requests before",
   "Whether the employee will accept a pay cut for the arrangement"],
  "Working from another country can create tax, permanent establishment, immigration and local-law obligations. Those determine feasibility.")
Q('life',5,'any',"Exit data shows women leave at twice the rate of men at the point of promotion to manager. What should HR investigate first?",
  "How the step up to manager is selected, supported and designed",
  ["Whether women are paid less than men at the manager grade",
   "Whether the exit interview questions are biased in some way",
   "Whether flexible working options are advertised clearly enough"],
  "The spike at a specific transition points to that transition: selection, support and role design. Pay and flexibility may contribute but are not where the signal points.")
Q('life',4,'any',"A team is moving to a new shift pattern. Most employees agree, but three refuse due to caring responsibilities. What is the best approach?",
  "Consult each of the three and explore adjustments",
  ["Apply the new pattern to everyone, since the majority agrees",
   "Exempt the three permanently so that the change can go ahead",
   "Offer the three a transfer to another team on the old pattern"],
  "Individual circumstances need individual consultation. Majority agreement doesn't remove the duty to consider adjustments fairly.")

# ---- talent ----
Q('tal',4,'any',"Hiring managers reject 70% of shortlisted candidates that recruiters send. What is the most likely root cause?",
  "The role brief wasn't properly agreed at intake",
  ["Recruiters are not sourcing from enough channels",
   "Hiring managers are too busy to review CVs properly",
   "The salary range is too low for the market"],
  "A high rejection rate at shortlist stage usually means recruiter and manager are working to different pictures of the role.")
Q('tal',5,'any',"A successor has been 'ready in 1–2 years' for the CFO role for five years. What does this indicate about the succession process?",
  "Readiness labels aren't tied to development or honest review",
  ["The successor is not interested in the role and should be replaced",
   "The current CFO is blocking the successor from progressing",
   "The rating scale needs more categories to show finer detail"],
  "A static readiness label signals a process that labels but doesn't develop or recalibrate. The individual explanations may be true, but the process should have surfaced them.")
Q('tal',5,'any',"Leadership wants to use AI to screen CVs to reduce time to hire. What is the most important condition before go-live?",
  "Testing it for adverse impact and validity on your roles",
  ["Confirming the vendor's tool is used by other large companies",
   "Making sure the tool screens CVs faster than recruiters do",
   "Training hiring managers to read the tool's ranking reports"],
  "Speed and popularity don't show fairness or validity. The tool must be tested on your roles and population before decisions rely on it.")

# ---- employee relations ----
Q('er',4,'any',"During an investigation, the accused employee goes on sick leave and says they cannot attend meetings. What is the best approach?",
  "Check fitness medically and offer options like written answers",
  ["Pause the investigation until the employee is fully back at work",
   "Proceed without the employee's input, as they chose not to attend",
   "Close the investigation, since the employee is now on sick leave"],
  "Indefinite pauses and proceeding without input are both risky. Checking fitness and offering alternatives keeps the process fair and moving.")
Q('er',4,'any',"An employee posts a complaint about the company on social media, naming their manager. What should HR consider first?",
  "Both the conduct issue and any genuine concern raised",
  ["Asking the employee to delete the post within 24 hours",
   "Starting disciplinary action for damaging the company's name",
   "Replying publicly to correct the facts in the post"],
  "The post may contain a genuine grievance as well as a conduct issue. Both need assessment before any response.")
Q('er',5,'any',"Three separate grievances in a year name the same senior manager, each found 'not proven'. What should HR do now?",
  "Review the pattern across the cases with leadership",
  ["Close the matter, since none of the grievances was upheld",
   "Warn the employees that repeated complaints may be vexatious",
   "Wait for a fourth grievance before taking any further action"],
  "Individual cases may lack proof, but a pattern is itself information. It justifies a wider look at behaviour and culture.")
Q('er',5,'any',"A collective dispute is building: 60 employees sign a petition about shift allowances. What is the best first response?",
  "Meet representatives and set out a clear review process",
  ["Ignore the petition until employees raise individual grievances",
   "Speak to each signatory one to one to understand their view",
   "Agree to the demands quickly to stop the dispute from growing"],
  "Prompt, structured engagement with representatives de-escalates and shows the issue is taken seriously, without conceding before review.")

# ---- analytics ----
Q('ana',4,'any',"An attrition model is 92% accurate. Only 8% of employees leave each year. What should you check before trusting it?",
  "How well it identifies the people who actually leave",
  ["Whether the model has been trained on at least five years of data",
   "Whether the 92% accuracy holds when you add more personal data",
   "Whether the model runs fast enough to be refreshed every week"],
  "With an 8% base rate, a model that predicts 'stays' for everyone is 92% accurate. Precision and recall on leavers matter.")
Q('ana',5,'any',"A pulse survey shows engagement in Team A dropped 12 points. Team A has 9 respondents. What is the most responsible way to act?",
  "Treat it as a prompt to listen, not a confirmed trend",
  ["Escalate it to the leadership team as an urgent people risk",
   "Ignore the result, since the team is too small to measure",
   "Compare Team A's score with company averages for context"],
  "Small groups swing widely. The change is a reason to listen, not a basis for firm conclusions.")
Q('ana',5,'any',"Leaders want monthly league tables ranking managers by team engagement. What is the main risk?",
  "Managers pressuring teams, which corrupts honest data",
  ["League tables take too long to produce from survey data each month",
   "Managers of large teams will always rank lower than small teams",
   "Employees will stop reading engagement survey communications"],
  "When a measure becomes a target, people manage the measure. Public ranking invites pressure that undermines honesty.")

# ---- strategy ----
Q('str',4,'any',"A business unit leader asks HR to design a bonus to fix low collaboration between two teams. What should the HRBP explore first?",
  "Whether goals or structure push the teams apart",
  ["How large the bonus needs to be to change collaboration behaviour",
   "Which teams have used collaboration bonuses successfully before",
   "How quickly the bonus could be approved and communicated"],
  "Low collaboration often comes from conflicting goals or structure. A bonus layered on top may not fix the cause.")
Q('str',5,'any',"The CEO wants to announce a four-day week next month to boost retention. What is the strongest HR advice?",
  "Pilot it with measures for coverage, cost and compliance",
  ["Support the announcement, since retention is a top priority",
   "Advise against it, since four-day weeks reduce productivity",
   "Survey employees first and adopt it if most are in favour"],
  "A big working-time change needs evidence on coverage, cost and compliance. A measured pilot reduces the risk of a public reversal.")
Q('str',5,'any',"Two years into a skills-based organisation project, leaders still make decisions based on job titles. What is most likely missing?",
  "Skills data used in staffing, pay and promotion decisions",
  ["A more detailed skills taxonomy with more skills defined",
   "A new HR system that can display employee skills profiles",
   "More communication about why skills matter to the business"],
  "Skills only change behaviour when decisions use them. A bigger taxonomy or system without that link changes little.")
