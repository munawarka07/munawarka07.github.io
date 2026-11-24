# Question bank part 3: HRIS & analytics, strategy & leadership, UAE employment law
from common import Q

# ---------------- HRIS, DATA & PEOPLE ANALYTICS (ana) ----------------
Q('ana',1,'any',"Two reports show different headcount for the same date. What is the most likely reason?",
  "They define headcount differently, e.g. contractors",
  ["One of the two reports contains a formula error",
   "The data was extracted at different times of day",
   "One report runs on a newer version of the HRIS"],
  "Definitional differences are the most common cause of conflicting headcount. Agreeing definitions comes first.")

Q('ana',1,'any',"What is an 'effective date' in an HR system?",
  "The date from which a change applies",
  ["The date the manager approved the change",
   "The date the employee was told of it",
   "The date the record was last edited"],
  "Effective dating lets systems show history correctly and drive payroll from the right date.")

Q('ana',1,'any',"Which field is the best unique identifier for employee records across HR systems?",
  "A permanent system-generated employee number",
  ["The employee's full name as on their passport",
   "The employee's corporate email address",
   "The employee's national identity number"],
  "Names change, emails get reused and IDs can be sensitive or changed. A permanent internal key is safest.")

Q('ana',1,'any',"A dashboard shows average salary rose 8% while no one received a pay rise. What could explain it?",
  "A shift in workforce mix through joiners and leavers",
  ["A data error introduced by the payroll system",
   "Automatic inflation adjustments in the system",
   "The dashboard using the wrong currency setting"],
  "Averages move with composition. Mix effects are common and need to be checked before assuming an error.")

Q('ana',2,'any',"A turnover dashboard counts internal transfers as leavers. What is the effect?",
  "Turnover is overstated and may be misdiagnosed",
  ["Turnover is understated because transfers stay in the company",
   "The dashboard will show fewer new joiners than it should",
   "There is no real effect if transfers are only a small number"],
  "Transfers are not exits from the organisation. Counting them inflates turnover, especially in units with high mobility.")

Q('ana',2,'any',"Managers say an engagement survey result for a team of 4 should be shown separately. What is the main concern?",
  "Individual answers could be identified in a group that small",
  ["Samples below ten are always statistically invalid to report",
   "The team will score lower than larger teams on average",
   "Managers will spend far too long on very small results"],
  "A minimum reporting group protects anonymity, which keeps future responses honest.")

Q('ana',2,'any',"You are asked whether training caused higher performance, based on data showing trained employees score better. What is the main issue?",
  "Those selected for training may already have been stronger",
  ["The sample size is probably too small to draw a conclusion",
   "Performance ratings are too subjective to be used at all",
   "The analysis leaves out the cost of the training programme"],
  "Correlation doesn't show causation. A comparison group or pre/post measure is needed.")

Q('ana',2,'any',"An HRIS upgrade requires data migration. Which step most reduces the risk of bad data in the new system?",
  "Cleanse and reconcile before load, then validate samples",
  ["Migrate everything and fix errors as users report them",
   "Migrate only active employees to reduce the data volume",
   "Freeze all HR changes for three months before migration"],
  "Data quality issues migrate with the data. Pre-migration cleansing and post-load validation are the core controls.")

Q('ana',3,'any',"Attrition is 20% in Unit A and 10% in Unit B. Unit A has 30 people and Unit B has 600. What should you note before comparing?",
  "Unit A's rate rests on about six leavers, so it is volatile",
  ["Unit A clearly has a retention problem that needs urgent action",
   "Unit B's rate is more worrying because of its much larger size",
   "The two rates can't be compared at all because of the size gap"],
  "Small populations create unstable rates. A few leavers move the percentage a lot.")

Q('ana',3,'any',"The CHRO wants to predict which employees are likely to resign. What is the most important ethical safeguard?",
  "Use it to improve conditions, never to penalise individuals",
  ["Make sure the model is more than 90% accurate before use",
   "Tell every employee their own individual flight-risk score",
   "Include as many personal data fields as possible in it"],
  "Flight-risk models can lead to unfair treatment. Purpose limits and governance matter more than accuracy alone.")

