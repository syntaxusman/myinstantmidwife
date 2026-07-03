# Mailchimp Email Templates

Import these HTML files into Mailchimp as custom templates, then use them in Customer Journeys triggered by the tags added from the website.

Suggested journey triggers:

- `contact-form-request-received.html` -> tag `contact-form`
- `subscription-core-support-welcome.html` -> tag `plan-core-support`
- `subscription-signature-support-welcome.html` -> tag `plan-signature-support`
- `subscription-sustained-support-welcome.html` -> tag `plan-sustained-support`
- `pdf-purchase-confirmation.html` -> tag `pdf-customer` or the course-specific tags

The templates use Mailchimp merge tag `*|FNAME|*` for first-name personalization.
