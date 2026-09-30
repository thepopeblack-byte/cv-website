"""Regenerate the public, two-page recruiter CV from reviewed website copy."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "kayode-popoola-cv.pdf"
INK = colors.HexColor("#17191c")
MUTED = colors.HexColor("#575b60")
ACCENT = colors.HexColor("#1f4fd1")


styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=INK, spaceAfter=3),
    "title": ParagraphStyle("title", fontName="Helvetica", fontSize=10.5, leading=15, textColor=MUTED, spaceAfter=8),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.4, leading=12, textColor=ACCENT, spaceAfter=6),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=INK, spaceBefore=12, spaceAfter=6),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.2, leading=12.5, textColor=INK, spaceBefore=7, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=8.65, leading=12.7, textColor=INK, spaceAfter=4),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=8.5, leading=12.2, textColor=INK, leftIndent=11, firstLineIndent=-7, spaceAfter=3),
    "note": ParagraphStyle("note", fontName="Helvetica", fontSize=7.8, leading=11, textColor=MUTED, spaceAfter=4),
    "link": ParagraphStyle("link", fontName="Helvetica", fontSize=8, leading=11.5, textColor=ACCENT, spaceAfter=4),
}


def para(text, kind="body"):
    return Paragraph(text, styles[kind])


def heading(title):
    return [para(title.upper(), "section"), HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#d6d9dc")), Spacer(1, 5)]


def role(title, period, bullets):
    block = [para(f"{title} <font color='#575b60'>| {period}</font>", "role")]
    block.extend(para(f"&#8226; {bullet}", "bullet") for bullet in bullets)
    return KeepTogether(block)


def page_footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d6d9dc"))
    canvas.line(18 * mm, 15 * mm, A4[0] - 18 * mm, 15 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(18 * mm, 10.5 * mm, "Kayode Popoola | Public recruiter CV | September 2026")
    canvas.drawRightString(A4[0] - 18 * mm, 10.5 * mm, str(document.page))
    canvas.restoreState()


story = [
    para("Kayode Popoola <font color='#575b60'>/ Popeblack</font>", "name"),
    para("Blockchain intelligence and global commercial leadership | CipherOwl / Secret Network Foundation", "title"),
    para("<link href='mailto:thepopeblack@gmail.com'>thepopeblack@gmail.com</link>  |  <link href='https://www.linkedin.com/in/thepopeblack'>LinkedIn</link>  |  <link href='https://www.popeblack.com/impact'>Work &amp; Evidence</link>  |  Global / remote", "contact"),
    *heading("Executive profile"),
    para("I work in blockchain intelligence and financial-crime analysis at CipherOwl while leading global sales and partnerships for privacy-focused blockchain and AI infrastructure at Secret Network Foundation. My commercial work connects prospects, teams and markets; my investigative work applies transaction research, OSINT and careful attribution to digital-asset risk. Both tracks are current."),
    *heading("Selected current work"),
    role("CipherOwl Inc. - Blockchain Intelligence Analyst", "Mar 2026-present", [
        "Analyse transaction patterns, address/entity relationships and potential financial-crime typologies using on-chain and open-source evidence.",
        "Capture URLs, timestamps, screenshots and attribution rationale in defensible reports; client cases and outcomes remain confidential.",
    ]),
    role("Secret Network Foundation - Head of Sales & Business Development", "Mar 2026-present", [
        "Lead international sales and business development, sourcing prospects and developing enterprise and ecosystem opportunities for privacy-focused infrastructure.",
        "Advance negotiation, activation and implementation with Foundation, product and technical colleagues; do not claim sole closure of team partnerships.",
    ]),
    role("Secret Network - Business Development Manager / Associate", "Apr 2024-Mar 2026", [
        "Progressed from Associate to Manager, sourcing leads, introducing prospects, building relationships and advancing partnership opportunities with colleagues before promotion.",
        "Foundation reports document international partnerships and builder support across 2024-25; they do not assign each named deal to me individually.",
    ]),
    role("Secret Network Africa - Lead", "Feb 2022-Dec 2024 | part-time", [
        "Developed regional education, university and developer relationships within a broader global ecosystem.",
        "The Foundation's Q2 2024 report names Popeblack for 12 weeks of Zero-to-Hero workshops; the wider Growth and DevRel team reported 38 developers onboarded.",
    ]),
    *heading("Nested Secret ecosystem project"),
    role("Fina / Fina Cash - Product and community growth project", "Jun 2023-Apr 2025 | overlapping project", [
        "Supported community, product and social marketing, user acquisition, campaigns, partnerships and wallet, card and staking adoption while also working with Secret.",
        "The Foundation's H2 2024 report records a $60,000 grant, mainnet launch and first customers for Fina P2P; this is product proof, not a personal grant or Foundation-revenue claim.",
    ]),
    PageBreak(),
    para("Kayode Popoola <font color='#575b60'>/ Popeblack</font>", "name"),
    para("Programmes, selected relationships and public evidence", "title"),
    *heading("Selected programmes and engagements"),
    role("Cosmos Hub Nigeria / Naija HackATOM - Founder & programme lead", "independent initiative", [
        "Led programme design, local partnerships and multi-city developer activation in Nigeria.",
        "ATOM Accelerator's public record names Cosmos Nigeria/Popeblack and records $27,250 approved. The programme reports 500+ attendees and 50+ submissions; these are not Secret developer totals.",
    ]),
    role("WhisperNode - Ecosystem communications engagement", "descriptive role", [
        "Managed social and community communications, outreach and partner support across validated networks; co-published WhisperNode Weekly issues credited to WhisperNode &amp; Popeblack.",
    ]),
    para("<link href='https://whispernodeweekly.beehiiv.com/p/this-week-in-cosmos-with-whispernode-1981'>Co-credited WhisperNode Weekly</link>  |  <link href='https://forum.cosmos.network/t/atom-accelerator-dao-transparency-report-9/15449'>Cosmos funding approval</link>  |  <link href='https://forum.cosmos.network/t/building-the-now-of-cosmos-hub-in-africa/15421'>Programme report</link>", "link"),
    *heading("Earlier commercial foundation"),
    role("Jumia Group - Senior Sales Consultant", "Jun 2015-Dec 2021", [
        "Worked across customer acquisition, product adoption, client service and cross-functional sales execution.",
    ]),
    role("QuickTech Media - Graphics Editor / Creative Production Lead", "Jan 2016-Jan 2022 | part-time", [
        "Coordinated creative production, photography, design and stakeholder delivery for educational print projects.",
    ]),
    *heading("Writing and independent coverage"),
    para("<b>Bylined analysis:</b> 'Inside the Hunt for the Bybit Billion: What Happens After Crypto Theft?' - Hacken, 4 September 2026. <link href='https://hacken.io/discover/tracing-bybit-billion/'>Read original</link>. This is separate from earlier Bybit affiliate marketing and is not a CipherOwl client deliverable."),
    para("<b>Independent profile:</b> 'From Community Builder to Blockchain Investigator: Popeblack's Web3 Journey' - Jillian Godsil, Blockleaders, 25 September 2026. <link href='https://blockleaders.io/popeblacks-web3-journey/'>Read original</link>."),
    *heading("Credentials and speaking"),
    para("BBA, Business Administration and Management - Bayero University, Kano. Verifiable Sumsub training covers AML, transaction monitoring, KYC, business verification, the Travel Rule and fraud prevention. Training is not presented as years of investigative case experience."),
    para("Recorded speaking includes Argentina's Encryption Day and Web3 Lagos. Cybertech Africa's official <link href='https://africa.cybertechconference.com/speakers'>speaker listing</link> names Pope Black. Details and verification links appear at <link href='https://www.popeblack.com/expertise'>popeblack.com/expertise</link>.", "link"),
    *heading("Public evidence index"),
    para("<link href='https://framerusercontent.com/assets/njSofqEShz6VOC0sURkbP6bSNI.pdf'>Secret Q2 2024, pp. 15 and 30</link> - named 12-week workshop contribution and separate Growth/DevRel team result. <link href='https://framerusercontent.com/assets/3SHhbm2N5wWauDuOZFghfSazg.pdf'>Secret H2 2024, p. 30</link> - Fina P2P grant and launch.", "link"),
    para("<link href='https://www.popeblack.com/impact'>Work &amp; Evidence</link> - personal work, team outcomes, source links and limits of attribution across Secret, Fina, Cosmos and CipherOwl.", "link"),
    para("Revenue, deal, affiliate and product-growth figures awaiting Finance, CRM or product-analytics confirmation are not stated in this public CV.", "note"),
]


doc = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm,
    topMargin=16 * mm, bottomMargin=20 * mm,
    title="Kayode Popoola - Public Recruiter CV", author="Kayode Popoola",
)
doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
print(OUTPUT)