Q('ana',3,'any',"Overall, women have higher promotion rates than men in a company. In every department, men have higher rates. What explains this?",
  "Women are concentrated in departments that promote more",
  ["A calculation error somewhere in the department figures",
   "Promotion rates in small departments are too unreliable",
   "Company-level data is more reliable than department data"],
  "Aggregation across groups with different base rates can reverse a pattern. Department-level comparison is the relevant one here.")

Q('ana',3,'any',"A manager asks for a report of employees with the most sick days to 'see who is abusing leave'. What should HR do?",
  "Share absence patterns and support policy-based conversations",
  ["Provide the list of employees ranked by number of sick days",
   "Refuse entirely, since all sick leave data is confidential",
   "Provide the ranked list with employee names removed from it"],
  "Health-related data needs proportionate use. Ranking employees invites unfair assumptions.")

Q('ana',4,'any',"An engagement score rose from 68 to 71. The response rate fell from 82% to 55%. How should you report it?",
  "Flag that the rise may reflect who chose to respond",
  ["Report a three-point improvement in engagement this year",
   "Report a fall in engagement because fewer people responded",
   "Exclude the result until the response rate recovers again"],
  "Lower participation can bias results toward more engaged staff. Transparency about the limitation is essential.")

Q('ana',4,'any',"You build a model that predicts high performers using hiring data. It weights postcode heavily. What is the concern?",
  "Postcode can act as a proxy for protected characteristics",
  ["Postcode data changes too often to be useful in a model",
   "The model will become too complex to explain to anyone",
   "Employees may move house soon after they have been hired"],
  "Seemingly neutral variables can encode bias. Proxies must be tested and removed if unjustified.")

Q('ana',4,'any',"An HR data warehouse has three different 'department' fields from different systems. Analysts choose different ones. What is the lasting fix?",
  "One governed hierarchy with an owner, mapped to all systems",
  ["Train every analyst on which of the three fields to use",
   "Delete two of the fields and keep the most complete one",
   "Use whichever field happens to match the finance reports"],
  "Master data needs a single definition and owner. Training and ad hoc choices don't stop divergence.")

Q('ana',5,'any',"Leadership wants one 'people health' KPI for the board. What is the strongest design?",
  "A few defined leading and lagging indicators tied to strategy",
  ["A single composite index that weights all of the HR metrics",
   "Voluntary turnover alone, since it is easy for all to understand",
   "The engagement score alone, since it predicts most outcomes"],
  "A single number hides trade-offs. A few defined indicators linked to strategy inform decisions better.")

Q('ana',5,'any',"A people analytics team produces many dashboards, but leaders rarely change decisions. What is the most likely issue?",
  "The analysis starts from data, not from leaders' decisions",
  ["The dashboards are not visually appealing enough for leaders to use",
   "Leaders lack the data literacy to read the dashboards",
   "The data is not refreshed often enough to be trusted"],
  "Impact comes from answering decision-relevant questions. Data-led outputs often miss them.")

# ---------------- HRBP, STRATEGY & LEADERSHIP (str) ----------------
Q('str',1,'any',"A manager asks HR to 'run a team-building event' because the team is not working well together. What should an HR business partner do first?",
  "Explore what is really going wrong before agreeing a fix",
  ["Book the event, since the manager knows the team best of all",
   "Suggest a personality assessment for the whole team",
   "Recommend the manager attends a leadership course"],
  "Good partnering diagnoses the problem before prescribing a solution.")

Q('str',1,'any',"What best describes an HR business partner's role?",
  "Aligning people decisions with business goals",
  ["Processing HR transactions for a business unit",
   "Representing employees in disputes with management",
   "Enforcing HR policies across the whole business"],
  "HRBPs advise and align. Transactions and enforcement sit elsewhere in a mature model.")

Q('str',1,'any',"A leader asks for an urgent restructure proposal by tomorrow. What should an HRBP clarify first?",
  "The business problem the restructure must solve",
  ["The budget available for any redundancy costs",
   "Which employees the leader wants to keep on",
   "The template HR uses for restructure papers"],
  "Structure follows purpose. Without the objective, the proposal may solve the wrong problem.")

