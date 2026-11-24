# Question bank part 1: payroll & compensation, HR operations & compliance
# Q(domain, difficulty 1-5, region 'any'|'uae', question, correct, [3 distractors], explanation)
# Writing rule: all four options similar in length, tone and level of qualification.
from common import Q

# ---------------- PAYROLL & COMPENSATION (pay) ----------------
Q('pay',1,'any',"An employee's bank details change on the 27th, two days after the payroll input cut-off. What should happen to this month's salary?",
  "Pay to the account on file; apply the new details next run once verified",
  ["Hold the salary until the new account is verified and loaded in the system",
   "Pay to the new account, as the employee's latest instruction takes priority",
   "Split the payment between the old and new accounts for this month only"],
  "Late bank-detail changes are a common fraud route. Paying the verified account on file keeps the employee paid on time; the change is verified and applied next cycle.")

Q('pay',1,'any',"Which document is the strongest source for an employee's salary when payroll and the HRIS disagree?",
  "The latest signed contract or approved salary change",
  ["The amount paid consistently over the last three months",
   "The figure the line manager confirms in writing by email",
   "The HRIS value, because the HRIS is the system of record"],
  "Payroll and the HRIS are both downstream of the approved instrument. Past payments can repeat an old error, and a manager's email is not an approval of pay.")

Q('pay',1,'any',"What is the main purpose of a payroll variance report reviewed before each payment run?",
  "To explain each material change before money is released",
  ["To confirm total payroll cost stays within the annual budget",
   "To give finance the joiners and leavers needed for accruals",
   "To show employees why net pay changed from the last month"],
  "A variance review is a pre-payment control: every movement must be explained and approved before funds are released.")

Q('pay',1,'any',"A one-off bonus was approved for 12 employees but the payroll file contains 13. What is the right first step?",
  "Stop and reconcile the file to the signed approval list",
  ["Process all 13 and recover any excess payment next month",
   "Remove the lowest bonus so the file matches the approval",
   "Pay the 12 matching names now and the 13th next month"],
  "Payroll must match the approval exactly. Reconciling first shows whether the approval or the file is wrong.")

Q('pay',1,'any',"In payroll, segregation of duties mainly means:",
  "The person who enters changes does not approve or release them",
  ["Payroll and HR report to different managers and departments",
   "Each payroll team member looks after a separate employee population",
   "Salary data is held in a separate system from personal data"],
  "Segregation separates input, approval and release so no single person can create and pay an unauthorised change.")

Q('pay',2,'any',"Payroll runs on the 20th. A promotion effective from the 1st of the same month is approved and arrives on the 24th. What is the best treatment?",
  "Pay the new rate next month with arrears back to the 1st",
  ["Change the effective date to next month to avoid arrears",
   "Run an off-cycle payment now for the full new salary",
   "Reverse this month's payroll and rerun it at the new rate"],
  "The approval sets the effective date, not payroll timing. Arrears in the next regular run preserve it without an off-cycle run or reversal.")

Q('pay',2,'any',"A salary advance is being recovered monthly. The employee resigns with three instalments outstanding. What should payroll check first?",
  "What the signed advance agreement says about early exit",
  ["Whether the final settlement is large enough to cover it",
   "Whether the line manager is willing to waive the balance",
   "The standard company practice for final pay deductions"],
  "Recovery depends on what the employee agreed in writing and on the rules on deductions. The agreement comes first.")

Q('pay',2,'any',"Gross pay matches the payroll register, but the bank file total is short by exactly one employee's net pay. What is the most likely cause?",
  "One employee's payment record is missing from the bank file",
  ["A deduction was posted twice for one of the employees",
   "One employee's housing allowance was paid at the wrong monthly rate",
   "Statutory contributions were calculated on the wrong base"],
  "If gross agrees and the bank total is short by exactly one net pay, a payment record is missing. Rate or deduction errors would also show in the register.")

Q('pay',2,'any',"Which control is most effective at detecting 'ghost' employees in payroll?",
  "Reconciling payroll headcount to HR records and managers",
  ["Requiring two signatures on every salary bank payment file",
   "Restricting payroll system access to the payroll team only",
   "Comparing total payroll cost with the previous month's cost"],
  "Ghost employees look legitimate inside payroll, so signatures and cost trends can miss them. Independent headcount reconciliation exposes them.")

Q('pay',2,'any',"An employee was overpaid AED 4,000 by mistake three months ago. What is the most appropriate approach?",
  "Explain the error in writing and agree a recovery plan",
  ["Deduct the full amount from next month's salary to close it",
   "Write the amount off, since the error was the company's fault",
   "Recover the amount from the final settlement when they leave"],
  "Overpayments are generally recoverable, but recovery should be transparent and agreed to avoid hardship or an unlawful deduction.")

Q('pay',3,'any',"Two months after a new payroll system went live, net pay is correct but GL postings are misallocated between cost centres. Where is the root cause most likely?",
  "Cost-centre mapping in the general ledger interface",
  ["Configuration of allowance and deduction pay elements",
   "The format of the salary bank transfer file",
   "Contribution or tax tables loaded during implementation"],
  "Correct net pay means calculations are right. Consistent misallocation points to the mapping between organisational data and accounting.")

Q('pay',3,'any',"Finance wants salary accruals for the last 10 days of the month because pay is calculated on the 20th. Which data matters most?",
  "Approved joiners, leavers and overtime after cut-off",
  ["The average monthly payroll cost across the previous quarter",
   "The full payroll register exactly as processed on the 20th",
   "Budgeted headcount and salary cost for the month in question"],
  "An accrual covers cost incurred but not processed. The register already reflects the cut-off; the gap is approved movements after it.")

Q('pay',3,'any',"A manager wants a 15% retention allowance for an engineer already paid at 118% of the range midpoint. What is the main risk to raise?",
  "Pay drifting well above range and creating equity issues with peers",
  ["The allowance being treated as basic salary for all entitlements",
   "The engineer becoming ineligible for this year's annual bonus",
   "The department going over its approved monthly salary budget for the year"],
  "At 118% of midpoint the employee is already high in range. A further 15% pushes pay far beyond the structure and raises equity questions.")

Q('pay',3,'any',"The same employee's overtime has been approved every month for a year at exactly 40 hours. What is the best response?",
  "Check the timesheets or access logs behind the approvals",
  ["Stop the overtime payments until the manager justifies the hours in writing",
   "Accept the approvals, as overtime is the manager's call",
   "Report the manager to internal audit for suspected fraud"],
  "A flat, unchanging pattern is a red flag, not proof. Checking source evidence is proportionate.")

Q('pay',3,'any',"A company moves its pay date from the 28th to the 1st of the following month. What is the most important implication to manage?",
  "A cash-flow gap for employees in the transition month",
  ["Annual leave accruals falling into the wrong pay period",
   "Overtime for the month needing to be recalculated",
   "Year-end payroll reports showing one fewer pay period"],
  "Moving the pay date later stretches the gap between two pay days. The people impact is cash flow, which needs early notice and often a bridging option.")

Q('pay',3,'any',"An audit finds six incorrect allowances in a 2,000-person payroll, all entered by one new team member in the same month. What is the best corrective action?",
  "Fix the six, retrain, and review that person's inputs for a period",
  ["Re-check all 2,000 employees' allowances before the next run",
   "Remove the team member's access to the payroll system for good",
   "Correct the six cases and close the audit finding as resolved"],
  "The pattern is concentrated, so a targeted fix plus a temporary second review addresses the cause proportionately.")

Q('pay',4,'any',"One payroll specialist alone understands the final settlement logic and starts extended leave next month. What should be prioritised?",
  "Document the logic and have a second person run settlements under supervision",
  ["Agree that she stays reachable by phone for urgent settlements during leave",
   "Defer all final settlements until she returns, so the logic stays consistent",
   "Hire a temporary contractor with broad payroll experience to cover her role in full"],
  "Key-person dependency is resolved by transferring knowledge and proving it works. Phone access or deferral pushes the risk onto leavers.")

Q('pay',4,'any',"After a merger, two groups in the same role have different allowance structures. Leadership wants one structure with no one losing pay. What is the most workable approach?",
  "One structure, with any shortfall protected as a phasing-out personal allowance",
  ["Move everyone to the more generous of the two structures with immediate effect",
   "Keep both structures permanently and apply each one by the original legal entity",
   "Move everyone to the lower structure and pay a one-time compensation amount"],
  "Red-circling the difference protects pay without keeping two structures forever and keeps harmonisation affordable.")

Q('pay',4,'any',"Audit finds 9% of last year's salary changes were processed before the approval date on the form. Most were approved later. How should payroll respond?",
  "Block processing without a dated approval and report the exceptions",
  ["Accept the position, since nearly all changes were approved in the end",
   "Ask managers to date approvals to match the payroll processing dates",
   "Add a monthly review of changes processed in the previous month"],
  "Later approval doesn't repair a failed preventive control. Re-dating approvals would falsify records; an after-the-fact review keeps the gap open.")

Q('pay',4,'any',"Payroll cost rose 6% in a quarter with no headcount change and no pay review. Which analysis explains it fastest?",
  "Variance by pay element and by population mix",
  ["Average salary per employee compared with the previous quarter",
   "A market benchmark of total payroll cost for similar companies",
   "A review of the budget assumptions set at the start of the year"],
  "With headcount and base pay stable, the movement is in variable elements or mix. Element-level analysis locates it.")

Q('pay',4,'any',"An employee's pay is above the maximum of a new grade range going live next month. What is the most defensible treatment?",
  "Keep current pay, red-circle it, and limit increases until the range catches up",
  ["Reduce pay to the range maximum after giving three months' written notice",
   "Move the employee up to the next grade so that the current salary fits the range",
   "Exclude the employee from the new structure until they are promoted"],
  "Red-circling protects pay without distorting grading. Cutting pay risks a contractual claim; regrading for salary fit undermines job evaluation.")

Q('pay',5,'any',"You are designing payroll controls for a move to bi-weekly pay across three new countries. Which principle matters most?",
  "One control set, with statutory steps adapted per country",
  ["Let each country team design its own controls to suit local practice",
   "Use a single outsourced provider and rely on its control framework",
   "Prioritise automation so that fewer manual controls are needed"],
  "A common control spine keeps assurance consistent while allowing legal differences. Outsourcing and automation still need the employer's own controls.")

Q('pay',5,'any',"A pay equity review finds a 7% unexplained gap for the same roles after controlling for grade, tenure and performance. Budget can close half of it this year. What should you recommend?",
  "Close the largest gaps first, set a dated plan for the rest, and fix the cause",
  ["Spread the available budget evenly across everyone in the lower-paid group",
   "Wait until next year so the full gap can be closed in a single step",
   "Re-run the analysis with additional controls until the gap is explained"],
  "Targeting the largest individual gaps reduces the worst inequity first; a dated plan and process fix prevent recurrence. Adding controls until a gap disappears is a known way to hide it.")

Q('pay',5,'any',"Leadership wants to cut payroll cost by 5% without redundancies. Which option generally preserves the most long-term value?",
  "Review overtime, allowances and contractor spend first",
  ["Apply a 5% salary cut to all employees above a set grade",
   "Freeze all pay increases and promotions for two years",
   "Convert part of everyone's fixed pay into a bonus"],
  "Variable and structural costs can often be reduced with less damage to retention and trust than across-the-board cuts or long freezes.")

Q('pay',5,'any',"Two years after a payroll system implementation, manual adjustments still make up 12% of each run. What is the strongest next step?",
  "Group the adjustments by root cause and fix the main drivers",
  ["Limit manual adjustments to senior payroll staff only",
   "Replace the system, as it is not meeting business needs",
   "Add a second reviewer to sign off every manual adjustment"],
  "Persistent manual adjustments are a symptom. A few causes usually drive most of them; extra reviewers or a new system don't remove the cause.")

# ---------------- HR OPERATIONS, PROCESS & COMPLIANCE (ops) ----------------
Q('ops',1,'any',"An employee asks HR to correct their date of birth in the HRIS. What is required before the change?",
  "An official identity document showing the correct date",
  ["Written approval of the change from the line manager",
   "A signed declaration from the employee confirming it",
   "Confirmation from payroll that pay will not be affected"],
  "Identity data must match an official document. Approvals and declarations don't prove the fact.")

Q('ops',1,'any',"What is the main purpose of a service-level agreement (SLA) for HR requests?",
  "To set measurable response and resolution times",
  ["To limit how many requests each employee can raise",
   "To describe each HR team member's responsibilities",
   "To make sure an HR manager approves every request"],
  "An SLA defines expected service levels so performance can be measured and improved.")

Q('ops',1,'any',"An HR team keeps signed contracts in personal email folders. What is the most important risk?",
  "Uncontrolled access and unreliable retrieval of records",
  ["Mailbox storage limits being exceeded as files build up",
   "Employees being unable to view their own contracts",
   "Contracts being signed by the wrong level of manager"],
  "Personal folders break access control, retention and audit trails, which are the core purposes of records management.")

Q('ops',1,'any',"An onboarding checklist step is skipped repeatedly because it takes too long. What should the process owner do first?",
  "Check whether the step is still needed and why it is slow",
  ["Make the step mandatory and report who keeps skipping it",
   "Remove the step from the checklist to save everyone time",
   "Ask the HR director to remind the team to complete it"],
  "Repeated skipping signals a design problem. Understanding purpose and obstacle comes before enforcing or removing the step.")

Q('ops',2,'any',"Employee files are kept indefinitely 'just in case'. Why is this a problem?",
  "Keeping data past its purpose raises privacy risk",
  ["It uses up too much storage space in the HR system",
   "It makes older employee files harder to search",
   "It slows down onboarding for newly hired employees"],
  "Data protection principles require retention tied to a purpose and period. 'Just in case' is not a retention basis.")

Q('ops',2,'any',"Two HR policies give different notice periods for the same group. An employee resigns. What should HR apply?",
  "The contract term, then fix the conflicting policies",
  ["The longer notice period, to protect the business",
   "The shorter notice period, as it favours the employee",
   "The notice period in the most recently issued policy"],
  "The contract is the primary agreement with the employee. The policy conflict is a separate governance fix.")

Q('ops',2,'any',"HR queries are resolved within SLA, but satisfaction with HR service keeps falling. What should be examined next?",
  "Reopened cases and the quality of the answers given",
  ["Whether the SLA response targets are set too generously",
   "The number of agents in the HR shared-services team",
   "The volume of queries raised per employee each month"],
  "Fast but poor answers create repeat contacts. Quality and first-contact resolution explain satisfaction better than speed.")

Q('ops',2,'any',"A manager asks HR to email his team's salary spreadsheet to his personal address to work from home. What should HR do?",
  "Decline and offer secure access through company channels",
  ["Send it password-protected, as he can already see the data",
   "Send it after removing employee names from the spreadsheet",
   "Send it and ask him to delete the file once he has finished"],
  "Authorisation to view data doesn't authorise moving it into uncontrolled personal accounts.")

Q('ops',3,'any',"An audit finds 14% of leavers still had system access 30 days after exit. Which fix addresses the root cause?",
  "Trigger access removal from the HR exit record",
  ["Send IT a monthly list of leavers for access removal",
   "Ask managers to confirm removal in the exit checklist",
   "Run a quarterly access review across all key systems"],
  "Manual hand-offs and periodic reviews leave gaps. Linking removal to the authoritative HR event closes them at source.")

Q('ops',3,'any',"You are asked to cut onboarding cycle time from offer acceptance to day one. Which analysis comes first?",
  "Map the end-to-end flow with hand-offs and waiting times",
  ["Benchmark the cycle time against competitors in the same sector",
   "Survey recent joiners about their onboarding experience",
   "Review the onboarding policy for steps that are outdated"],
  "Most cycle time sits in waiting between hand-offs. Mapping the flow shows where.")

Q('ops',3,'any',"A new HR policy was approved, but employees keep applying the old rule. What is the most likely gap?",
  "Systems, forms and manager guidance still reflect the old rule",
  ["The new policy wording is too long and too complex to follow",
   "Employees did not read the announcement email when it was sent",
   "Managers personally disagree with the change in the policy"],
  "People follow the tools in front of them. If forms and systems still reflect the old rule, the new policy exists only on paper.")

Q('ops',3,'any',"An employee asks for a copy of all personal data HR holds about them. What is the best first step?",
  "Verify their identity and log the request with its deadline",
  ["Ask the employee to explain why they need a copy of the data",
   "Send the full personnel file straight away to show openness",
   "Ask the line manager whether the request should be fulfilled"],
  "Access requests generally need no reason. Identity checks and tracking the deadline come first; sending data unchecked risks disclosure to the wrong person.")

Q('ops',3,'any',"A simple address change needs four approvals and takes nine days. What principle should guide the redesign?",
  "Match the level of approval to the risk of the change",
  ["Keep all four approvals but run them in parallel",
   "Remove all approvals and rely on a later audit check",
   "Route all four approvals to one senior HR manager"],
  "Controls should be proportionate. A low-risk change needs validation, not four approvers.")

Q('ops',4,'any',"HR wants to automate offer letters. There are 23 template variants maintained by different people. What should happen before automation?",
  "Reduce to a governed, owned template set, then automate",
  ["Automate all 23 variants so the business is not disrupted",
   "Choose a vendor tool and let it define the templates",
   "Automate the three most used variants and keep the rest"],
  "Automating an uncontrolled process scales its inconsistency. Standardise and assign ownership first.")

Q('ops',4,'any',"A compliance review finds a mandatory registration step was missed for 40 employees over two years. What is the best order of actions?",
  "Correct the cases, assess exposure, report it, then fix the process",
  ["Fix the process first so no new cases occur, then clear the backlog",
   "Report to leadership and wait for a decision before correcting anything",
   "Correct the cases quietly to avoid attention on the original error"],
  "Correcting cases reduces ongoing exposure fastest; transparency and the root-cause fix follow. Concealment creates bigger legal and trust risk.")

Q('ops',4,'any',"An HR service centre handles 6,000 tickets a month; 35% are 'where is my letter' follow-ups. What is the most effective fix?",
  "Visible request tracking plus automated standard letters",
  ["More agents so follow-up tickets are answered faster",
   "A rule that follow-up tickets will not be answered",
   "A longer service-level target for all standard letter requests"],
  "Follow-ups are failure demand caused by lack of visibility. Removing the cause beats handling it faster.")

Q('ops',4,'any',"You inherit a 180-page HR policy manual that managers say they never use. What will most improve compliance?",
  "Rebuild it around tasks, with short rules and named owners",
  ["Add a detailed index and search to the existing manual",
   "Require every manager to sign that they have read it in full",
   "Summarise the manual on a one-page poster for offices"],
  "Usability drives compliance. Task-based guidance with owners gets used; sign-offs and posters don't change behaviour.")

Q('ops',5,'any',"The board asks for assurance that HR compliance is effective across five countries. What should the assurance rest on?",
  "A risk-based control register with owners and testing evidence",
  ["Annual self-certification letters from each country HR head",
   "An external audit of the largest country every single year",
   "A dashboard of mandatory policy training completion rates"],
  "Assurance needs evidence that key controls operate. Self-certification and training completion are inputs, not proof.")

Q('ops',5,'any',"An operating model review finds HR business partners spend half their time on transactional queries. Which change fixes the root cause?",
  "A tiered service model that routes transactional work elsewhere",
  ["Hiring more HR business partners so they can absorb the query volume",
   "A rule that HR business partners must not answer such queries",
   "Fewer HR policies, so that fewer queries are raised overall"],
  "Without a channel for transactional work, it flows to whoever is accessible. A tiered model redirects it structurally.")

Q('ops',5,'any',"A regulator introduces a new employment requirement effective in 60 days. What is the strongest implementation approach?",
  "Gap analysis, named owners, system changes and communication",
  ["Wait for the official FAQs before starting any of the work",
   "Issue a policy update now and handle questions as they come",
   "Ask external counsel to run the whole implementation for you"],
  "Implementation needs a structured gap analysis and change plan. Waiting compresses the timeline, and a policy alone doesn't change systems or practice.")

Q('ops',5,'any',"Process mining shows 30% of internal transfers bypass the documented workflow. What should you conclude first?",
  "The workflow may not fit real needs, so find out why",
  ["Employees are avoiding controls and need disciplining",
   "The system needs hard restrictions to block bypassing",
   "The data is probably wrong because 30% is too high"],
  "High bypass rates usually reveal a design mismatch. Understanding why comes before enforcement.")
