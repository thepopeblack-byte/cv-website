# UX Measurement Plan

## Current Status

No GA4, Microsoft Clarity, or other third-party analytics implementation was found in the public-site source during this review. This document is an implementation plan only. It does not enable tracking or collect visitor data.

Any future analytics implementation should be approved before installation, follow the privacy notice, avoid personally identifying event properties, and honour applicable consent requirements.

## Recommended Events

| Event | When to record it | Non-identifying properties |
| --- | --- | --- |
| `section_view` | A primary section becomes the viewport-centred active section | `section`, `device_category` |
| `section_complete` | A visitor reaches the final panel or lower boundary of a primary section | `section`, `device_category` |
| `profile_panel_change` | The active Executive Profile panel changes | `panel`, `interaction_type` |
| `case_study_change` | The active institutional case study changes | `case_study`, `interaction_type` |
| `selected_work_change` | The active Selected Work project changes | `project`, `interaction_type` |
| `capability_change` | The active capability changes | `capability`, `interaction_type` |
| `experience_role_change` | The active company or role changes | `company`, `interaction_type` |
| `cta_click` | A primary or secondary CTA is selected | `cta_name`, `location`, `destination_type` |
| `linkedin_click` | A verified LinkedIn link is selected | `location` |
| `book_call_click` | A Calendly action is selected | `location` |
| `email_click` | A direct email action is selected | `location` |
| `contact_form_start` | A visitor first edits a contact-form field | `device_category` |
| `contact_form_submit` | A valid form submission succeeds or fails | `result`, `device_category` |

Record scroll-depth milestones at 25%, 50%, 75%, and 90% with only the milestone and device category. If privacy-appropriate, record whether reduced motion is enabled as a boolean preference, never as a fingerprinting signal.

Recommended `interaction_type` values are `scroll`, `tab`, `previous`, `next`, and `swipe`. Recommended device categories are `mobile`, `tablet`, and `desktop`.

## Evaluation Framework

### Section reach rates

Compare unique sessions reaching Profile, Impact, Expertise, Experience, and the closing Blog/Contact area. A sharp fall between adjacent sections indicates a pacing, relevance, or navigation problem.

### Mobile drop-off and excessive scrolling

Compare mobile section reach, time between primary sections, and scroll-depth completion against desktop. Long dwell with repeated shallow scrolling can indicate that a panel is difficult to discover or that content density remains too high.

### Dead clicks and rage clicks

If an approved session-analysis tool is introduced later, inspect repeated clicks on non-interactive headings, images, capability labels, and progress markers. Do not capture form values, typed text, or other sensitive content.

### CTA engagement

Compare Book a Call, LinkedIn, Email, Blog, Experience, and contact-form engagement by page location. Evaluate whether the hero, header, section content, or footer drives the most qualified action.

### Case-study and capability engagement

Measure panel changes and whether visitors reach the final case study or capability. Low discovery should trigger a review of labels and controls before adding animation.

### Time to reach Experience

Measure elapsed time from the first page view to the first `section_view` for Experience. Review unusually long paths alongside section reach and panel engagement rather than treating duration alone as success.

### Contact-form completion

Compare `contact_form_start` with successful `contact_form_submit`. Record only success or failure, never names, email addresses, company names, message content, or opportunity selections.

## Implementation Guardrails

- Do not send contact-form field values to analytics.
- Do not add user IDs, hashed emails, full IP addresses, or other persistent identifiers.
- Do not enable advertising features by default.
- Do not install session replay without explicit approval and privacy review.
- Treat reduced-motion preference only as an aggregate UX dimension where permitted.
- Document event ownership, retention, consent behaviour, and deletion procedures before launch.