Q('str',2,'any',"A business leader rejects an HR policy as 'too slow'. What is the most effective HRBP response?",
  "Find the specific pain point and a compliant way to meet it",
  ["Explain that the policy must be followed in every case",
   "Grant an exception so that the leader stays satisfied",
   "Escalate the issue to the HR director for a decision"],
  "Partnering means solving within the boundaries, not defending the process or bypassing it.")

Q('str',2,'any',"Which is the best evidence that an HR initiative created business value?",
  "A measurable change in the business outcome it targeted",
  ["High participation and satisfaction scores from employees",
   "Positive feedback from the senior leadership team",
   "Delivery of the initiative on time and within budget"],
  "Participation and delivery measure activity. Value shows in the outcome targeted.")

Q('str',2,'any',"Two business leaders want the same scarce talent budget. How should an HRBP help?",
  "Frame options against priorities so leaders decide on trade-offs",
  ["Split the budget equally between the two business leaders' units",
   "Give the budget to whichever leader's request is most urgent",
   "Decide based on which of the two units has higher attrition"],
  "HR facilitates a priority-based decision. Equal splits and urgency rarely reflect strategy.")

Q('str',3,'any',"A CEO wants to adopt a competitor's unlimited leave policy. What is the strongest HR advice?",
  "Test fit with culture and workload; it can reduce leave taken",
  ["Adopt it now, since it will clearly help attract new talent",
   "Reject it, since it is far too risky to manage in practice",
   "Pilot it in every department at once to get quick results"],
  "Policies don't transplant automatically. Context and second-order effects decide success.")

Q('str',3,'any',"Leaders keep escalating routine people decisions to HR. What should an HR leader do?",
  "Clarify decision rights and build managers' capability",
  ["Take the decisions to keep the business moving quickly",
   "Refuse escalations and send managers back to the policy",
   "Add more HR staff to handle the volume of escalations"],
  "Escalation habits come from unclear authority or low capability. Fixing both moves decisions to the right level.")

Q('str',3,'any',"An organisational design proposal adds two management layers to 'create career paths'. What is the main concern?",
  "Extra layers slow decisions and add cost for little gain",
  ["Many employees may not actually want to become managers",
   "Each new role will need a new job description written",
   "Managers' salaries are higher than individual contributors'"],
  "Structure should serve work. Layers added for progression often create bureaucracy.")

Q('str',3,'any',"A business is about to expand into a new market. When should HR be involved?",
  "At the planning stage, to shape the key assumptions",
  ["After the decision is made, to recruit the new team",
   "When the first hires for the new market are needed",
   "Only if the new market has complex labour laws"],
  "Early HR involvement shapes feasibility and cost, not just execution.")

Q('str',4,'any',"Engagement is high but productivity is flat. Leadership asks HR why. What is the most insightful line of enquiry?",
  "Whether goals, decision rights and work design enable output",
  ["Whether engagement is being measured incorrectly by the survey",
   "Whether productivity will simply follow engagement after a delay",
   "Whether employees are engaged but lack the necessary skills"],
  "Engaged people can still be blocked by unclear goals, poor processes or structure.")

Q('str',4,'any',"A change programme is on schedule, but adoption of the new way of working is low. What is the most likely gap?",
  "Line managers aren't equipped or accountable to lead it",
  ["Communications about the change were not frequent enough",
   "The training sessions provided were too short to be useful",
   "Employees are generally resistant to all kinds of change"],
  "Adoption depends heavily on line managers. Communications and training alone rarely shift behaviour.")

Q('str',4,'any',"The executive team disagrees on whether to centralise HR. What should the CHRO bring to the discussion?",
  "Explicit criteria, options assessed against them, and a view",
  ["A benchmark of what similar companies in the sector have done",
   "A preferred option together with a detailed implementation plan",
   "A survey of HR staff asking which model they would prefer"],
  "Decision quality improves with explicit criteria and options. Benchmarks and preferences alone don't resolve disagreement.")

