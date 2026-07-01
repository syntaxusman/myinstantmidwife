const crypto = require('crypto');
const path = require('path');

require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');

const app = express();
const port = process.env.PORT || 3000;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = stripeSecretKey && !stripeSecretKey.includes('your_secret_key_here')
    ? Stripe(stripeSecretKey)
    : null;

const courses = {
    biomechanics: {
        title: 'Biomechanics in Labour',
        amount: 1999,
        currency: 'gbp',
        fileName: 'MIM-Biomechanics-in-Labour.pdf',
        downloadName: 'MIM_Biomechanics_in_Labour.pdf'
    },
    babymoon: {
        title: 'The Baby Moon',
        amount: 1999,
        currency: 'gbp',
        fileName: 'MIM-Baby-Moon-40-Days.pdf',
        downloadName: 'MIM_Baby_Moon_40_Days.pdf'
    },
    hypnobirthing: {
        title: 'Hypnobirthing',
        amount: 1999,
        currency: 'gbp',
        fileName: 'MIM-Hypnobirthing-Course.pdf',
        downloadName: 'MIM_Hypnobirthing_Course.pdf'
    }
};

const downloadTokens = new Map();
const tokenTtlMs = 30 * 60 * 1000;

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/pdf', (req, res) => {
    res.status(403).send('PDF downloads require a successful payment.');
});

app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/faq.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'faq.html'));
});

function getCourseOrSendError(courseId, res) {
    const course = courses[courseId];
    if (!course) {
        res.status(400).json({ error: 'Invalid course selected.' });
        return null;
    }
    return course;
}

function requireStripe(res) {
    if (!stripe || !stripePublishableKey || stripePublishableKey.includes('your_publishable_key_here')) {
        res.status(500).json({ error: 'Stripe is not configured. Add sandbox keys to .env and restart the server.' });
        return false;
    }
    return true;
}

function clearExpiredTokens() {
    const now = Date.now();
    for (const [token, details] of downloadTokens.entries()) {
        if (details.expiresAt <= now) downloadTokens.delete(token);
    }
}

app.get('/api/stripe-config', (req, res) => {
    if (!stripePublishableKey || stripePublishableKey.includes('your_publishable_key_here')) {
        res.status(500).json({ error: 'Stripe publishable key is not configured.' });
        return;
    }

    res.json({ publishableKey: stripePublishableKey });
});

app.post('/api/create-payment-intent', async (req, res) => {
    if (!requireStripe(res)) return;

    const { courseId, customer } = req.body || {};
    const course = getCourseOrSendError(courseId, res);
    if (!course) return;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: course.amount,
            currency: course.currency,
            automatic_payment_methods: { enabled: true },
            metadata: {
                courseId,
                courseTitle: course.title
            },
            receipt_email: customer && customer.email ? customer.email : undefined
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Unable to start payment.' });
    }
});

app.post('/api/create-download-token', async (req, res) => {
    if (!requireStripe(res)) return;

    const { paymentIntentId } = req.body || {};
    if (!paymentIntentId) {
        res.status(400).json({ error: 'Payment confirmation is missing.' });
        return;
    }

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const courseId = paymentIntent.metadata && paymentIntent.metadata.courseId;
        const course = getCourseOrSendError(courseId, res);
        if (!course) return;

        if (paymentIntent.status !== 'succeeded') {
            res.status(402).json({ error: 'Payment was not successful.' });
            return;
        }

        clearExpiredTokens();

        const token = crypto.randomBytes(32).toString('hex');
        downloadTokens.set(token, {
            courseId,
            expiresAt: Date.now() + tokenTtlMs
        });

        res.json({ downloadUrl: `/api/download/${token}` });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Unable to verify payment.' });
    }
});

app.get('/api/download/:token', (req, res) => {
    clearExpiredTokens();

    const tokenDetails = downloadTokens.get(req.params.token);
    if (!tokenDetails) {
        res.status(403).send('This download link is invalid or has expired.');
        return;
    }

    const course = courses[tokenDetails.courseId];
    if (!course) {
        res.status(404).send('Course file not found.');
        return;
    }

    const pdfPath = path.join(__dirname, 'pdf', course.fileName);
    res.download(pdfPath, course.downloadName);
});

app.listen(port, () => {
    console.log(`My Instant Midwife is running at http://localhost:${port}`);
});
