const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const parse5 = require('parse5');
const esquery = require('esquery');
const esprima = require('esprima');

describe('BookList.vue', () => {
  it('should contain a methods that pushes to array contents @append-book-pushes-title-and-author', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/components/BookList.vue'), 'utf8');
    } catch (e) {
      assert(false, 'The BookList component does not exist');
    }
    const document = parse5.parseFragment(file.replace(/\n/g, ''), { locationInfo: true });
    const nodes = document.childNodes;
    const script = nodes.filter(node => node.nodeName === 'script');

    const ast = esprima.parse(script[0].childNodes[0].value, { sourceType: 'module' });
    const methods = esquery(ast, 'Property[key.name=methods]');
    assert(methods.length > 0, 'the methods declaration is not present');

    let results = esquery(methods[0], 'Identifier[name="appendBook"]');
    assert(results.length > 0, 'appendBook method is not defined');

    results = esquery(methods[0], 'MemberExpression > MemberExpression > Identifier[name="books"]');
    assert(results.length > 0, 'appendBook is not pushing to the array `books`');

    results = esquery(methods[0], 'CallExpression > ObjectExpression > Property[key.name="title"][value.name="bookTitle"]');
    assert(results.length > 0, 'the title key is not sending the bookTitle arguement');

    results = esquery(methods[0], 'CallExpression > ObjectExpression > Property[key.name="author"][value.name="bookAuthor"]');
    assert(results.length > 0, 'the author key is not sending the bookAuthor arguement');
  });
});