Q('str',4,'any',"A strong leader is promoted but their new team's engagement drops 20 points in six months. What should HR do?",
  "Targeted feedback and coaching on specific behaviours",
  ["Wait for the team to adjust to the new leader's style",
   "Move the leader back into their previous role quickly",
   "Run a team-building event for the leader's new team"],
  "Specific, evidence-based development addresses the cause early, before attrition follows.")

Q('str',5,'any',"A company's strategy shifts from growth to profitability. Which HR priority shift is most aligned?",
  "Productivity and role clarity over headcount growth",
  ["Faster hiring to protect the company's market share",
   "A richer benefits package to retain the current staff",
   "More leadership development for every manager"],
  "HR priorities should mirror strategy. Profitability favours productivity and efficient capability.")

Q('str',5,'any',"Two years after a culture programme, values posters are everywhere but behaviour hasn't changed. What was most likely missing?",
  "Rewards, promotions and consequences that match the values",
  ["More frequent communication of the values across the company",
   "Values workshops attended by every employee in the business",
   "A new and simpler set of values that is easier to remember"],
  "People follow what is rewarded and tolerated. Systems must reinforce stated values.")

Q('str',5,'any',"The board asks how the HR function itself will improve its effectiveness. What should anchor the plan?",
  "The business outcomes HR must enable, turned into HR targets",
  ["A maturity-model benchmark of recognised HR best practice",
   "A multi-year HR technology roadmap and investment plan",
   "Feedback from the HR team itself on what its priorities are"],
  "Effectiveness is judged by contribution to business outcomes. Models and technology are means, not anchors.")

# ---------------- UAE EMPLOYMENT LAW & PRACTICE (law, region uae) ----------------
# Facts reflect Federal Decree-Law No. 33 of 2021 and Cabinet Resolution No. 1 of 2022 as commonly applied in private-sector mainland employment.
Q('law',1,'uae',"Under UAE private-sector labour law, what is the maximum probation period?",
  "6 months",
  ["3 months", "9 months", "12 months"],
  "Probation may not exceed six months, and an employee can only be placed on probation once with the same employer.", f=['life','ops'])

Q('law',1,'uae',"How many days of paid annual leave is a private-sector employee entitled to after completing one year of service?",
  "30 calendar days",
  ["21 working days", "24 calendar days", "30 working days"],
  "The entitlement is 30 days per year after one year of service.", f=['life','pay'])

Q('law',1,'uae',"An employer wants to end an employee's employment during probation. What minimum written notice must be given?",
  "14 days",
  ["7 days", "30 days", "1 month"],
  "An employer terminating during probation must give at least 14 days' written notice.", f=['life','er'])

Q('law',1,'uae',"Can a private-sector employer keep an employee's passport as a condition of employment?",
  "No, employers may not keep employees' official documents",
  ["Yes, provided the employee signs a written consent form",
   "Yes, but only during the probation period of the contract",
   "Yes, where the employer has paid for the employee's visa"],
  "Employers are prohibited from confiscating employees' official documents.", f=['ops','er'])

Q('law',1,'uae',"What is the paid maternity leave entitlement for a private-sector employee?",
  "60 days: 45 at full pay and 15 at half pay",
  ["45 days, all of them at full pay",
   "60 days, all of them at full pay",
   "90 days: 60 at full pay and 30 at half pay"],
  "Maternity leave is 60 days, with 45 at full pay and 15 at half pay.", f=['life','pay'])

Q('law',2,'uae',"What is the gratuity rate for the first five years of continuous service?",
  "21 days of basic wage for each year",
  ["30 days of basic wage for each year",
   "21 days of total wage for each year",
   "15 days of basic wage for each year"],
  "Gratuity is 21 days' basic wage per year for the first five years, and 30 days per year after that.", f=['pay'])

Q('law',2,'uae',"An employee resigns after 11 months of continuous service. Are they entitled to end-of-service gratuity?",
  "No, at least one year of continuous service is required",
  ["Yes, pro-rated for the 11 months at 21 days per year",
   "Yes, but only if the full notice period is worked",
   "Yes, but at half of the normal statutory rate"],
  "Entitlement starts after completing one year of continuous service.", f=['pay','life'])

Q('law',2,'uae',"How is paid sick leave structured after probation, per year of service?",
  "Up to 90 days: 15 full pay, 30 half pay, 45 unpaid",
  ["Up to 45 days: 15 full pay and 30 half pay",
   "Up to 90 days: 30 full pay, 30 half pay and 30 unpaid",
   "Up to 60 days: 30 full pay and 30 half pay"],
  "Sick leave can total 90 days a year: 15 full pay, 30 half pay, 45 unpaid.", f=['life','pay'])

Q('law',2,'uae',"What is the minimum overtime rate for ordinary overtime hours outside 10 pm to 4 am?",
  "Normal hourly wage plus at least 25%",
  ["Normal hourly wage plus at least 50%",
   "Normal hourly wage with no premium",
   "Basic hourly wage plus 100%"],
  "Ordinary overtime is paid at the normal hourly wage plus at least 25%; work between 10 pm and 4 am attracts at least 50% (except shift workers).", f=['pay'])

Q('law',2,'uae',"What range of notice period may a UAE private-sector employment contract specify?",
  "Between 30 and 90 days",
  ["Between 14 and 60 days",
   "Exactly 30 days for all employees",
   "Between 30 and 180 days"],
  "The notice period must be at least 30 days and no more than 90 days.", f=['life','er'])

Q('law',2,'uae',"Who must subscribe to the UAE involuntary loss of employment (ILOE) insurance scheme?",
  "Eligible employees themselves",
  ["The employer, for all employees",
   "Only UAE nationals in the private sector",
   "Only employees above a salary threshold"],
  "ILOE subscription is an obligation on eligible employees; certain categories are exempt.", f=['ops'])

Q('law',3,'uae',"An employee in probation resigns to join another UAE employer. What notice must they give?",
  "At least one month",
  ["At least 14 days",
   "No notice is needed during probation",
   "The full contractual notice period"],
  "Moving to another UAE employer during probation requires at least one month's notice; leaving the UAE requires at least 14 days.", f=['life','er'])

Q('law',3,'uae',"Within how many days of contract end must end-of-service dues be paid?",
  "14 days",
  ["7 days", "30 days", "On the next payroll date"],
  "End-of-service entitlements are due within 14 days of the end of the contract.", f=['pay','life'])

Q('law',3,'uae',"An employee had 20 days of unpaid leave during their service. How does this affect gratuity?",
  "The unpaid days are left out of the service period",
  ["Gratuity is reduced by 20 days' total wage",
   "There is no effect at all, since employment continued",
   "Gratuity uses the average wage of paid months only"],
  "Days of unpaid absence are not counted in the service period for gratuity.", f=['pay'])

Q('law',3,'uae',"Under the current law, does resigning reduce an employee's gratuity compared with termination by the employer?",
  "No, the gratuity is calculated the same way",
  ["Yes, resigning before five years reduces it by one third",
   "Yes, resigning before three years removes it entirely",
   "Yes, unless the employee serves the full notice period"],
  "The reduction for resignation under the previous law no longer applies; gratuity is calculated the same way.", f=['pay','life'])

Q('law',3,'uae',"An employee's annual leave was not taken. On termination, how is unused leave generally paid?",
  "As cash in lieu, calculated on the basic wage",
  ["As cash in lieu, calculated on the total wage",
   "It is forfeited if not taken before termination",
   "It is added to the notice period instead of paid"],
  "Unused leave is paid on termination, calculated on the basic wage.", f=['pay','life'])

Q('law',3,'uae',"How long after the end of employment does an employee have to bring a labour claim?",
  "Two years from the end of the contract",
  ["One year from the end of the contract",
   "Six months from the end of the contract",
   "There is no time limit for such claims"],
  "Since Federal Decree-Law No. 9 of 2024 (effective 31 August 2024), claims can be brought within two years of the end of employment. The earlier limit was one year.", f=['er','ops'])

Q('law',4,'uae',"A non-compete clause is being drafted. What is the maximum period it may restrict the employee after the contract ends?",
  "Two years",
  ["One year", "Six months", "Three years"],
  "Non-compete restrictions may not exceed two years after the end of the contract and must be reasonable in scope.", f=['er','str'])

