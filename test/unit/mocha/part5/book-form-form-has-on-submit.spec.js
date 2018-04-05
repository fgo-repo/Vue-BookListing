const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const parse5 = require('parse5');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;


describe('BookForm.vue', () => {
  it('should contain a form with submit call to bookSubmit @book-list-will-contain-submit-with-prevent-and-method-call', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/components/BookForm.vue'), 'utf8');
    } catch (e) {
      assert(false, 'The BookForm.vue file does not exist');
    }

    // Parse document
    const doc = parse5.parseFragment(file.replace(/\n/g, ''), { locationInfo: true });
    const nodes = doc.childNodes;

    // Parse for HTML in template
    const template = nodes.filter(node => node.nodeName === 'template');
    const content = parse5.serialize(template[0].content);
    const dom = new JSDOM(content, { includeNodeLocations: true, SVG_LCASE: true });
    const document = dom.window.document;

    // Test for for form existance
    const results = document.querySelector('form');
    assert(results.length > 0, 'The BookForm template does not contain a `form` tag');

    assert(results.outerHTML.includes('submit.prevent'), 'The `form` tag in the BookForm template does not include `v-on:submit.prevent`');

    assert(results.outerHTML.includes('bookSubmit(bookTitle, bookAuthor)'), 'The `v-on:submit.prevent` called in BookForm\'s `form` tag does not call the `bookSubmit()` method');
  });
});
