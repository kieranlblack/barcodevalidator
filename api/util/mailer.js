// eslint-disable-next-line
const dotenv = require('dotenv').config();

const MailListener = require('mail-listener4');

const { checkSheet } = require('../util/sheetChecker');

const mailListener = new MailListener({
    username: process.env.IMAP_USER,
    password: process.env.IMAP_PASSWORD,
    host: process.env.IMAP_HOST,
    port: process.env.IMAP_PORT,
    tls: true,
    debug: console.log,
    tlsOptions: { rejectUnauthorized: false },
    mailbox: 'INBOX',
    searchFilter: ['UNSEEN', 'FLAGGED'],
    markSeen: true,
    mailParserOptions: { streamAttachments: true },
    attachments: true,
    attachmentOptions: { stream: true },
});

mailListener.start();

mailListener.on('attachment', (attachment) => {
    console.log(attachment.path);
    checkSheet(attachment);
});

mailListener.on('error', err => console.log(new Error(err)));