Q('law',4,'uae',"What is the overall cap on end-of-service gratuity?",
  "Two years' wage",
  ["One year's wage", "Three years' wage", "There is no cap"],
  "Total gratuity may not exceed the equivalent of two years' wage.", f=['pay'])

Q('law',4,'uae',"A manager wants to deduct the cost of a recruitment agency fee from a new hire's salary. What is the correct position?",
  "Not permitted; recruitment costs can't be charged to the worker",
  ["Permitted if the employee agreed to it in the signed offer letter",
   "Permitted, but only up to one month of the basic wage",
   "Permitted if the employee leaves within the first year"],
  "Employers may not charge workers recruitment or employment fees.", f=['tal','pay'])

Q('law',4,'uae',"An employee is required to work on their rest day and cannot be given a substitute day. What is the minimum compensation?",
  "Basic wage for the day plus at least 50%",
  ["Normal daily wage with no premium",
   "Total wage plus 25%",
   "A substitute day within the following year"],
  "Without a substitute rest day, work on the rest day earns the basic wage plus at least 50%.", f=['pay'])

Q('law',4,'uae',"An employer wants to place a returning employee (rehired after 8 months away) on probation again. Is this allowed?",
  "No, probation is allowed only once with the same employer",
  ["Yes, because a brand-new employment contract has been signed",
   "Yes, but the probation is limited to three months",
   "Yes, provided the employee's role has changed since"],
  "The law allows probation only once with the same employer.", f=['life'])

Q('law',5,'uae',"A company with 60 employees uses two legal entities. HR wants to treat them as one for gratuity continuity after transfers. What is the key question?",
  "Whether prior service was settled or expressly carried over",
  ["Whether both entities share the same trade licence activity",
   "Whether the employee's job title changed when transferring",
   "Whether the transfer took place within the same emirate"],
  "Continuity depends on employer identity and how prior service was settled or carried over, which should be documented.", f=['pay','ops'])

Q('law',5,'uae',"An employee works 5 years 6 months, with a basic wage of AED 10,000. Which approach to the gratuity is correct?",
  "21 days × 5 years, plus 30 days × 0.5 year",
  ["21 days × 5.5 years on the daily basic wage",
   "30 days × 5.5 years on the daily basic wage",
   "21 days × 5 years; part-years don't count"],
  "The first five years accrue at 21 days, the remaining half-year at 30 days per year, and part-years count pro rata.", f=['pay'])

Q('law',3,'uae',"Under the Wage Protection System rules in force from 1 June 2026, when are wages for a calendar month due?",
  "On the first day of the following month",
  ["On the last working day of the same month",
   "Within 15 days after the end of the month",
   "On the date stated in each employment contract"],
  "Ministerial Resolution No. 340 of 2026 set a single due date: wages for a month are due on the first day of the next Gregorian month.", f=['pay','ops'])

Q('law',4,'uae',"Under the WPS rules effective 1 June 2026, what share of total wages due must an establishment transfer by the due date to be treated as compliant?",
  "At least 85%",
  ["At least 80%", "At least 75%", "The full 100%"],
  "Resolution No. 340 of 2026 raised the compliance threshold to 85% of wages due, from 80% under the previous resolution.", f=['pay','ops'])

Q('law',4,'uae',"A MOHRE-licensed employer delays wages past the due date under the 2026 WPS rules. From around which day after the due date may MOHRE suspend new work permits?",
  "The fifth day",
  ["The second day", "The fifteenth day", "The thirtieth day"],
  "Monitoring starts the day after the due date, warnings may follow from day 2, and new work permits may be suspended from day 5, with stronger measures later.", f=['pay','ops'])

Q('law',4,'uae',"A labour claim worth AED 38,000 has been decided by MOHRE. How is that decision treated under the 2024 amendments?",
  "It can be enforced directly, like a court order",
  ["It is advisory until confirmed by the Court of Appeal",
   "It is final, with no route to challenge it in any court",
   "It must be re-filed with the court before it can be enforced"],
  "Since August 2024, MOHRE decisions on claims up to AED 50,000 have the force of a writ of execution, and challenges go to the Court of First Instance.", f=['er','ops'])
