const { normalizeURL, getURLsFromHtml } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('getURLsfromHtml absolute', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev/path/';
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getURLsfromHtml relative', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/path/">Boot.dev Blog</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getURLsfromHtml invalid', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="invalid">Invalid URL</a>
    </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});