
var WordDictionary = function() {
    this.trie = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.trie
    for (let w of word) {
        if (!node[w]) node[w] = {}
        node = node[w]
    }
    node.done = true
    
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    return this.dfs(this.trie, word, 0)
};

WordDictionary.prototype.dfs = function(node, word, i) {
    if (i === word.length) return node.done === true
    const ch = word[i]
    if (ch === '.') {
        for (let key in node) {
            if (key !== 'done' && this.dfs(node[key], word, i + 1)) return true
        }
    } else {
        if (node[ch]) {
            return this.dfs(node[ch], word, i + 1)
        }
    }
    return false
}

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */