
var Trie = function() {
    this.root = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.root
    for (let w of word) {
        if (!node[w]) node[w] = {}
        node = node[w]
    }
    node.done = true
};

Trie.prototype.traverse = function(word) {
    let node = this.root
    for (let w of word) {
        if (!node[w]) {
            node = null
            break
        }
        node = node[w]
    }
    return node
}

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.traverse(word)
    if (node && node.done) return true
    return false
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return this.traverse(prefix) !== null
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */