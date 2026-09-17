# ProtoMind Compliance Suite

Build a polished, hackathon-ready React frontend prototype called ProtoMind.

PRODUCT

ProtoMind is an AI-powered Government Tender Compliance & Risk Intelligence Platform.

Core workflow:

Tender/Bid Documents → Document Extraction → Requirement Matching → Rule Validation → AI Analysis → Risk Assessment → Explainable Results → Compliance Report → Audit Trail

This is an SIH-style GovTech prototype.

IMPORTANT:

Build the FRONTEND and frontend data/service architecture.

Do NOT build a Python backend inside Lovable.

Do NOT use Streamlit.

Do NOT implement blockchain, Web3, smart contracts, cryptocurrency or any blockchain feature.

Do NOT spend effort on live government API integrations.

Use realistic mock data and mock API services so the complete UI can be demonstrated.

Structure the code so a separate FastAPI backend can replace the mock services later.

The project will later be opened in TRAE IDE, where the backend and real processing pipeline will be implemented.

TECH STACK

Use:

React

Vite

TypeScript

Tailwind CSS

shadcn/ui

React Router

Recharts

Axios

Lucide icons

Do NOT use Streamlit.

Keep components modular and clean.

DESIGN GOAL

The application should look like a serious modern GovTech / enterprise procurement platform, not a generic AI website.

Design characteristics:

Professional

Clean

Minimal

Trustworthy

Data-focused

Modern

Responsive

Desktop-first

Primary demo resolution:

1366 × 768

Use a light professional interface with:

neutral/light backgrounds

dark readable typography

subtle borders

rounded cards

restrained shadows

clear spacing

professional charts

Status colors:

Green = Compliant

Red = Non-Compliant

Amber = Review Required

Neutral/Blue = Information

Avoid:

excessive gradients

excessive animations

cartoon illustrations

flashy AI effects

unnecessary decorative elements

BRAND

Application name:

PROTOMIND

Subtitle:

AI-Powered Tender Compliance & Risk Intelligence

Core message:

From Unstructured Tender Documents to Explainable, Auditable Compliance Intelligence.

Create a simple professional text/icon logo.

APPLICATION STRUCTURE

Create these routes:

/login
/dashboard
/tenders
/tenders/:id
/tenders/:id/upload
/analysis/:id
/requirements/:id
/documents
/reports
/audit-log
/settings


Use React Router.

Create a persistent sidebar after login.

Sidebar:

PROTOMIND

Dashboard
Tenders
Bids
Documents
Compliance
Reports
Audit Trail
Settings


Bottom of sidebar:

Procurement Officer
Demo User


LOGIN PAGE

Create a polished login page.

Show:

PROTOMIND

AI-Powered Tender Compliance & Risk Intelligence

Fields:

Email

Password

Buttons:

Sign In

Login as Procurement Officer

Login as Bidder

For now use mocked authentication.

Successful login should navigate to /dashboard.

DASHBOARD

Create a professional procurement compliance dashboard.

Header:

Good Morning

Procurement Compliance Dashboard

Subtitle:

Monitor tender submissions, compliance findings and risk.

KPI cards:

Active Tenders
12

Bids Analyzed
48

Compliant
31

Review Required
12

High Risk
5


Create a Recharts compliance chart showing:

Compliant

Review Required

Non-Compliant

Create a risk distribution chart.

Create a Recent Tender Analyses table:

Columns:

Tender

Bidder

Requirements

Status

Risk

Last Analyzed

Action

Include realistic demo records.

TENDERS PAGE

Create a searchable/filterable tender table.

Columns:

Tender Number

Title

Organization

Submission Date

Bids

Status

Action

Actions:

View

Analyze

Upload Bid

Add button:

+ Create Tender

Use mock data.

DEMO TENDER

Create a prominent demo tender:

GEM-2026-001

Supply of Computer Systems

Government Procurement Department

Submission Date:
30 September 2026


When opened, show tender details and requirements.

TENDER DETAILS

Show:

Tender number

Title

Organization

Submission date

Description

Status

Then show:

Tender Requirements

Create these 8 requirements:

R001

Valid GST registration.

Category:
Registration

Validation:
Boolean

Mandatory:
Yes

R002

Minimum average annual turnover of ₹2 crore during the preceding three financial years.

Category:
Financial

Validation:
Numeric

Mandatory:
Yes

R003

Minimum 3 years relevant experience.

Category:
Experience

Validation:
Numeric

Mandatory:
Yes

R004

At least 3 similar completed contracts.

Category:
Experience

Validation:
Count

Mandatory:
Yes

R005

Proposed computer systems must satisfy the technical specifications stated in the tender.

Category:
Technical

Validation:
Semantic

Mandatory:
Yes

R006

Required bidder declaration must be submitted and signed.

Category:
Documentation

Validation:
Boolean

Mandatory:
Yes

R007

Required financial statements must be submitted.

Category:
Financial

Validation:
Boolean

Mandatory:
Yes

R008

Relevant bidder registration must be valid on the bid submission date.

Category:
Registration

Validation:
Date

Mandatory:
Yes

Display them in a professional table:

Code
Requirement
Category
Mandatory
Validation Type
Status


DOCUMENT UPLOAD PAGE

Create a polished drag-and-drop uploader.

Heading:

Upload Bid Documents

Text:

Drag and drop documents here.

Supported:

PDF • DOCX • XLSX • JPG • PNG

Create a list of uploaded documents.

Demo documents:

GST_Certificate.pdf
Financial_Statement.pdf
Experience_Certificate.pdf
Similar_Contracts.pdf
Technical_Compliance.pdf
Bidder_Declaration.pdf
Company_Registration.pdf


Show:

file icon

filename

document type

size

processing status

remove button

Processing statuses:

Uploaded

Processing

Extracting

Completed

Failed

Primary button:

ANALYZE BID

Clicking it should navigate to the analysis processing page.

ANALYSIS PROCESSING PAGE

Create a professional analysis progress screen.

Heading:

Analyzing Bid

Show this pipeline:

✓ Documents uploaded
✓ Text extracted
✓ OCR completed
✓ Documents classified
✓ Tender requirements identified
✓ Bidder evidence extracted
✓ Requirements matched
✓ Compliance rules evaluated
✓ AI analysis completed
✓ Risk assessment completed


Use a visually attractive progress indicator.

For the frontend demo, use a short simulated processing sequence.

After completion navigate automatically to:

/analysis/demo-analysis

ANALYSIS RESULT PAGE

This is the MOST IMPORTANT PAGE.

Header:

Compliance Analysis

Tender:

GEM-2026-001

Bidder:

ABC Technologies Pvt. Ltd.

Summary cards:

Requirements Checked
8

Compliant
6

Non-Compliant
1

Review Required
1

Risk Score
37/100


Overall status:

REVIEW REQUIRED

Create a large risk visualization.

DEMO RESULTS

Use exactly these demo results:

R001 GST Registration
COMPLIANT
Risk: Low
Confidence: 96%

R002 Turnover ≥ ₹2 Crore
COMPLIANT
Risk: Low
Confidence: 94%

R003 Experience ≥ 3 Years
NON-COMPLIANT
Risk: High
Confidence: 97%

R004 Similar Contracts ≥ 3
COMPLIANT
Risk: Low
Confidence: 91%

R005 Technical Compliance
REVIEW_REQUIRED
Risk: Medium
Confidence: 71%

R006 Declaration
COMPLIANT
Risk: Low
Confidence: 98%

R007 Financial Document
COMPLIANT
Risk: Low
Confidence: 99%

R008 Registration Validity
COMPLIANT
Risk: Low
Confidence: 95%


Create a professional requirement result table.

Columns:

Requirement

Result

Risk

Confidence

Evidence

Action

Make each row clickable.

REQUIREMENT DETAIL / EVIDENCE VIEW

When a requirement is clicked, show a detail drawer or dedicated detail panel.

For R002 show:

REQUIREMENT R002

Minimum average annual turnover:
₹2 crore

RESULT:
COMPLIANT

EXTRACTED EVIDENCE:
₹2.41 crore average annual turnover

SOURCE:
Financial_Statement.pdf

PAGE:
7

RULE APPLIED:
turnover >= ₹2 crore

CONFIDENCE:
94%

EXPLANATION:
The extracted average annual turnover of
₹2.41 crore exceeds the required minimum
of ₹2 crore.


For R003 show:

REQUIREMENT R003

Minimum relevant experience:
3 years

RESULT:
NON-COMPLIANT

EXTRACTED VALUE:
2 years 4 months

REQUIRED:
3 years

SOURCE:
Experience_Certificate.pdf

PAGE:
2

RULE:
experience >= 3 years

RISK:
HIGH

EXPLANATION:
The extracted relevant experience is below
the minimum requirement.


For R005 show:

REQUIREMENT R005

Technical Specification Compliance

RESULT:
REVIEW REQUIRED

AI CONFIDENCE:
71%

REASON:
Most specifications appear to match, but
processor configuration could not be
confidently verified from the submitted
evidence.

RECOMMENDED ACTION:
Manual procurement officer review.

SOURCE:
Technical_Compliance.pdf

PAGE:
4


Make the evidence view one of the strongest parts of the application.

DOCUMENTS PAGE

Create a document management page.

Columns:

Document

Type

Tender

Processing Status

Uploaded

Confidence

Action

Allow opening document details.

Create a source-document preview placeholder with:

filename

page number

extracted fields

confidence

evidence references

REPORT PAGE

Create a professional report preview.

Header:

PROTOMIND

Tender Compliance Assessment Report

Show:

Tender

Bidder

Analysis Date

Overall Status

Risk Score

Sections:

Executive Summary

Requirement Results

Failed Requirements

Review Required Items

Evidence

Risk Assessment

Human Review Notice

Add:

Download PDF Report

For now this button can download a generated mock report or a frontend-created file.

Keep the interface ready for a future FastAPI/ReportLab endpoint.

AUDIT TRAIL PAGE

Create a timeline-based audit trail.

Example:

18:42:11
Procurement Officer
Uploaded GST_Certificate.pdf

18:42:18
System
OCR completed

18:42:24
System
Requirement R001 evaluated

18:42:27
System
Requirement R002 evaluated

18:42:32
AI Engine
Technical requirement flagged for review

18:42:36
System
Compliance report generated


Display:

timestamp

actor

action

entity

details

Use a professional timeline.

SETTINGS PAGE

Create a simple settings page with:

Profile

Organization

Notification preferences

Analysis preferences

Risk threshold information

Do not build complex settings.

IMPORTANT PRODUCT PRINCIPLE

ProtoMind is NOT a chatbot.

Do not create a chatbot-first interface.

The core experience must be:

Documents
↓
Requirements
↓
Evidence
↓
Rules
↓
Results
↓
Risk
↓
Human Review
↓
Report


An AI explanation panel can exist, but it should not dominate the product.

HUMAN-IN-THE-LOOP

Clearly communicate:

AI assists. Rules validate. Human decides.

For review-required cases, show:

AI-assisted assessment

Human review required before final procurement action.


Do not present the AI as having authority to reject bidders.

FRONTEND SERVICE ARCHITECTURE

Create a clean abstraction such as:

src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
│   ├── api.ts
│   ├── tenderService.ts
│   ├── documentService.ts
│   ├── analysisService.ts
│   └── reportService.ts
├── data/
│   └── demoData.ts
├── types/
└── utils/


The React pages must NOT directly contain all mock data.

Create service functions such as:

getTenders()
getTender(id)
getRequirements(tenderId)
uploadDocuments()
startAnalysis()
getAnalysis()
getRequirementResult()
getAuditLog()
downloadReport()


Initially these services may use local mock data.

Use Axios in a way that allows the base URL to later become:

VITE_API_BASE_URL


The future backend will be FastAPI.

Do NOT hardcode the backend URL throughout components.

TYPES

Create TypeScript interfaces for:

User

Tender

Requirement

Document

ComplianceResult

Evidence

RiskAssessment

AuditEvent

Report

Keep the frontend strongly typed.

DEMO MODE

Include a clear:

Demo Mode

The entire application should work using the fictional:

Tender:
GEM-2026-001

Bidder:
ABC Technologies Pvt. Ltd.


The demo should work without an external backend.

This is essential because the application will later be completed in TRAE.

IMPORTANT FOR LOVABLE

Do not try to build the Python backend.

Do not attempt live OCR.

Do not attempt live government APIs.

Do not implement blockchain.

Do not create unnecessary authentication infrastructure.

Do not over-engineer.

Focus on producing a polished, complete React frontend and clean service abstractions that another developer/AI coding agent can connect to a FastAPI backend.

Before finishing:

Ensure all routes work.

Ensure sidebar navigation works.

Ensure demo data loads.

Ensure upload UI works.

Ensure Analyze Bid works in demo mode.

Ensure result rows open detail views.

Ensure charts render.

Ensure report page works.

Ensure audit trail works.

Ensure no broken buttons.

Ensure no placeholder lorem ipsum.

Ensure TypeScript has no avoidable errors.

Ensure the UI looks excellent at 1366×768.

The final product should look like a credible SIH internal hackathon GovTech prototype.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e1395438-5e73-468f-8373-cc5d3a955892).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
